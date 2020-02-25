from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, CommunityQuestion, CommunityComment, UserLike
from .like import build_like_schema
from .event import badge_possession_verification
from .user import add_user_experience, remove_user_experience

def build_comment_schema(comment):
    mod = {}
    mod['comment_id'] = comment.comment_id
    mod['comment'] = comment.comment
    mod['question_id'] = comment.question_id
    mod['user_id'] = comment.user_id
    d = comment.date
    mod['date'] = str(d.hour) + ':' + str(d.minute) + ' ' + str(d.day) + '/' + str(d.month) + '/' + str(d.year)
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
        badge_possession_verification(comment.user_id, 'Path of mastership', {
            'question_id': question.question_id,
            'comment_id': comment.comment_id
        })
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


def modify_comment_likes(data):
    user = User.query.get(data.get('user_id'))
    if not user:
        abort(make_response(jsonify({
            "errors":{
                "sql":"User not exist in DB"
            },
            "message":"User not exist"
        }), 409))
    comment = CommunityComment.query.get(data.get('comment_id'))
    if not comment:
        abort(make_response(jsonify({
            "errors":{
                "sql":"Comment not exist in DB"
            },
            "message":"Comment not exist"
        }), 409))
    like = UserLike.query.filter_by(user_id=data.get('user_id'), comment_id=data.get('comment_id')).first()
    if like :
        if like.like_value == data.get('like_value') :
            if like.like_value == 1 :
                comment.addLike(-1)
                remove_user_experience(comment.user_id, 5)
            elif like.like_value == -1 :
                comment.addLike(1)
            like.like_value = 0
        else:
            comment.addLike(- like.like_value + data.get('like_value'))
            if like.like_value == 1:
                remove_user_experience(comment.user_id, 5)
            like.like_value = data.get('like_value')
            if like.like_value == 1:
                add_user_experience(comment.user_id, 5)
    else :
        like = UserLike(
            user_id=data.get('user_id'),
            comment_id=data.get('comment_id'),
            like_value=data.get('like_value')
        )
        db.session.add(like)
        comment.addLike(like.like_value)
        if like.like_value == 1:
            add_user_experience(comment.user_id, 5)
    db.session.flush()
    db.session.commit()
    badge_possession_verification(like.user_id, 'Path of mastership', {
        'question_id': question.question_id,
        'comment_id': like.comment_id
    })
    return build_like_schema(like)
