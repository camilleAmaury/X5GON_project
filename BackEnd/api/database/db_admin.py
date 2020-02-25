from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User, Document, user_opened_documents, user_validated_documents, user_badges, ScholarQuestion, UserSearch, Evaluation, Badge, Level, CommunityQuestion, CommunityComment, UserLike, TraceNavigationUser
from api.service.level import create_level
from api.service.badge import create_badge
from api.service.community_question import create_community_question
from api.service.community_comment import create_community_comment
from api.service.user import create_user


def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        try :
            Level.__table__.create(bind=engine)
        except :
            print('Database creation error on : Level')
        try :
            User.__table__.create(bind=engine)
        except :
            print('Database creation error on : User')
        try :
            Document.__table__.create(bind=engine)
        except :
            print('Database creation error on : Document')
        try :
            UserSearch.__table__.create(bind=engine)
        except :
            print('Database creation error on : UserSearch')
        try :
            Badge.__table__.create(bind=engine)
        except :
            print('Database creation error on : Badge')
        try :
            user_opened_documents.create(bind=engine)
        except :
            print('Database creation error on : user_opened_documents')
        try :
            user_validated_documents.create(bind=engine)
        except :
            print('Database creation error on : user_validated_documents')
        try :
            user_badges.create(bind=engine)
        except :
            print('Database creation error on : user_badges')
        try :
            ScholarQuestion.__table__.create(bind=engine)
        except :
            print('Database creation error on : ScholarQuestion')
        try :
            Evaluation.__table__.create(bind=engine)
        except :
            print('Database creation error on : Evaluation')
        try :
            CommunityQuestion.__table__.create(bind=engine)
        except :
            print('Database creation error on : CommunityQuestion')
        try :
            CommunityComment.__table__.create(bind=engine)
        except :
            print('Database creation error on : CommunityComment')
        try :
            UserLike.__table__.create(bind=engine)
        except :
            print('Database creation error on : UserLike')
        try :
            TraceNavigationUser.__table__.create(bind=engine)
        except :
            print('Database creation error on : TraceNavigationUser')
        db.session.commit()

    @app.cli.command()
    def initialize_tables():
        try:
            for i in range(1, 10):
                create_level({
                    'level_number': i,
                    'next_stage': i*50 + 50
                })
        except :
            print('Error on creation of entity : create_level')
        try:
            create_badge({
                'badge_name' : 'Apprentice',
                'description' : 'Ajout de 5 documents à la liste'
            })
        except :
            print('Error on creation of entity : create_badge')
        try:
            create_badge({
                'badge_name' : 'Seeking for help',
                'description' : 'Ask 3 questions to community'
            })
        except :
            print('Error on creation of entity : create_badge')
        try:
            create_badge({
                'badge_name' : 'Eager to learn',
                'description' : 'Ask 10 questions to the scholar'
            })
        except :
            print('Error on creation of entity : create_badge')
        try:
            create_badge({
                'badge_name' : 'Path of mastership',
                'description' : 'Be the top answer of a community question'
            })
        except :
            print('Error on creation of entity : create_badge')
        try:
            create_badge({
                'badge_name' : 'Knowledge architect',
                'description' : 'Rate and validate 10 documents'
            })
        except :
            print('Error on creation of entity : create_badge')

    @app.cli.command()
    def delete_tables():
        engine = db.session.get_bind()
        try:
            user_opened_documents.drop(bind=engine)
        except :
            print('Error on delete table : user_opened_documents')
        try:
            user_validated_documents.drop(bind=engine)
        except :
            print('Error on delete table : user_validated_documents')
        try:
            user_badges.drop(bind=engine)
        except :
            print('Error on delete table : user_badges')
        try:
            User.__table__.drop(bind=engine)
        except :
            print('Error on delete table : User')
        try:
            Document.__table__.drop(bind=engine)
        except :
            print('Error on delete table : Document')
        try:
            ScholarQuestion.__table__.drop(bind=engine)
        except :
            print('Error on delete table : ScholarQuestion')
        try:
            Evaluation.__table__.drop(bind=engine)
        except :
            print('Error on delete table : Evaluation')
        try:
            CommunityQuestion.__table__.drop(bind=engine)
        except :
            print('Error on delete table : CommunityQuestion')
        try:
            CommunityComment.__table__.drop(bind=engine)
        except :
            print('Error on delete table : CommunityComment')
        try:
            UserSearch.__table__.drop(bind=engine)
        except :
            print('Error on delete table : UserSearch')
        try:
            Badge.__table__.drop(bind=engine)
        except :
            print('Error on delete table : Badge')
        try:
            Level.__table__.drop(bind=engine)
        except :
            print('Error on delete table : Level')
        try:
            UserLike.__table__.drop(bind=engine)
        except :
            print('Error on delete table : UserLike')
        try:
            TraceNavigationUser.__table__.drop(bind=engine)
        except :
            print('Error on delete table : TraceNavigationUser')
        db.session.commit()
