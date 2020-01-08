from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User


def build_user_schema(user):
    mod = {}
    mod['id_user'] = user.id_user
    mod['username'] = user.username
    mod['password'] = user.password
    return mod

def get_user(id_user):
    user = User.query.get(id_user)
    return build_user_schema(user)

def get_user_by_name(username):
    user = User.query.filter_by(username=username).first()
    return build_user_schema(user)

def get_all_users():
    arr_users = []
    users = User.query.order_by(User.id_user).all()
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
                    },"message":"Username exist"
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
                'id_user': user.id_user
            }, 201
    except exc.DBAPIError as e:
        #On error in SQL
        current_app.logger.error('Fail on create user %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
                "errors":{
                    "sql":"duplicate key value"
                },"message":"Error in database"
        }), 409))


def update_user(id_user, data):
    user = User.query.get(id_user)
    if not user:
        abort(make_response(jsonify({
                "errors":{
                    0:"User not found by the id"
                },"message":"User not found"
        }), 409))
    user.set_password( data.get('password') if data.get('password') else user.password )
    db.session.commit()
    return True

def delete_user(id_user):
    user = User.query.get(id_user)
    if not user:
        abort(make_response(jsonify({
                "errors":{
                    0:"User not found by the id"
                },"message":"User not found"
        }), 409))
    db.session.delete(user)
    db.session.commit()
    return True
