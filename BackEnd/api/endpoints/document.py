from flask_restplus import Namespace, fields

api = Namespace('documents', description='Users CRUD operations')

document_schema = api.model('Document', {
    'document_id': fields.Integer(required=False, description='ID of the document'),
})
