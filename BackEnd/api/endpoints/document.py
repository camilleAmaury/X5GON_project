from flask import request
from flask_restplus import Namespace, Resource, fields

from api.service.document import get_all_document_evaluations
from api.service.evaluation import get_evaluation, remove_evaluation
from .evaluation import evaluation_schema

api = Namespace('documents', description='Documents operations')

document_schema = api.model('Document', {
    'document_id': fields.Integer(required=False, description='ID of the document', readonly=True),
    'graph_ref': fields.String(required=True, description='Reference of the document in graph')
})

@api.route("/<int:document_id>/evaluations")
class DocumentEvaluationsRoute(Resource):
    @api.marshal_with(evaluation_schema, as_list=True)
    @api.doc(responses={
        200: 'Active document evaluations list',
        409: 'Conflict, document not exist'
    })
    def get(self, document_id):
        return get_all_document_evaluations(document_id)

@api.route("/<int:document_id>/evaluations/<int:user_id>")
class DocumentEvaluationRoute(Resource):

    @api.marshal_with(evaluation_schema)
    @api.response(200, 'Evaluation info')
    @api.doc(responses={
        200: 'Evaluation info',
        409: 'Conflict, this evaluation not exist',
        422: 'Validation Error'
    })
    def get(self, document_id, user_id):
        return get_evaluation(user_id=user_id, document_id=document_id)

    @api.doc(responses={
        201: 'Evaluation successfully deleted from document',
        409: 'Conflict, user not exist / document not exist / evaluation not exist',
    })
    def delete(self, document_id, user_id):
        remove_evaluation(user_id=user_id, document_id=document_id)
        return '', 201
