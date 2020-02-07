from flask import abort, jsonify, make_response

from api.database import db
from api.database.model import User, Document, DocumentEvaluation

def build_evaluation_schema(evaluation):
    mod = {}
    mod['user_id'] = evaluation.user_id
    mod['document_id'] = evaluation.document_id
    mod['comprehension_rating'] = evaluation.comprehension_rating
    mod['quality_rating'] = evaluation.quality_rating
    return mod

def get_evaluation(user_id, document_id):
    evaluation = DocumentEvaluation.query.filter_by(user_id=user_id, document_id=document_id).first()
    if not evaluation:
        abort(make_response(jsonify({
            "errors":{
                0:"Evaluation not found"
            },
            "message":"Evaluation not found"
        }), 409))

    return build_evaluation_schema(evaluation)

def add_document_evaluation(data):
    user = User.query.get(data.get('user_id'))
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.get(data.get('document_id'))
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    evaluation = DocumentEvaluation(
        comprehension_rating=data.get('comprehension_rating'),
        quality_rating=data.get('quality_rating'),
        user_id=data.get('user_id'),
        document_id=data.get('document_id')
    )
    db.session.add(evaluation)
    db.session.flush()
    db.session.commit()

    return True

def remove_evaluation(user_id, document_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.get(document_id)
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    evaluation = DocumentEvaluation.query.filter_by(user_id=user_id, document_id=document_id).first()
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
