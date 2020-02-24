from flask_restplus import Api
import io

from .graph.search import api as search_api
from .graph.askquestion import api as askquestion_api
from .graph.prerequisites import api as prerequisites_api
from .graph.register import api as register_api
from .graph.login import api as login_api
from .graph.like import api as like_api
from .graph.difficulty import api as difficulty_api

from .database.user import api as user_api
from .database.authentication import api as anthentication_api
from .database.authentication import authorizations
from .database.document import api as document_api
from .database.scholar_question import api as scholar_question_api
from .database.evaluation import api as evaluation_api
from .database.badge import api as badge_api
from .database.level import api as level_api
from .database.skill import api as skill_api
from .database.user_search import api as user_search_api
from .database.doc_see_by_user import api as doc_see_by_user_api
from .database.community_question import api as community_question_api
from .database.community_comment import api as community_comment_api
from .database.like import api as comment_like_api

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

api.add_namespace(user_api)
api.add_namespace(anthentication_api)
api.add_namespace(document_api)
api.add_namespace(scholar_question_api)
api.add_namespace(evaluation_api)
api.add_namespace(badge_api)
api.add_namespace(level_api)
api.add_namespace(skill_api)
api.add_namespace(user_search_api)
api.add_namespace(doc_see_by_user_api)
api.add_namespace(community_question_api)
api.add_namespace(community_comment_api)
api.add_namespace(comment_like_api)
