from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.community_comment import modify_comment_likes

import json

api = Namespace('likes', description='Community comments CRUD operations')

user_like_schema = api.model('CommentLike', {
    'like_id': fields.Integer(required=False, description='Id of like', readonly=True),
    'user_id': fields.Integer(required=True, description='User who make this like'),
    'comment_id': fields.Integer(required=True, description='Liked comment id'),
    'like_value': fields.Integer(required=True, description='Like value (1 ask for like, -1 ask for dislike)')
})

@api.route("/")
class LikesRoute(Resource):

    @api.expect(user_like_schema, envelope='json')
    @api.doc(responses={
        201: 'Like successfully created',
        409: 'Conflict, Comment not exist / User not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(user_like_schema)
    def post(self):
        validator.validate_payload(request.json, user_like_schema)
        return modify_comment_likes(data=request.json), 201
