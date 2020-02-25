from api.database import db
from api.database.model import Badge, User, TraceNavigationUser, CommunityQuestion, ScholarQuestion, CommunityComment

def badge_possession_verification(user_id, badge_name, data):
    user = User.query.get(user_id)
    badge = Badge.query.filter_by(badge_name=badge_name).first()
    if user and badge and (not badge in user.get_badges()):
        switcher = {
            'Apprentice' : badge_apprentice_verification,
            'Seeking for help' : badge_seeking_for_help_verification,
            'Eager to learn' : badge_eager_to_learn_verification,
            'Path of mastership' : badge_path_of_mastership_verification,
            'Knowledge architect' : badge_knowledge_architect_verification
        }
        switcher[badge_name](user, badge, data)

def badge_apprentice_verification(user, badge, data):
    trace_count = TraceNavigationUser.query.filter_by(user_id=user.user_id).count()
    if trace_count >= 5 :
        user.add_badge(badge)
        db.session.commit()

def badge_seeking_for_help_verification(user, badge, data):
    question_count = CommunityQuestion.query.filter_by(user_id=user.user_id).count()
    if question_count >= 3 :
        user.add_badge(badge)
        db.session.commit()

def badge_eager_to_learn_verification(user, badge, data):
    question_count = ScholarQuestion.query.filter_by(user_id=user.user_id).count()
    if question_count >= 10 :
        user.add_badge(badge)
        db.session.commit()

def badge_path_of_mastership_verification(user, badge, data):
    comment_id = data.get("comment_id")
    comment = CommunityComment.query.filter_by(question_id=data.get('question_id')).order_by(CommunityComment.like_count.desc(), CommunityComment.date.desc()).first()
    if comment.comment_id == comment_id :
        user.add_badge(badge)
        db.session.commit()

def badge_knowledge_architect_verification(user, badge, data):
    evaluation_count = Evaluation.query.filter_by(user_id=user.user_id).count()
    if evaluation_count >= 10 :
        user.add_badge(badge)
        db.session.commit()
