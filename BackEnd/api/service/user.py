from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, Document, ScholarQuestion, Badge, Level, UserSearch
from .authentication import generate_auth_token
from .document import build_document_schema
from .scholar_question import build_scholar_question_schema
from .user_search import build_user_search_schema
from .evaluation import build_evaluation_schema
from .badge import build_badge_schema
from .level import build_level_schema
from .skill import getKeywords, build_skills_schema


def build_user_schema(user):
    mod = {}
    mod['user_id'] = user.user_id
    mod['username'] = user.username
    mod['email'] = user.email
    mod['phone'] = user.phone
    mod['year'] = user.year
    return mod

def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found by the id"
            },
            "message":"User not found"
        }), 409))
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
        level = Level.query.get(1)
        if not level:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"Level 1 for new users not exist"
                },
                "message":"level 1 not exist"
            }), 409))
        user = User(
            username=data.get('username'),
            pwd=data.get('pwd'),
            email=data.get('email'),
            year=data.get('year')
        )
        if data.get('phone') :
            user.phone = data.get('phone')
        db.session.add(user)

        user.set_level(level)
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
    user.set_password( data.get('pwd') if data.get('pwd') else user.pwd )
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

def check_user_auth(username, pwd):
    user = User.query.filter_by(username=username).first()
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"Username not found"
            },
            "message":"User not found"
        }), 409))
    if not user.check_password(pwd):
        abort(make_response(jsonify({
            "errors":{
                0:"Invalide password"
            },
            "message":"Invalide password"
        }), 403))
    return generate_auth_token(user)


# User Opened Documents *******************************************************************************************************************************


def get_all_opened_documents(user_id, isValidated):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    validated_documents = None
    if isValidated :
        validated_documents = user.get_validated_documents()

    arr_opened_documents = []
    opened_documents = user.get_opened_documents()
    for opened_document in opened_documents:
        mod = build_document_schema(opened_document)
        if validated_documents != None :
            mod['isValidated'] = opened_document in validated_documents
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

def add_opened_document(user_id, data):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.filter_by(graph_ref=data.get("graph_ref")).first()
    if not document:
        document = Document(
            graph_ref=data.get('graph_ref')
        )
        if data.get('document_title') :
            document.document_title = data.get('document_title')
        db.session.add(document)
        db.session.flush()
        db.session.commit()
    if not (document in user.get_opened_documents()):
        user.add_opened_document(document)
        db.session.commit()

    return build_document_schema(document)

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


# User Validated Documents *******************************************************************************************************************************


def get_all_validated_documents(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_validated_documents = []
    validated_documents = user.get_validated_documents()
    for validated_document in validated_documents:
        mod = build_document_schema(validated_document)
        arr_validated_documents.append(mod)
    return arr_validated_documents

def get_validated_document(user_id, graph_ref):
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
    if not (document in user.get_validated_documents()):
        abort(make_response(jsonify({
            "errors":{
                0:"User don't have validated this document"
            },
            "message":"User don't have validated this document"
        }), 409))

    return build_document_schema(document)

def add_validated_document(user_id, graph_ref):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.filter_by(graph_ref=graph_ref).first()
    if not document :
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    if not document in user.get_opened_documents() :
        abort(make_response(jsonify({
            "errors":{
                0:"This document is not opened by this user"
            },
            "message":"Document not opened"
        }), 409))
    if not (document in user.get_validated_documents()):
        user.add_validated_document(document)
        db.session.commit()

    return build_document_schema(document)

def remove_validated_document(user_id, graph_ref):
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
    if not (document in user.get_validated_documents()):
        abort(make_response(jsonify({
            "errors":{
                0:"User never validated this document"
            },
            "message":"User never validated this document"
        }), 409))

    user.remove_validated_document(document)
    db.session.commit()
    return True


# User Questions *******************************************************************************************************************************


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
    scholar_questions = user.get_scholar_questions().reverse()
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

    return build_scholar_question_schema(question)

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


# User Search *******************************************************************************************************************************


def get_all_user_searches(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_user_searches = []
    user_searches = user.get_user_searches()
    for user_search in reversed(user_searches):
        mod = build_user_search_schema(user_search)
        arr_user_searches.append(mod)
    return arr_user_searches

def get_user_search(user_id, search_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    search = UserSearch.query.get(search_id)
    if not search:
        abort(make_response(jsonify({
            "errors":{
                0:"Search not found"
            },
            "message":"Search not found"
        }), 409))
    if not (search in user.get_user_searches()):
        abort(make_response(jsonify({
            "errors":{
                0:"User didn't do this search"
            },
            "message":"User didn't do this search"
        }), 409))

    return build_user_search_schema(search)

def add_user_search(user_id, search_subject):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    search = UserSearch(
        search_subject=search_subject,
        user_id=user_id
    )
    db.session.add(search)
    db.session.flush()
    db.session.commit()

    return build_user_search_schema(search)

def remove_user_search(user_id, search_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    search = UserSearch.query.get(search_id)
    if not search:
        abort(make_response(jsonify({
            "errors":{
                0:"Search not found"
            },
            "message":"Search not found"
        }), 409))
    if not (search in user.get_user_searches()):
        abort(make_response(jsonify({
            "errors":{
                0:"User never do this search"
            },
            "message":"User never do this search"
        }), 409))

    user.remove_user_search(search)
    db.session.delete(search)
    db.session.commit()
    return True


# User Evaluations *******************************************************************************************************************************


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


# User Badges *******************************************************************************************************************************


def get_all_user_badges(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_badges = []
    badges = user.get_badges()
    for badge in badges:
        mod = build_badge_schema(badge)
        arr_badges.append(mod)
    return arr_badges

def get_user_badge(user_id, badge_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Badge not found"
            },
            "message":"Badge not found"
        }), 409))
    if not (badge in user.get_badges()):
        abort(make_response(jsonify({
            "errors":{
                0:"User didn't have this badge"
            },
            "message":"User didn't have this badge"
        }), 409))

    return build_badge_schema(badge)

def add_user_badge(user_id, badge_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Badge not found"
            },
            "message":"Badge not found"
        }), 409))
    if badge in user.get_badges():
        abort(make_response(jsonify({
            "errors":{
                0:"User already have this badge"
            },
            "message":"User already have this badge"
        }), 409))
    user.add_badge(badge)
    db.session.flush()
    db.session.commit()

    return build_badge_schema(badge)

def remove_user_badge(user_id, badge_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Question not found"
            },
            "message":"Question not found"
        }), 409))
    if not (badge in user.get_badges()):
        abort(make_response(jsonify({
            "errors":{
                0:"User didn't have this badge"
            },
            "message":"User didn't have this badge"
        }), 409))

    user.remove_badge(badge)
    db.session.delete(badge)
    db.session.commit()
    return True


# User Level *******************************************************************************************************************************


def get_user_experience(user_id):
    user = user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    mod = build_level_schema(user.get_level())
    mod['experience'] = user.experience
    return mod

def add_user_experience(user_id, experience):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    user.add_experience(experience)
    db.session.commit()


def remove_user_experience(user_id, experience):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    user.remove_experience(experience)
    db.session.commit()


# User Skill *******************************************************************************************************************************


def get_all_user_skills(user_id):
    user = User.query.get(user_id)
    if not user :
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    validated_documents = user.get_validated_documents()
    id_arr = []
    for document in validated_documents :
        id_arr.append(document.graph_ref)
    return build_skills_schema(getKeywords(id_arr))    
