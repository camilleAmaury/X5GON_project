from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.middleware.proxy_fix import ProxyFix

from api.endpoints import api
from api.database import db
from api.database.db_admin import db_admin

def create_app():

    app = Flask(__name__)
    app.config.from_object('config')
    app.wsgi_app = ProxyFix(app.wsgi_app)

    api.init_app(app)
    db.init_app(app)
    db_admin(app, db)

    return app
