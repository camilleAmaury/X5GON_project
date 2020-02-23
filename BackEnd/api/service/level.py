from flask import abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import Level

def build_level_schema(level):
    mod = {}
    mod['level_number'] = level.level_number
    mod['next_stage'] = level.next_stage
    return mod

def get_level(level_number):
    level = Level.query.get(level_number)
    if not level:
        abort(make_response(jsonify({
            "errors":{
                0:"Level not found by the id"
            },
            "message":"Level not found"
        }), 409))
    return build_level_schema(level)

def get_all_levels():
    arr_levels = []
    levels = Level.query.order_by(Level.level_number).all()
    for level in levels:
        mod = build_level_schema(level)
        arr_levels.append(mod)
    return arr_levels

def create_level(data):
    try:
        level = Level.query.get(data.get('level_number'))
        if not level:
            #Create level
            level = Level(
                level_number = data.get('level_number'),
                next_stage = data.get('next_stage')
            )
            db.session.add(level)
            db.session.flush()
            db.session.commit()

        return build_level_schema(level), 201
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create level %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))

def delete_level(level_number):
    level = Level.query.get(level_number)
    if not level:
        abort(make_response(jsonify({
            "errors":{
                0:"Level not found by the id"
            },
            "message":"Level not found"
        }), 409))
    db.session.delete(level)
    db.session.commit()
    return True
