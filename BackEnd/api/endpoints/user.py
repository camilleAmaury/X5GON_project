from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.user import get_user, get_all_users, create_user, update_user, delete_user
from .document import document_schema

import json

api = Namespace('users', description='Users CRUD operations')

user_schema = api.model('User', {
    'user_id': fields.Integer(required=False, description='ID of the user', readonly=True),
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

@api.route("/<int:user_id>")
class UserRoute(Resource):

    @api.marshal_with(user_schema)
    @api.response(200, 'User info')
    @api.doc()
    def get(self, user_id):
        return get_user(user_id)

    @api.expect(user_schema, envelope='json', validate=False)
    @api.doc(responses={
        201: 'User successfully updated',
        409: 'User not found',
        422: 'Validation Error'
    })
    def put(self, user_id):
        validator.validate_payload(request.json, user_schema, validate_required=False)
        update_user(user_id=user_id, data=request.json )
        return '', 201

    @api.doc(responses={
        201: 'User successfully deleted',
        409: 'User not found'
    })
    def delete(self, user_id):
        delete_user(user_id=user_id)
        return '', 201

@api.route("/<int:user_id>/knowledges")
class UserKnowledgesRoute(Resource):
    @api.marshal_with(document_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user knowledges list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_knowledges(user_id)

    @api.expect(document_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Knowledge successfully added to user',
        409: 'Conflict, user not exist / document not exist / user allready know this document',
        422: 'Validation Error'
    })
    def post(self, user_id):
        validator.validate_payload(request.json, document_schema)
        add_knowledge(user_id=user_id, document_id=request.json.get(document_id))
        return '', 201

@api.route("/<int:user_id>/knowledges/<int:document_id>")
class UserKnowledgeRoute(Resource):

    @api.marshal_with(document_schema)
    @api.response(200, 'User info')
    @api.doc(responses={
        200: 'Knowledge info',
        409: 'Conflict, user not exist / document not exist / user don\'t know this document',
        422: 'Validation Error'
    })
    def get(self, user_id, document_id):
        return get_knowledge(user_id=user_id, document_id=document_id)

    @api.doc(responses={
        201: 'User successfully deleted',
        409: 'Conflict, user not exist / document not exist / user don\'t know this document',
    })
    def delete(self, user_id, document_id):
        remove_knowledge(user_id=user_id, document_id=document_id)
        return '', 201
