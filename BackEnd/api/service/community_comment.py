from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, CommunityQuestion, CommunityComment

def build_comment_schema(comment):
    mod = {}
    mod['comment_id'] = comment.comment_id
    mod['comment'] = comment.comment
    mod['question_id'] = comment.question_id
    mod['user_id'] = comment.user_id
    mod['date'] = comment.date
    mod['like_count'] = comment.like_count
    return mod

def create_community_comment(data):
    try:
        user = User.query.get(data.get('user_id'))
        if not user:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"User not exist in DB"
                },
                "message":"User not exist"
            }), 409))
        question = CommunityQuestion.query.get(data.get('question_id'))
        if not question:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"Question not exist in DB"
                },
                "message":"Question not exist"
            }), 409))

        comment = CommunityComment(
            comment=data.get('comment'),
            question_id=data.get('question_id'),
            user_id=data.get('user_id'),
            like_count=0
        )
        db.session.add(comment)
        db.session.flush()
        db.session.commit()
        return build_comment_schema(comment)
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create user %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))


# Likes ******************************************************************************************************
