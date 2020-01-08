from flask_restplus import Api

from .search import api as search_api
from .askquestion import api as askquestion_api
from .prerequisites import api as prerequisites_api

api = Api(
    title='X5GON API',
    version='1.0',
    description='',
)

api.add_namespace(search_api)
api.add_namespace(askquestion_api)
api.add_namespace(prerequisites_api)

