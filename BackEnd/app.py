from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from flask_cors import CORS,cross_origin
#from endpoints.fastTextVectors import load

from api.endpoints import api
from api.database import db
from api.database.db_admin import db_admin

app = Flask(__name__)
app.config.from_object('config')
CORS(app)

api.init_app(app)
db.init_app(app)
db_admin(app, db)
app.run(host='0.0.0.0', debug=True)
