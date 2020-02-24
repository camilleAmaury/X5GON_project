from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.community_comment import create_community_comment

import json

api = Namespace('community_comments', description='Community comments CRUD operations')

community_comment_schema = api.model('CommunityComment', {
    'comment_id': fields.Integer(required=False, description='Id of this comment', readonly=True),
    'comment': fields.String(required=True, description='Content of the comment'),
    'like_count': fields.Integer(required=False, description='Number of like on this comment', readonly=True),
    'user_id': fields.Integer(required=True, description='Id of the user who post this comment'),
    'username': fields.Integer(required=False, description='Username of the user who post this comment', readonly=True),
    'question_id': fields.Integer(required=True, description='Id of the question concerned by this comment')
})

@api.route("/")
class CommunityCommentsRoute(Resource):

    @api.expect(community_comment_schema, envelope='json')
    @api.doc(responses={
        201: 'Comment successfully created',
        409: 'Conflict, Question not exist / User not exist',
        422: 'Validation Error'
    })
    def post(self):
        validator.validate_payload(request.json, community_comment_schema)
        return create_community_comment(data=request.json), 201
