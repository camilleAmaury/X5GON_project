from flask import request, current_app
from flask_restplus import Namespace, Resource, fields
from functools import wraps
import uuid
from cryptography.fernet import Fernet

from .user import user_schema
from api.service.authentication import generate_auth_token, verify_auth_token
from api.service.user import check_user_auth
from api.utils import validator

authorizations = {
    'apiKey' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'X-API-KEY',
    },
    'user_id' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'user_id'
    }
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = None
        user_id = None

        if 'X-API-KEY' in request.headers:
            token = request.headers['X-API-KEY']

        if not token:
            return {'message' : 'Token is missing.'}, 401

        if token != current_app.config['ADMIN_TOKEN']:

            if 'user_id' in request.headers:
                user_id = request.headers['user_id']

            if not user_id:
                return {'message' : 'User id is missing.'}, 401

            if user_id != str(verify_auth_token(token)):
                return {'message' : 'Invalide token for this user.'}, 401

        return f(*args, **kwargs)

    return decorated

api = Namespace('authentication', description='Authentication methods')

@api.route("/login")
class UsersRoute(Resource):

    @api.expect(user_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'User successfully created',
        403: 'Invalide password',
        409: 'User not found',
        422: 'Validation Error'
    })
    def post(self):
        validator.validate_payload(request.json, user_schema)
        return check_user_auth(request.json.get('username'), request.json.get('password')), 201
