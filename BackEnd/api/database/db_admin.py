from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User, Document, user_opened_documents, user_validated_documents, user_badges, ScholarQuestion, UserSearch, Evaluation, Badge, Level
from api.service.level import create_level
from api.service.badge import create_badge


def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        Level.__table__.create(bind=engine)
        User.__table__.create(bind=engine)
        Document.__table__.create(bind=engine)
        UserSearch.__table__.create(bind=engine)
        Badge.__table__.create(bind=engine)
        user_opened_documents.create(bind=engine)
        user_validated_documents.create(bind=engine)
        user_badges.create(bind=engine)
        ScholarQuestion.__table__.create(bind=engine)
        #Evaluation.__table__.create(bind=engine)
        db.session.commit()

    @app.cli.command()
    def initialize_tables():
        create_level({
            'level_number': 1,
            'next_stage': 100
        })
        create_badge({
            'badge_name' : 'Apprentice',
            'description' : 'Ajout de 5 documents à la liste'
        })
        create_badge({
            'badge_name' : 'Seeking for help',
            'description' : 'Ask 3 questions to community'
        })
        create_badge({
            'badge_name' : 'Eager to learn',
            'description' : 'Ask 10 questions to the scholar'
        })
        create_badge({
            'badge_name' : 'Path of mastership',
            'description' : 'Be the top answer of a community question'
        })
        create_badge({
            'badge_name' : 'Knowledge architect',
            'description' : 'Rate and validate 10 documents'
        })

    @app.cli.command()
    def delete_tables():
        engine = db.session.get_bind()
        user_opened_documents.drop(bind=engine)
        user_validated_documents.drop(bind=engine)
        user_badges.drop(bind=engine)
        User.__table__.drop(bind=engine)
        Document.__table__.drop(bind=engine)
        ScholarQuestion.__table__.drop(bind=engine)
        Evaluation.__table__.drop(bind=engine)
        UserSearch.__table__.drop(bind=engine)
        Badge.__table__.drop(bind=engine)
        Level.__table__.drop(bind=engine)
        db.session.commit()
