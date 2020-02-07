from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.user import get_user, get_all_users, create_user, update_user, delete_user, get_all_opened_documents, add_opened_document, get_opened_document, remove_opened_document, get_all_user_questions, add_user_question, get_user_question, remove_user_question, get_all_user_evaluations
from api.service.evaluation import get_evaluation, remove_evaluation
from .document import document_schema
from .scholar_question import scholar_question_schema
from .evaluation import evaluation_schema

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

@api.route("/<int:user_id>/opened_documents")
class UserOpenedDocumentsRoute(Resource):
    @api.marshal_with(document_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user opened documents list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_opened_documents(user_id)

    @api.expect(document_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Document successfully open by user',
        409: 'Conflict, user not exist',
        422: 'Validation Error'
    })
    def post(self, user_id):
        validator.validate_payload(request.json, document_schema)
        add_opened_document(user_id=user_id, graph_ref=request.json.get('graph_ref'))
        return '', 201

@api.route("/<int:user_id>/opened_documents/<string:graph_ref>")
class UserOpenedDocumentRoute(Resource):

    @api.marshal_with(document_schema)
    @api.response(200, 'User info')
    @api.doc(responses={
        200: 'Document info',
        409: 'Conflict, user not exist / document not exist / user don\'t have opened this document',
        422: 'Validation Error'
    })
    def get(self, user_id, graph_ref):
        return get_opened_document(user_id=user_id, graph_ref=graph_ref)

    @api.doc(responses={
        201: 'Document successfully deleted from user',
        409: 'Conflict, user not exist / document not exist / user don\'t have opened this document',
    })
    def delete(self, user_id, graph_ref):
        remove_opened_document(user_id=user_id, graph_ref=graph_ref)
        return '', 201

@api.route("/<int:user_id>/scholar_questions")
class UserScholarQuestionsRoute(Resource):
    @api.marshal_with(scholar_question_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user scholar questions list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_questions(user_id)

    @api.expect(scholar_question_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Question successfully ask by user',
        409: 'Conflict, user not exist',
        422: 'Validation Error'
    })
    def post(self, user_id):
        validator.validate_payload(request.json, scholar_question_schema)
        add_user_question(user_id=user_id, data=request.json)
        return '', 201

@api.route("/<int:user_id>/scholar_questions/<int:question_id>")
class UserScholarQuestionRoute(Resource):

    @api.marshal_with(scholar_question_schema)
    @api.response(200, 'User info')
    @api.doc(responses={
        200: 'Question info',
        409: 'Conflict, user not exist / question not exist / user never ask this question',
        422: 'Validation Error'
    })
    def get(self, user_id, question_id):
        return get_user_question(user_id=user_id, question_id=question_id)

    @api.doc(responses={
        201: 'Question successfully deleted from user',
        409: 'Conflict, user not exist / question not exist / user never ask this question',
    })
    def delete(self, user_id, question_id):
        remove_user_question(user_id=user_id, question_id=question_id)
        return '', 201

@api.route("/<int:user_id>/evaluations")
class UserEvaluationsRoute(Resource):
    @api.marshal_with(evaluation_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user evaluations list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_evaluations(user_id)

@api.route("/<int:user_id>/evaluations/<int:document_id>")
class UserEvaluationRoute(Resource):

    @api.marshal_with(evaluation_schema)
    @api.response(200, 'Evaluation info')
    @api.doc(responses={
        200: 'Evaluation info',
        409: 'Conflict, this evaluation not exist',
        422: 'Validation Error'
    })
    def get(self, user_id, document_id):
        return get_evaluation(user_id=user_id, document_id=document_id)

    @api.doc(responses={
        201: 'Evaluation successfully deleted from user',
        409: 'Conflict, user not exist / document not exist / evaluation not exist',
    })
    def delete(self, user_id, document_id):
        remove_evaluation(user_id=user_id, document_id=document_id)
        return '', 201
