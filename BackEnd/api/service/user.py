from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, Document, ScholarQuestion, DocumentEvaluation
from .authentication import generate_auth_token
from .document import build_document_schema
from .scholar_question import build_scholar_question_schema
from .evaluation import build_evaluation_schema


def build_user_schema(user):
    mod = {}
    mod['user_id'] = user.user_id
    mod['username'] = user.username
    return mod

def get_user(user_id):
    user = User.query.get(user_id)
    return build_user_schema(user)

def get_user_by_name(username):
    user = User.query.filter_by(username=username).first()
    return build_user_schema(user)

def get_all_users():
    arr_users = []
    users = User.query.order_by(User.user_id).all()
    for user in users:
        mod = build_user_schema(user)
        arr_users.append(mod)
    return arr_users

def create_user(data):
    try:
        #Validate if the username exist
        user = User.query.filter_by(username=data.get('username')).first()
        if user:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"username exist in DB"
                },
                "message":"Username exist"
            }), 409))

        #Create user
        user = User(
            username=data.get('username'),
            password=data.get('password'),
        )
        db.session.add(user)
        db.session.flush()
        db.session.commit()
        return {
                'user_id': user.user_id
            }, 201
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create user %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))


def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found by the id"
            },
            "message":"User not found"
        }), 409))
    user.set_password( data.get('password') if data.get('password') else user.password )
    db.session.commit()
    return True

def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found by the id"
            },
            "message":"User not found"
        }), 409))
    db.session.delete(user)
    db.session.commit()
    return True

def check_user_auth(username, password):
    user = User.query.filter_by(username=username).first()
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"Username not found"
            },
            "message":"User not found"
        }), 409))
    if not user.check_password(password):
        abort(make_response(jsonify({
            "errors":{
                0:"Invalide password"
            },
            "message":"Invalide password"
        }), 403))
    return generate_auth_token(user)

def get_all_opened_documents(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_opened_documents = []
    opened_documents = user.get_opened_documents()
    for opened_document in opened_documents:
        mod = build_document_schema(opened_document)
        arr_opened_documents.append(mod)
    return arr_opened_documents

def get_opened_document(user_id, graph_ref):
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
    if not (document in user.get_opened_documents()):
        abort(make_response(jsonify({
            "errors":{
                0:"User don't have opened this document"
            },
            "message":"User don't have opened this document"
        }), 409))

    return build_document_schema(document)

def add_opened_document(user_id, graph_ref):
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
        document = Document(
            graph_ref=graph_ref
        )
        db.session.add(document)
        db.session.flush()
        db.session.commit()
    if not (document in user.get_opened_documents()):
        user.add_opened_document(document)
        db.session.commit()

    return True

def remove_opened_document(user_id, graph_ref):
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
    if not (document in user.get_opened_documents()):
        abort(make_response(jsonify({
            "errors":{
                0:"User never opened this document"
            },
            "message":"User never opened this document"
        }), 409))

    user.remove_opened_document(document)
    db.session.commit()
    return True

def get_all_user_questions(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_scholar_questions = []
    scholar_questions = user.get_scholar_questions()
    for scholar_question in scholar_questions:
        mod = build_scholar_question_schema(scholar_question)
        arr_scholar_questions.append(mod)
    return arr_scholar_questions

def get_user_question(user_id, question_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    question = ScholarQuestion.query.get(question_id)
    if not question:
        abort(make_response(jsonify({
            "errors":{
                0:"Question not found"
            },
            "message":"Question not found"
        }), 409))
    if not (question in user.get_scholar_questions()):
        abort(make_response(jsonify({
            "errors":{
                0:"User didn't ask this question"
            },
            "message":"User didn't ask this question"
        }), 409))

    return build_scholar_question_schema(question)

def add_user_question(user_id, data):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    question = ScholarQuestion(
        question=data.get('question'),
        answer=data.get('answer'),
        user_id=user_id
    )
    db.session.add(question)
    db.session.flush()
    db.session.commit()

    return True

def remove_user_question(user_id, question_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    question = ScholarQuestion.query.get(question_id)
    if not question:
        abort(make_response(jsonify({
            "errors":{
                0:"Question not found"
            },
            "message":"Question not found"
        }), 409))
    if not (question in user.get_scholar_questions()):
        abort(make_response(jsonify({
            "errors":{
                0:"User never ask this question"
            },
            "message":"User never ask this question"
        }), 409))

    user.remove_scholar_question(question)
    db.session.delete(question)
    db.session.commit()
    return True

def get_all_user_evaluations(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_document_evaluations = []
    document_evaluations = user.get_document_evaluations()
    for document_evaluation in document_evaluations:
        mod = build_evaluation_schema(document_evaluation)
        arr_document_evaluations.append(mod)
    return arr_document_evaluations
