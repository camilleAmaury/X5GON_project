from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.community_question import get_all_community_questions, create_community_question, get_all_question_comments
from .community_comment import community_comment_schema

import json

api = Namespace('community_questions', description='Community questions CRUD operations')

community_question_schema = api.model('CommunityQuestion', {
    'question_id': fields.Integer(required=False, description='Id of this question', readonly=True),
    'question_title': fields.String(required=True, description='Question title'),
    'question': fields.String(required=True, description='Question content'),
    'user_id': fields.Integer(required=True, description='Id of the user who ask this question'),
    'username': fields.String(required=False, description='Username of the user who ask this question', readonly=True),
    'user_name': fields.Integer(required=False, description='User image id of the user who ask this question', readonly=True),
    'date': fields.String(required=False, description='String who represent the datetime of the post of this question', readonly=True),
    'comments': fields.List(fields.Nested(community_comment_schema), readonly=True)
})

@api.route("/")
class CommunityQuestionsRoute(Resource):

    @api.marshal_with(community_question_schema, as_list=True)
    @api.doc(
        params={
            'get_comment': 'true if you want to retrive for all question their comments (default value : false)',
            'check_comment_like': 'Ask if user like return comments (indicate in user_like_status variable)',
            'page': 'Number of the page',
            'page_size': 'Number of questions on each pages',
            'user_id': 'Id of user'
        },
        responses={
            200: 'Active community questions list',
        }
    )
    def get(self):

        return get_all_community_questions(
            get_comments=bool(request.args.get('get_comment', False)),
            check_comment_like=int(request.args.get('check_comment_like', 0)),
            page=int(request.args.get('page', 0)),
            page_size=int(request.args.get('page_size', 0)),
            user_id = int(request.args.get('user_id', 0))
        )


    @api.expect(community_question_schema, envelope='json')
    @api.doc(responses={
        201: 'Question successfully created',
        409: 'Conflict, User not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(community_question_schema)
    def post(self):
        validator.validate_payload(request.json, community_question_schema)
        return create_community_question(data=request.json), 201

@api.route("/<int:question_id>/comunity_comments")
class CommunityQuestionCommentsRoute(Resource):

    @api.marshal_with(community_comment_schema, as_list=True)
    @api.doc(
        params={
            'check_comment_like': 'Ask if user like return comments (indicate in user_like_status variable)'
        },
        responses={
            200: 'Active community questions list',
        }
    )
    def get(self, question_id):
        return get_all_question_comments(question_id, int(request.args.get('check_comment_like', None)))
