from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User, Document, user_opened_documents, user_validated_documents, user_badges, ScholarQuestion, UserSearch, Evaluation, Badge, Level, Skill, User_skill
from api.service.level import create_level
from api.service.badge import create_badge


def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        ScholarQuestion.__table__.create(bind=engine, checkfirst=True)
        UserSearch.__table__.create(bind=engine, checkfirst=True)
        Evaluation.__table__.create(bind=engine, checkfirst=True)
        Badge.__table__.create(bind=engine, checkfirst=True)
        Level.__table__.create(bind=engine, checkfirst=True)
        Skill.__table__.create(bind=engine, checkfirst=True)
        User_skill.__table__.create(bind=engine, checkfirst=True)
        user_opened_documents.create(bind=engine, checkfirst=True)
        user_validated_documents.create(bind=engine, checkfirst=True)
        user_badges.create(bind=engine, checkfirst=True)
        User.__table__.create(bind=engine, checkfirst=True)
        Document.__table__.create(bind=engine, checkfirst=True)
        db.session.commit()

    @app.cli.command()
    def initialize_tables():
        create_level({
            'level_number': 1,
            'next_stage': 100
        })
        create_badge({
            'badge_name' : 'Apprentice',
            'description' : 'Ajout de 5 documents à la liste',
            'image_adress' : '../../../../../assets/Panel/Scene/Profile/badgeApprentice.png'
        })
        create_badge({
            'badge_name' : 'Seeking for help',
            'description' : 'Ask 3 questions to community',
            'image_adress' : '../../../../../assets/Panel/Scene/Profile/badgeHelp.png'
        })
        create_badge({
            'badge_name' : 'Eager to learn',
            'description' : 'Ask 10 questions to the scholar',
            'image_adress' : '../../../../../assets/Panel/Scene/Profile/badgeEager.png'
        })
        create_badge({
            'badge_name' : 'Path of mastership',
            'description' : 'Be the top answer of a community question',
            'image_adress' : '../../../../../assets/Panel/Scene/Profile/badgeMaster.png'
        })
        create_badge({
            'badge_name' : 'Knowledge architect',
            'description' : 'Rate and validate 10 documents',
            'image_adress' : '../../../../../assets/Panel/Scene/Profile/badgeArchitect.png'
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
        Skill.__table__.drop(bind=engine)
        User_skill.__table__.drop(bind=engine)
        db.session.commit()
