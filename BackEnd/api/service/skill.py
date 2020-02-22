from flask import abort, jsonify, make_response

from api.database.model import Skill

def build_skill_schema(skill):
    mod = {}
    mod['skill_id'] = skill.skill_id
    mod['skill_name'] = skill.skill_name
    return mod

def get_skill(skill_name):
    skill = Skill.query.filter_by(skill_name=skill_name).first()
    if not skill:
        abort(make_response(jsonify({
            "errors":{
                0:"Skill name not found"
            },
            "message":"Skill not found"
        }), 409))
    return build_skill_schema(skill)

def get_all_skills():
    arr_skills = []
    skills = Skill.query.order_by(Skill.skill_id).all()
    for skill in skills:
        mod = build_skill_schema(skill)
        arr_skills.append(mod)
    return arr_skills

def create_skill(data):
    try:
        skill = Skill.query.get(data.get('skill_name'))
        if skill:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"Skill exist in DB"
                },
                "message":"Skill exist"
            }), 409))

        #Create skill
        skill = Skill(
            skill_id = data.get('skill_id'),
            skill_name = data.get('skill_name')
        )
        db.session.add(skill)
        db.session.flush()
        db.session.commit()
        return build_skill_schema(skill), 201
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create skill %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))

def delete_skill(skill_name):
    skill = Skill.query.get(skill_name)
    if not skill:
        abort(make_response(jsonify({
            "errors":{
                0:"Skill not found by the id"
            },
            "message":"Skill not found"
        }), 409))
    db.session.delete(skill)
    db.session.commit()
    return True
