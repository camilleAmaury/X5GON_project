from flask import request
from flask_restplus import Namespace, Resource, fields
from functools import wraps

authorizations = {
    'apiKey' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'X-API-KEY'
    }
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = None
        if 'X-API-KEY' in request.headers:
            token = request.headers['X-API-KEY']

        if not token:
            return {'message' : 'Token is missing.'}, 401

        if token != 'myToken':
            return {'message' : 'Invalide token.'}, 401

        return f(*args, **kwargs)

    return decorated
