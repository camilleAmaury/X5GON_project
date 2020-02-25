from flask import current_app, abort, jsonify, make_response
from sqlalchemy import exc

from api.database import db
from api.database.model import User, CommunityQuestion, CommunityComment, UserLike
from .community_comment import build_comment_schema

def build_question_schema(question):
    mod = {}
    mod['question_id'] = question.question_id
    mod['question_title'] = question.question_title
    mod['question'] = question.question
    mod['user_id'] = question.user_id
    mod['date'] = question.date
    return mod

def get_all_community_questions(get_comments, check_comment_like, page, page_size, user_id):
    if(user_id != 0):
        query = CommunityQuestion.query.filter_by(user_id=user_id)
    else:
        query = CommunityQuestion.query.order_by(CommunityQuestion.date.desc())
    if page_size:
        query = query.limit(page_size)
        if page:
            query = query.offset((page-1)*page_size)
    questions = query.all()
    arr_questions = []
    for question in questions :
        mod = build_question_schema(question)
        if get_comments :
            list = get_all_question_comments(question.question_id, check_comment_like)
            mod['comments'] = list
        user = User.query.get(question.user_id)
        if user :
            mod['username'] = user.username
        arr_questions.append(mod)
    return arr_questions

def create_community_question(data):
    try:
        #Validate if the username exist
        user = User.query.get(data.get('user_id'))
        if not user:
            abort(make_response(jsonify({
                "errors":{
                    "sql":"User not exist in DB"
                },
                "message":"User not exist"
            }), 409))

        #Create user
        question = CommunityQuestion(
            question=data.get('question'),
            user_id=data.get('user_id'),
            question_title=data.get('question_title')
        )
        db.session.add(question)
        db.session.flush()
        db.session.commit()
        return build_question_schema(question)
    except exc.DBAPIError as e:
        current_app.logger.error('Fail on create user %s' % str(e) )
        db.session().rollback()
        abort(make_response(jsonify({
            "errors":{
                "sql":"duplicate key value"
            },
            "message":"Error in database"
        }), 409))


# Question Comment *******************************************************************************************************************************


def get_all_question_comments(question_id, check_comment_like) :
    question = CommunityQuestion.query.get(question_id)
    if not question :
        abort(make_response(jsonify({
            "errors":{
                "sql":"Question not exist in DB"
            },
            "message":"Question not exist"
        }), 409))
    comments = CommunityComment.query.filter_by(question_id=question_id).order_by(CommunityComment.date.desc()).all()
    arr_comments = []
    for comment in comments :
        mod = build_comment_schema(comment)
        user = User.query.get(comment.user_id)
        if user :
            mod["username"] = user.username
        if check_comment_like :
            like = UserLike.query.filter_by(user_id=check_comment_like, comment_id=comment.comment_id).first()
            if like :
                mod["user_like_status"] = like.like_value
            else :
                mod["user_like_status"] = 0
        arr_comments.append(mod)
    return arr_comments
    
