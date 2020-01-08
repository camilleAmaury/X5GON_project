from flask import request
from flask_restplus import Namespace, Resource, fields
from functools import wraps
import uuid
from cryptography.fernet import Fernet

from .user import user_schema

authorizations_token = uuid.uuid4().hex

authorizations = {
    'apiKey' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'X-API-KEY'
    }
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = None
        cipher_suite = None

        if 'X-API-KEY' in request.headers:
            token = request.headers['X-API-KEY']

        if not token:
            return {'message' : 'Token is missing.'}, 401

        if 'username' in request.headers:
            cipher_suite = Fernet(key)

        if not cipher_suite:
            return {'message' : 'Username is missing.'}, 401

        if authorizations_token != cipher_suite.decrypt(token):
            return {'message' : 'Invalide token.'}, 401

        return f(*args, **kwargs)

    return decorated

def get_token(key):
    cipher_suite = Fernet(key)
    return cipher_suite.encrypt(message)

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
        user = get_user_by_name(request.json.get('username'))
        if not user:
            return 'User not found', 409
        if not user.check_password(request.json.get('password')):
            return 'Invalide password', 403
        return get_token(user.username), 201
