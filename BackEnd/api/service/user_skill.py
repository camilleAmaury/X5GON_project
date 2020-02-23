from flask import abort, jsonify, make_response

from api.database import db
from api.database.model import User, Skill, User_skill

def build_user_skill_schema(user_skill):
    mod = {}
    mod['user_skill_id'] = user_skill.user_skill_id
    mod['skill_level'] = user_skill.skill_level
    mod['user_id'] = user_skill.user_id
    mod['skill_name'] = user_skill.skill_name
    return mod

def get_user_skill(user_id, skill_name):
    user_skill = User_skill.query.filter_by(user_id=user_id, skill_name=skill_name).first()
    if not user_skill:
        abort(make_response(jsonify({
            "errors":{
                0:"User_skill not found"
            },
            "message":"User_skill not found"
        }), 409))

    return build_user_skill_schema(user_skill)

def increased_user_skill(user_id, skill_name, nb_level):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    skill = Skill.query.filter_by(skill_name=skill_name).first()
    if not skill:
        skill = Skill(
            skill_name = skill_name
        )
        db.session.add(skill)
    user_skill = User_skill.query.filter_by(user_id=user_id, skill_name=skill_name).first()
    if not user_skill:
        user_skill = User_skill(
            skill_level = 0,
            user_id = user_id,
            skill_name = skill_name
        )
        db.session.add(user_skill)
    user_skill.increase(nb_level)
    db.session.flush()
    db.session.commit()

    return build_user_skill_schema(user_skill)

def decreased_user_skill(user_id, skill_name, nb_level):
    user = User.query.get(user_id)
    if not user:
        abort(make_response(jsonify({
            "errors":{
                0:"User not found"
            },
            "message":"User not found"
        }), 409))
    skill = Skill.query.filter_by(skill_name=skill_name).first()
    if not skill:
        abort(make_response(jsonify({
            "errors":{
                0:"Skill not found"
            },
            "message":"Skill not found"
        }), 409))
    user_skill = User_skill.query.filter_by(user_id=user_id, skill_name=skill_name).first()
    if not user_skill:
        abort(make_response(jsonify({
            "errors":{
                0:"User_skill not found"
            },
            "message":"User_skill not found"
        }), 409))
    if user_skill.get_skill_level() <= nb_level :
        user.remove_user_skill(user_skill)
        db.session.delete(user_skill)
    else :
        user_skill.decrease_level(nb_level)
    db.session.commit()
    return True
