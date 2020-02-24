from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.community_comment import create_community_comment

import json

api = Namespace('community_comments', description='Community comments CRUD operations')

user_like_schema = api.model('CommunityComment', {
    'like_id': fields.Integer(required=False, description='Id of like', readonly=True),
    'user_id': fields.Integer(required=True, description='User who make this like'),
    'comment_id': fields.Integer(required=True, description='Liked comment'),
    'like_value': fields.Integer(required=True, description='Id of the user who post this comment')
})

@api.route("/")
class CommunityCommentsRoute(Resource):

    @api.expect(user_like_schema, envelope='json')
    @api.doc(responses={
        201: 'Like successfully created',
        409: 'Conflict, Comment not exist / User not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(user_like_schema)
    def post(self):
        validator.validate_payload(request.json, user_like_schema)
        return create_community_comment(data=request.json), 201
