from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.evaluation import add_evaluation

api = Namespace('evaluations', description='Evaluation operations')

evaluation_schema = api.model('Evaluation', {
    'user_id': fields.Integer(required=True, description='ID of the user'),
    'graph_ref': fields.String(required=True, description='ID of the document in the graph'),
    'comprehension_rating': fields.Integer(required=True, description='Comprehension rating of this document'),
    'quality_rating': fields.Integer(required=True, description='Quality rating of this document')
})

@api.route("/")
class EvaluationRoute(Resource):

    @api.expect(evaluation_schema, envelope='json')
    @api.doc(responses={
        201: 'Evaluation successfully created',
        409: 'Conflict, user not exists / document not exists / this user already evaluate this document',
        422: 'Validation Error'
    })
    @api.marshal_with(evaluation_schema)
    def post(self):
        validator.validate_payload(request.json, evaluation_schema)
        return add_evaluation(data=request.json),201
