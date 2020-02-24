from flask_restplus import Namespace, fields

api = Namespace('skills', description='Skills CRUD operations')

skill_schema = api.model('Skill', {
    'skill_name': fields.String(required=True, description='Skill name', readonly=True),
    'skill_level': fields.Integer(required=True, description='', readonly=True)
})
