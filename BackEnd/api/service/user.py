from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, Document
from .authentication import generate_auth_token
from .document import build_document_schema


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

def get_all_knowledges(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))

    arr_knowledges = []
    knowledges = user.get_knowledges()
    for knowledge in knowledges:
        mod = build_document_schema(knowledge)
        arr_knowledges.append(mod)
    return arr_knowledges

def get_knowledge(user_id, document_id):
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
    if not (document in user.get_knowledges()):
        abort(make_response(jsonify({
            "errors":{
                0:"User don't know this document"
            },
            "message":"User don't know this document"
        }), 409))

    return build_document_schema(document)

def add_knowledge(user_id, document_id):
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
    if document in user.get_knowledges():
        abort(make_response(jsonify({
            "errors":{
                0:"User already know this document"
            },
            "message":"User already know this document"
        }), 409))

    user.add_knowledge(document)
    db.session.commit()
    return True

def remove_knowledge(user_id, document_id):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    document = Document.query.get(ducument_id)
    if not document:
        abort(make_response(jsonify({
            "errors":{
                0:"Document not found"
            },
            "message":"Document not found"
        }), 409))
    if not (document in user.get_knowledges()):
        abort(make_response(jsonify({
            "errors":{
                0:"User don't know this document"
            },
            "message":"User don't know this document"
        }), 409))

    user.remove_knowledge(document)
    db.session.commit()
    return True
