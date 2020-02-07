from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User, Document, user_opened_documents, ScholarQuestion, DocumentEvaluation

def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        ScholarQuestion.__table__.create(bind=engine, checkfirst=True)
        DocumentEvaluation.__table__.create(bind=engine, checkfirst=True)
        user_opened_documents.create(bind=engine, checkfirst=True)
        User.__table__.create(bind=engine, checkfirst=True)
        Document.__table__.create(bind=engine, checkfirst=True)
        db.session.commit()

    @app.cli.command()
    def delete_tables():
        engine = db.session.get_bind()
        user_opened_documents.drop(bind=engine)
        User.__table__.drop(bind=engine)
        Document.__table__.drop(bind=engine)
        ScholarQuestion.__table__.drop(bind=engine)
        DocumentEvaluation.__table__.drop(bind=engine)
        db.session.commit()
