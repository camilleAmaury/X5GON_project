from flask import abort, jsonify, make_response

from api.database.model import Document
from .evaluation import build_evaluation_schema

def build_document_schema(document):
    mod = {}
    mod['document_id'] = document.document_id
    mod['graph_ref'] = document.graph_ref
    return mod

def get_all_document_evaluations(document_id):
    document = Document.query.get(document_id)
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))

    arr_document_evaluations = []
    document_evaluations = document.get_user_evaluations()
    for document_evaluation in document_evaluations:
        mod = build_evaluation_schema(document_evaluation)
        arr_document_evaluations.append(mod)
    return arr_document_evaluations
