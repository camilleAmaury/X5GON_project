from flask_restplus import Api

from .cat import api as cat_api
from .dog import api as dog_api
from .user import api as user_api
from .authentication import api as anthentication_api
from .authentication import authorizations
from .document import api as document_api
from .scholar_question import api as scholar_question_api
from .evaluation import api as evaluation_api

api = Api(
    title='Annimals API',
    version='1.0',
    description='A simple demo API',
    authorizations=authorizations
)

api.add_namespace(cat_api)
api.add_namespace(dog_api)
api.add_namespace(user_api)
api.add_namespace(anthentication_api)
api.add_namespace(document_api)
api.add_namespace(scholar_question_api)
api.add_namespace(evaluation_api)

vectors = None
