from flask_restplus import Api

from .cat import api as cat_api
from .dog import api as dog_api
from .user import api as user_api
from .authentication import api as anthentication_api
from .authentication import authorizations

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
