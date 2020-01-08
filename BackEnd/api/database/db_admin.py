from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import gen_salt

from .model import User

def db_admin(app, db):

    @app.cli.command()
    def create_tables():
        engine = db.session.get_bind()
        User.__table__.create(bind=engine, checkfirst=True)
        db.session.commit()

    @app.cli.command()
    def delete_tables():
        engine = db.session.get_bind()
        User.__table__.drop(bind=engine)
        db.session.commit()

    @app.cli.command()
    def add_default_values():
        app.logger.info('Adding default values')
        try:

            oAuthClient = OAuth2Client(
                client_id = app.config['OAUTH2_CLIENT_ID'],
                client_secret = app.config['OAUTH2_CLIENT_SECRET'],
                client_name = "WEB ADMIN",
                client_uri = "127.0.0.1",
                scope = "profile",
                redirect_uri = "127.0.0.1",
                grant_type = "password",
                response_type = "JSON",
                token_endpoint_auth_method = "client_secret_basic"
            )
            db.session.add(oAuthClient)
            db.session.flush()


            user = User(username=u'admin', passwd=u'mypwdz', is_active=True)
            db.session.add(user)
            db.session.flush()
            user_info = UserInfo(id_user=user.id_user, name=u'Admin', lastname=u'Default', email=u'admin@mail.com',)
            db.session.add(user_info)
            oAuthUser = OAuth2ClientUsers(client_id=oAuthClient.client_id,user_id=user.id_user)
            db.session.add(oAuthUser)

            user2 = User(username=u'user', passwd=u'mypwdz', is_active=True)
            db.session.add(user2)
            db.session.flush()
            user_info2 = UserInfo(id_user=user2.id_user, name=u'User', lastname=u'Default', email=u'user@mail.com',)
            db.session.add(user_info2)
            oAuthUser2 = OAuth2ClientUsers(client_id=oAuthClient.client_id,user_id=user2.id_user)
            db.session.add(oAuthUser2)

            db.session.commit()
        except Exception as err:
            db.session.rollback()
            app.logger.error('Error on adding default values {}'.format(str(err)))
        finally:
            db.session.close()
