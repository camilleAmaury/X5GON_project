from flask_restplus import Namespace, fields

api = Namespace('user_searches', description='Search shema')

user_search_schema = api.model('UserSearch', {
    'search_id': fields.Integer(required=False, description='ID of the search', readonly=True),
    'search_subject': fields.String(required=True, description='The search subject'),
})
