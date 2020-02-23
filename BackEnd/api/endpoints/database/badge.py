from flask import request
from flask_restplus import Namespace, Resource, fields

from api.utils import validator
from api.service.badge import get_badge, get_all_badges, create_badge, delete_badge

import json

api = Namespace('badges', description='Badges CRUD operations')

badge_schema = api.model('Badge', {
    'badge_id': fields.Integer(required=False, description='ID of the badge', readonly=True),
    'badge_name': fields.String(required=True, description='Badge name'),
    'description': fields.String(required=True, description='Badge description'),
    'image_adress': fields.String(required=True, description='image file adress in the front file system'),
    'possess_by_user': fields.Boolean(required=False, description='True if the submit user possess this badge', readonly=True)
})

@api.route("/")
class BadgesRoute(Resource):

    @api.marshal_with(badge_schema, as_list=True)
    @api.doc(
        params={
            'user_id' : 'indicate witch badges this user with have with boolean'
        },
        responses={
            200 : 'Active badges list'
        }
    )
    def get(self):
        return get_all_badges(request.args.get('user_id', None))

    @api.expect(badge_schema, validate=True, envelope='json')
    @api.doc(responses={
        201: 'Badge successfully created',
        409: 'Conflict, badge already exists',
        422: 'Validation Error'
    })
    @api.marshal_with(badge_schema)
    def post(self):
        validator.validate_payload(request.json, badge_schema)
        return create_badge(data=request.json)

@api.route("/<int:badge_id>")
class BadgeRoute(Resource):

    @api.marshal_with(badge_schema)
    @api.doc(responses={
        200: 'Badge info',
        409: 'Conflict, badge not found'
    })
    def get(self, badge_id):
        return get_badge(badge_id)

    @api.doc(responses={
        201: 'Badge successfully deleted',
        409: 'Badge not found'
    })
    def delete(self, badge_id):
        delete_badge(badge_id=badge_id)
        return '', 201
