from flask import request, send_file
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.user import get_user, get_all_users, create_user, update_user, delete_user, set_user_image, get_all_opened_documents, add_opened_document, get_opened_document, remove_opened_document, get_all_user_questions, add_user_question, get_user_question, remove_user_question, get_all_user_evaluations, get_all_user_badges, get_user_badge, add_user_badge, remove_user_badge, get_user_experience, add_user_experience, remove_user_experience, get_all_user_searches, add_user_search, get_user_search, remove_user_search, get_all_validated_documents, add_validated_document, get_validated_document, remove_validated_document, get_all_user_skills
from api.service.evaluation import get_evaluation, remove_evaluation
from .document import document_schema
from .scholar_question import scholar_question_schema
from .evaluation import evaluation_schema
from .badge import badge_schema
from .user_search import user_search_schema
from .level import level_schema
from .skill import skill_schema
from .authentication import authentication_schema

import json

api = Namespace('users', description='Users CRUD operations')

user_schema = api.model('User', {
    'user_id': fields.Integer(required=False, description='ID of the user', readonly=True),
    'username': fields.String(required=True, description='Username of the user'),
    'pwd': fields.String(required=True, description='Password of the user'),
    'phone': fields.String(required=False, description='User phone number'),
    'email': fields.String(required=True, description='User email'),
    'year': fields.Integer(required=True, description='Number of years from the end of high school'),
    'user_image': fields.String(required=False, decription='File path of the user_image')
})

user_image_schema = api.model('User_image', {
    'user_id': fields.Integer(required=False, description='ID of the user', readonly=True),
    'user_image': fields.String(required=True, decription='File path of the user_image')
})

@api.route("/")
class UsersRoute(Resource):

    @api.marshal_with(user_schema, as_list=True)
    @api.response(200, 'Active users list')
    def get(self):
        return get_all_users()

    @api.expect(user_schema, envelope='json')
    @api.doc(responses={
        201: 'User successfully created',
        409: 'Conflict, user already exists',
        422: 'Validation Error'
    })
    @api.marshal_with(authentication_schema)
    def post(self):
        validator.validate_payload(request.json, user_schema)
        return create_user(data=request.json), 201

@api.route("/<int:user_id>")
class UserRoute(Resource):

    @api.marshal_with(user_schema)
    @api.doc(responses={
        200: 'User info',
        409: 'Conflict, user not found'
    })
    def get(self, user_id):
        return get_user(user_id)

    @api.expect(user_schema, envelope='json')
    @api.doc(responses={
        201: 'User successfully updated',
        409: 'User not found',
        422: 'Validation Error'
    })
    def put(self, user_id):
        validator.validate_payload(request.json, user_schema, validate_required=False)
        update_user(user_id=user_id, data=request.json )
        return '', 201

    @api.doc(responses={
        201: 'User successfully deleted',
        409: 'User not found'
    })
    def delete(self, user_id):
        delete_user(user_id=user_id)
        return '', 201

@api.route("/<int:user_id>/image")
class UserImageRoute(Resource):

    @api.expect(user_image_schema, envelope='json')
    @api.doc(responses={
        201: 'User image successfully added',
        409: 'User not found'
    })
    def put(self, user_id):
        return set_user_image(user_id, request.json.get('user_image')), 201


# User Opened Documents *******************************************************************************************************************************


@api.route("/<int:user_id>/opened_documents")
class UserOpenedDocumentsRoute(Resource):
    @api.marshal_with(document_schema, as_list=True)
    @api.doc(
        params={
            'isValidated': 'True if you want to know wotch opened documents are allready validated or not (default value : False)'
        },
        responses={
            200: 'Active user opened documents list',
            409: 'Conflict, user not exist'
        }
    )
    def get(self, user_id):
        return get_all_opened_documents(user_id, bool(request.args.get('isValidated', None)))

    @api.expect(document_schema, envelope='json')
    @api.doc(responses={
        201: 'Document successfully open by user',
        409: 'Conflict, user not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(document_schema)
    def post(self, user_id):
        validator.validate_payload(request.json, document_schema)
        return add_opened_document(user_id=user_id, data=request.json), 201

@api.route("/<int:user_id>/opened_documents/<string:graph_ref>")
class UserOpenedDocumentRoute(Resource):

    @api.marshal_with(document_schema)
    @api.response(200, 'Opened document info')
    @api.doc(responses={
        200: 'Opened document info',
        409: 'Conflict, user not exist / document not exist / user don\'t have opened this document',
        422: 'Validation Error'
    })
    def get(self, user_id, graph_ref):
        return get_opened_document(user_id=user_id, graph_ref=graph_ref)

    @api.doc(responses={
        201: 'Document successfully deleted from user',
        409: 'Conflict, user not exist / document not exist / user don\'t have opened this document',
    })
    def delete(self, user_id, graph_ref):
        remove_opened_document(user_id=user_id, graph_ref=graph_ref)
        return '', 201


# User Validated Documents *******************************************************************************************************************************


@api.route("/<int:user_id>/validated_documents")
class UserValidatedDocumentsRoute(Resource):
    @api.marshal_with(document_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user validated documents list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_validated_documents(user_id)

    @api.expect(document_schema, envelope='json')
    @api.doc(responses={
        201: 'Document successfully validate by user',
        409: 'Conflict, user not exist / document not exist / document not opened',
        422: 'Validation Error'
    })
    @api.marshal_with(document_schema)
    def post(self, user_id):
        validator.validate_payload(request.json, document_schema)
        return add_validated_document(user_id=user_id, graph_ref=request.json.get('graph_ref')), 201

@api.route("/<int:user_id>/validated_documents/<string:graph_ref>")
class UserValidatedDocumentRoute(Resource):

    @api.marshal_with(document_schema)
    @api.response(200, 'Validated document info')
    @api.doc(responses={
        200: 'Validated document info',
        409: 'Conflict, user not exist / document not exist / user don\'t have validated this document',
        422: 'Validation Error'
    })
    def get(self, user_id, graph_ref):
        return get_validated_document(user_id=user_id, graph_ref=graph_ref)

    @api.doc(responses={
        201: 'Document successfully deleted from user',
        409: 'Conflict, user not exist / document not exist / user don\'t have validated this document',
    })
    def delete(self, user_id, graph_ref):
        remove_validated_document(user_id=user_id, graph_ref=graph_ref)
        return '', 201


# User Questions *******************************************************************************************************************************


@api.route("/<int:user_id>/scholar_questions")
class UserScholarQuestionsRoute(Resource):
    @api.marshal_with(scholar_question_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user scholar questions list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_questions(user_id)

    @api.expect(scholar_question_schema, envelope='json')
    @api.doc(responses={
        201: 'Question successfully ask by user',
        409: 'Conflict, user not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(scholar_question_schema)
    def post(self, user_id):
        validator.validate_payload(request.json, scholar_question_schema)
        return add_user_question(user_id=user_id, data=request.json), 201

@api.route("/<int:user_id>/scholar_questions/<int:question_id>")
class UserScholarQuestionRoute(Resource):

    @api.marshal_with(scholar_question_schema)
    @api.response(200, 'User info')
    @api.doc(responses={
        200: 'Question info',
        409: 'Conflict, user not exist / question not exist / user never ask this question'
    })
    def get(self, user_id, question_id):
        return get_user_question(user_id=user_id, question_id=question_id)

    @api.doc(responses={
        201: 'Question successfully deleted from user',
        409: 'Conflict, user not exist / question not exist / user never ask this question',
    })
    def delete(self, user_id, question_id):
        remove_user_question(user_id=user_id, question_id=question_id)
        return '', 201


# User Search *******************************************************************************************************************************


@api.route("/<int:user_id>/searches")
class UserSearchesRoute(Resource):
    @api.marshal_with(user_search_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user searches list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_searches(user_id)

    @api.expect(user_search_schema, envelope='json')
    @api.doc(responses={
        201: 'Question successfully ask by user',
        409: 'Conflict, user not exist',
        422: 'Validation Error'
    })
    @api.marshal_with(user_search_schema)
    def post(self, user_id):
        validator.validate_payload(request.json, user_search_schema)
        return add_user_search(user_id=user_id, search_subject=request.json.get("search_subject")), 201

@api.route("/<int:user_id>/searches/<int:search_id>")
class UserSearcheRoute(Resource):

    @api.marshal_with(user_search_schema)
    @api.response(200, 'User info')
    @api.doc(responses={
        200: 'Question info',
        409: 'Conflict, user not exist / search not exist / user never ask this search'
    })
    def get(self, user_id, search_id):
        return get_user_search(user_id=user_id, search_id=search_id)

    @api.doc(responses={
        201: 'Question successfully deleted from user',
        409: 'Conflict, user not exist / search not exist / user never ask this search',
    })
    def delete(self, user_id, search_id):
        remove_user_search(user_id=user_id, search_id=search_id)
        return '', 201


# User Evaluations *******************************************************************************************************************************


@api.route("/<int:user_id>/evaluations")
class UserEvaluationsRoute(Resource):
    @api.marshal_with(evaluation_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user evaluations list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_evaluations(user_id)

@api.route("/<int:user_id>/evaluations/<string:graph_ref>")
class UserEvaluationRoute(Resource):

    @api.marshal_with(evaluation_schema)
    @api.response(200, 'Evaluation info')
    @api.doc(responses={
        200: 'Evaluation info',
        409: 'Conflict, this evaluation not exist',
        422: 'Validation Error'
    })
    def get(self, user_id, graph_ref):
        return get_evaluation(user_id=user_id, graph_ref=graph_ref)

    @api.doc(responses={
        201: 'Evaluation successfully deleted from user',
        409: 'Conflict, user not exist / document not exist / evaluation not exist',
    })
    def delete(self, user_id, graph_ref):
        remove_evaluation(user_id=user_id, graph_ref=graph_ref)
        return '', 201


# User Badges *******************************************************************************************************************************


@api.route("/<int:user_id>/badges")
class UserBadgesRoute(Resource):
    @api.marshal_with(badge_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user badges list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_badges(user_id)

    @api.expect(badge_schema, envelope='json')
    @api.doc(responses={
        201: 'Badge successfully add by user',
        409: 'Conflict, user not exist / badge not exist / user already have this badge',
        422: 'Validation Error'
    })
    @api.marshal_with(badge_schema)
    def post(self, user_id):
        validator.validate_payload(request.json, badge_schema)
        return add_user_badge(user_id=user_id, badge_id=request.json.get('badge_id')), 201

@api.route("/<int:user_id>/badges/<int:badge_id>")
class UserBadgeRoute(Resource):

    @api.marshal_with(badge_schema)
    @api.response(200, 'Basge info')
    @api.doc(responses={
        200: 'Badge info',
        409: 'Conflict, user not exist / badge not exist / user didn\'t have this badge',
        422: 'Validation Error'
    })
    def get(self, user_id, badge_id):
        return get_user_badge(user_id=user_id, badge_id=badge_id)

    @api.doc(responses={
        201: 'Badge successfully deleted from user',
        409: 'Conflict, user not exist / badge not exist / user didn\'t have this badge',
    })
    def delete(self, user_id, badge_id):
        remove_user_badge(user_id=user_id, badge_id=badge_id)
        return '', 201


# User Experience *******************************************************************************************************************************


@api.route("/<int:user_id>/experience")
class UserExperienceRoute(Resource):

    @api.marshal_with(level_schema)
    @api.doc(responses={
    200: 'Active user experience',
    409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_user_experience(user_id)

    @api.doc(
        params={
            'nb_experience': 'Number of experience to add to this user (default value : 1)'
        },
        responses={
            201: 'Experience successfully add to user',
            409: 'Conflict, user not exist'
        }
    )
    def post(self, user_id):
        nb_experience = int(request.args.get('nb_experience', 1))
        add_user_experience(user_id, nb_experience)
        return '', 201

    @api.doc(
        params={
            'nb_experience': 'Number of experience to remove to this user (default value : 1)'
        },
        responses={
            201: 'Experience successfully remove to user',
            409: 'Conflict, user not exist'
        }
    )
    def delete(self, user_id):
        nb_experience = int(request.args.get('nb_experience', 1))
        remove_user_experience(user_id, nb_experience)
        return '', 201


# User Skill *******************************************************************************************************************************


@api.route("/<int:user_id>/skills")
class UserSkillsRoute(Resource):
    @api.marshal_with(skill_schema, as_list=True)
    @api.doc(responses={
        200: 'Active user skills list',
        409: 'Conflict, user not exist'
    })
    def get(self, user_id):
        return get_all_user_skills(user_id)
