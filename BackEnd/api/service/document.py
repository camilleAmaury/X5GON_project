from SPARQLWrapper import SPARQLWrapper, JSON
from flask import abort, jsonify, make_response

from api.database.model import Document
from .evaluation import build_evaluation_schema

def build_document_schema(document):
    mod = {}
    mod['graph_ref'] = document.graph_ref
    mod['document_title'] = document.document_title
    return mod

def get_all_document_evaluations(graph_ref):
    document = Document.query.filter_by(graph_ref=graph_ref).first()

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
