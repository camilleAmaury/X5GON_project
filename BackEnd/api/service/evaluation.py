from flask import abort, jsonify, make_response

from . import user as user_service
from api.database import db
from api.database.model import User, Document, Evaluation
from .user import add_user_experience

def build_evaluation_schema(evaluation):
    mod = {}
    mod['user_id'] = evaluation.user_id
    mod['graph_ref'] = evaluation.graph_ref
    mod['comprehension_rating'] = evaluation.comprehension_rating
    mod['quality_rating'] = evaluation.quality_rating
    return mod

def get_evaluation(user_id, graph_ref):
    evaluation = Evaluation.query.filter_by(user_id=user_id, graph_ref=graph_ref).first()
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
    document = Document.query.filter_by(graph_ref=data.get('graph_ref')).first()
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    if not document in user.get_opened_documents() :
        abort(make_response(jsonify({
            "errors":{
                0:"Document not opened by this user"
            },
            "message":"Document not opened"
        }), 409))
    if document in user.get_validated_documents() :
        abort(make_response(jsonify({
            "errors":{
                0:"Document already validated by this user"
            },
            "message":"Document already validated"
        }), 409))
    evaluation = Evaluation.query.filter_by(user_id=data.get('user_id'), graph_ref=data.get('graph_ref')).first()
    if not evaluation:
        evaluation = Evaluation(
            comprehension_rating=data.get('comprehension_rating'),
            quality_rating=data.get('quality_rating'),
            user_id=data.get('user_id'),
            graph_ref=data.get('graph_ref')
        )
        db.session.add(evaluation)
        user_service.add_validated_document(evaluation.user_id, evaluation.graph_ref)
        badge_possession_verification(evaluation.user_id, 'Knowledge architect', {})
        add_user_experience(evaluation.user_id, 30)
        db.session.flush()
        db.session.commit()


    return build_evaluation_schema(evaluation)

def remove_evaluation(user_id, graph_ref):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.filter_by(graph_ref=graph_ref).first()
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    evaluation = Evaluation.query.filter_by(user_id=user_id, graph_ref=graph_ref).first()
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
