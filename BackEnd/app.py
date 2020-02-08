from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from flask_cors import CORS,cross_origin
#from endpoints.fastTextVectors import load

from api.endpoints import api

app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
api.init_app(app)
app.run(host='0.0.0.0', debug=True)
