from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.user import get_user, get_all_users, create_user, update_user, delete_user

import json

api = Namespace('users', description='Users CRUD operations')

user_schema = api.model('User', {
    'id_user': fields.Integer(required=False, description='ID of the user', readonly=True),
    'username': fields.String(required=True, description='Username of the user'),
    'password': fields.String(required=True, description='Password of the user')
})

@api.route("/")
class UsersRoute(Resource):

    @api.marshal_with(user_schema, as_list=True)
    @api.response(200, 'Active users list')
    def get(self):
        return get_all_users()

    @api.expect(user_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'User successfully created',
        409: 'Conflict, user already exists',
        422: 'Validation Error'
    })
    @api.marshal_with(user_schema)
    def post(self):
        validator.validate_payload(request.json, user_schema)
        return create_user(data=request.json)

@api.route("/<int:id_user>")
class UserRoute(Resource):

    @api.marshal_with(user_schema)
    @api.response(200, 'User info')
    @api.doc()
    def get(self, id_user):
        return get_user(id_user)

    @api.expect(user_schema, envelope='json', validate=False)
    @api.doc(responses={
        201: 'User successfully updated',
        409: 'User not found',
        422: 'Validation Error'
    })
    def put(self, id_user):
        validator.validate_payload(request.json, user_schema, validate_required=False)
        update_user(id_user=id_user, data=request.json )
        return '', 201

    @api.doc(responses={
        201: 'User successfully deleted',
        409: 'User not found'
    })
    def delete(self, id_user):
        delete_user(id_user=id_user)
        return '', 201
