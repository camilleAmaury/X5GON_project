from flask import abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import Badge, User

def build_badge_schema(badge):
    mod = {}
    mod['badge_id'] = badge.badge_id
    mod['badge_name'] = badge.badge_name
    mod['description'] = badge.description
    mod['badge_image'] = badge.badge_image
    return mod

def get_badge(badge_id):
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Badge not found by the id"
            },
            "message":"Badge not found"
        }), 409))
    return build_badge_schema(badge)

def get_all_badges(user_id):
    user_badge_list = None
    if user_id != None:
        user = User.query.get(user_id)
        if user:
            user_badge_list = user.get_badges()
    arr_badges = []
    badges = Badge.query.order_by(Badge.badge_id).all()
    for badge in badges:
        mod = build_badge_schema(badge)
        if user_badge_list != None:
            mod['possess_by_user'] = badge in user_badge_list
        arr_badges.append(mod)
    return arr_badges

def create_badge(data):
    try:
        badge = Badge.query.filter_by(badge_name=data.get('badge_name')).first()
        if not badge :
            #Create badge
            badge = Badge(
                badge_name = data.get('badge_name'),
                description = data.get('description')
            )
            db.session.add(badge)
            db.session.flush()
            db.session.commit()
        return build_badge_schema(badge), 201
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create badge %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))

def delete_badge(badge_id):
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Badge not found by the id"
            },
            "message":"Badge not found"
        }), 409))
    db.session.delete(badge)
    db.session.commit()
    return True

def set_badge_image(badge_id, badge_image):
    badge = Badge.query.get(badge_id)
    if not badge:
        abort(make_response(jsonify({
            "errors":{
                0:"Badge not found"
            },
            "message":"Badge not found"
        }), 409))
    badge.badge_image = badge_image
    db.session.commit()
    return ''

# Badge Condition Verification ******************************************************************************************


def badge_possession_verification(user_id, badge_name):
    switcher = {
        'Apprentice' : badge_apprentice_verification,
        'Seeking for help' : badge_seeking_for_help_verification,
        'Eager to learn' : badge_eager_to_learn_verification,
        'Path of mastership' : badge_path_of_mastership_verification,
        'Knowledge architect' : badge_knowledge_architect_verification
    }
    return switcher[badge_name](user_id)

def badge_apprentice_verification(user_id):

    return

def badge_seeking_for_help_verification(user_id):

    return

def badge_eager_to_learn_verification(user_id):

    return

def badge_path_of_mastership_verification(user_id):

    return

def badge_knowledge_architect_verification(user_id):

    return
