from flask import abort, jsonify, make_response

from api.database import db
from api.database.model import User, Document, Evaluation

def build_evaluation_schema(evaluation):
    mod = {}
    mod['user_id'] = evaluation.user_id
    mod['document_ref'] = evaluation.document_ref
    mod['comprehension_rating'] = evaluation.comprehension_rating
    mod['quality_rating'] = evaluation.quality_rating
    return mod

def get_evaluation(user_id, document_ref):
    evaluation = Evaluation.query.filter_by(user_id=user_id, document_ref=document_ref).first()
    if not evaluation:
        abort(make_response(jsonify({
            "errors":{
                0:"Evaluation not found"
            },
            "message":"Evaluation not found"
        }), 409))

    return build_evaluation_schema(evaluation)

def add_evaluation(data):
    user = User.query.get(data.get('user_id'))
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.filter_by(graph_ref=data.get('document_ref')).first()
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    evaluation = Evaluation.query.filter_by(user_id=data.get('user_id'), document_ref=data.get('document_ref')).first()
    if evaluation:
        abort(make_response(jsonify({
            "errors":{
                0:"This user already evaluate this document"
            },
            "message":"This user already evaluate this document"
        }), 409))
    evaluation = Evaluation(
        comprehension_rating=data.get('comprehension_rating'),
        quality_rating=data.get('quality_rating'),
        user_id=data.get('user_id'),
        document_ref=data.get('document_ref')
    )
    db.session.add(evaluation)
    db.session.flush()
    db.session.commit()

    return build_evaluation_schema(evaluation)

def remove_evaluation(user_id, document_ref):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.filter_by(graph_ref=document_ref).first()
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    evaluation = Evaluation.query.filter_by(user_id=user_id, document_ref=document_ref).first()
    if not evaluation:
        abort(make_response(jsonify({
            "errors":{
                0:"Evaluation not found"
            },
            "message":"Evaluation not found"
        }), 409))

    user.remove_document_evaluation(evaluation)
    document.remove_user_evaluation(evaluation)
    db.session.delete(evaluation)
    db.session.commit()
    return True
