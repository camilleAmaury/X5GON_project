from flask_restplus import Api
import io
from .graph.search import api as search_api
from .graph.askquestion import api as askquestion_api
from .graph.prerequisites import api as prerequisites_api
from .graph.register import api as register_api
from .graph.login import api as login_api
from .graph.like import api as like_api
from .graph.difficulty import api as difficulty_api

api = Api(
    title='X5GON API',
    version='1.0',
    description='',
)

api.add_namespace(search_api)
api.add_namespace(askquestion_api)
api.add_namespace(prerequisites_api)
api.add_namespace(login_api)
api.add_namespace(register_api)
api.add_namespace(like_api)
api.add_namespace(difficulty_api)
