from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User, Document, user_knoledge

def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        user_knoledge.create(bind=engine, checkfirst=True)
        User.__table__.create(bind=engine, checkfirst=True)
        Document.__table__.create(bind=engine, checkfirst=True)
        db.session.commit()

    @app.cli.command()
    def delete_tables():
        engine = db.session.get_bind()
        user_knoledge.drop(bind=engine)
        User.__table__.drop(bind=engine)
        Document.__table__.drop(bind=engine)
        db.session.commit()
