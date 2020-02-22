from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.skill import get_skill, get_all_skills, create_skill, delete_skill

import json

api = Namespace('skills', description='Skills CRUD operations')

skill_schema = api.model('Skill', {
    'skill_id': fields.Integer(required=False, description='ID of the skill', readonly=True),
    'skill_name': fields.String(required=True, description='Skill name'),
})

@api.route("/")
class SkillsRoute(Resource):

    @api.marshal_with(skill_schema, as_list=True)
    @api.response(200, 'Active skills list')
    def get(self):
        return get_all_skills()

    @api.expect(skill_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Skill successfully created',
        409: 'Conflict, skill already exists',
        422: 'Validation Error'
    })
    @api.marshal_with(skill_schema)
    def post(self):
        validator.validate_payload(request.json, skill_schema)
        return create_skill(data=request.json)

@api.route("/<int:skill_name>")
class SkillRoute(Resource):

    @api.marshal_with(skill_schema)
    @api.doc(responses={
        200: 'Skill info',
        409: 'Conflict, skill not found'
    })
    def get(self, skill_name):
        return get_skill(skill_name)

    @api.doc(responses={
        201: 'Skill successfully deleted',
        409: 'Skill not found'
    })
    def delete(self, skill_name):
        delete_skill(skill_name)
        return '', 201
