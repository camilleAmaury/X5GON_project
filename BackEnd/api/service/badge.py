from flask import abort, jsonify, make_response

from api.database.model import Badge, User

def build_badge_schema(badge):
    mod = {}
    mod['badge_id'] = badge.badge_id
    mod['badge_name'] = badge.badge_name
    mod['description'] = badge.description
    mod['image_adress'] = badge.image_adress
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
    if user_id :
        user_badge_list = User.query.get(user_id).get_badges()
    arr_badges = []
    badges = Badge.query.order_by(Badge.badge_id).all()
    for badge in badges:
        mod = build_badge_schema(badge)
        if user_badge_list :
            mod['possess_by_user'] = badge in user_badge_list
        arr_badges.append(mod)
    return arr_badges

def create_badge(data):
    try:
        #Create badge
        badge = Badge(
            badge_name = data.get('badge_name'),
            description = data.get('description'),
            image_adress = data.get('image_adress')
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
