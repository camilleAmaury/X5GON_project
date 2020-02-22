from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.level import get_level, get_all_levels, create_level, delete_level

import json

api = Namespace('levels', description='Levels CRUD operations')

level_schema = api.model('Level', {
    'level_number': fields.Integer(required=True, description='ID of the level'),
    'next_stage': fields.Integer(required=True, description='Number of experience point before the next level'),
    'experience': fields.Integer(required=False, description='experience in this level of the specified user', readonly=True)
})

@api.route("/")
class LevelsRoute(Resource):

    @api.marshal_with(level_schema, as_list=True)
    @api.response(200, 'Active levels list')
    def get(self):
        return get_all_levels()

    @api.expect(level_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Level successfully created',
        409: 'Conflict, level already exists',
        422: 'Validation Error'
    })
    @api.marshal_with(level_schema)
    def post(self):
        validator.validate_payload(request.json, level_schema)
        return create_level(data=request.json)

@api.route("/<int:level_number>")
class LevelRoute(Resource):

    @api.marshal_with(level_schema)
    @api.doc(responses={
        200: 'Level info',
        409: 'Conflict, level not found'
    })
    def get(self, level_number):
        return get_level(level_number)

    @api.doc(responses={
        201: 'Level successfully deleted',
        409: 'Level not found'
    })
    def delete(self, level_number):
        delete_level(level_number=level_number)
        return '', 201
