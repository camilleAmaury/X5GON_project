from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.community_question import get_all_community_questions, create_community_question, get_all_question_comments
from .community_comment import community_comment_schema

import json

api = Namespace('community_questions', description='Community questions CRUD operations')

community_question_schema = api.model('CommunityQuestion', {
    'question_id': fields.Integer(required=False, description='Id of this question', readonly=True),
    'question': fields.String(required=True, description='Question content'),
    'user_id': fields.Integer(required=True, description='Id of the user who ask this question'),
    'username': fields.String(required=False, description='Username of the user who ask this question', readonly=True),
    'comments': fields.List(fields.Nested(community_comment_schema), readonly=True)
})

@api.route("/")
class CommunityQuestionsRoute(Resource):

    @api.marshal_with(community_question_schema, as_list=True)
    @api.doc(
        params={
            'get_comment': 'true if you want to retrive for all question their comments (default value : false)'
        },
        responses={
            200: 'Active community questions list',
        }
    )
    def get(self):
        return get_all_community_questions(bool(request.args.get('get_comment', False)))

    @api.expect(community_question_schema, envelope='json')
    @api.doc(responses={
        201: 'Question successfully created',
        409: 'Conflict, User not exist',
        422: 'Validation Error'
    })
    def post(self):
        validator.validate_payload(request.json, community_question_schema)
        return create_community_question(data=request.json), 201

@api.route("/<int:question_id>/comunity_comments")
class CommunityQuestionCommentsRoute(Resource):

    @api.marshal_with(community_comment_schema, as_list=True)
    @api.doc(
        responses={
            200: 'Active community questions list',
        }
    )
    def get(self, question_id):
        return get_all_question_comments(question_id)
