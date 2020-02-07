from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.evaluation import add_document_evaluation

api = Namespace('evaluations', description='Evaluation operations')

evaluation_schema = api.model('Evaluation', {
    'user_id': fields.Integer(required=False, description='ID of the user'),
    'document_id': fields.Integer(required=False, description='ID of the document'),
    'comprehension_rating': fields.Integer(required=False, description='Comprehension rating of this document'),
    'quality_rating': fields.Integer(required=False, description='Quality rating of this document')
})

@api.route("/")
class EvaluationRoute(Resource):

    @api.expect(evaluation_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Evaluation successfully created',
        409: 'Conflict, user not exists / document not exists',
        422: 'Validation Error'
    })
    def post(self):
        validator.validate_payload(request.json, evaluation_schema)
        return add_document_evaluation(data=request.json)
