from flask import abort, make_response, jsonify
from flask_restplus import fields

def validate_payload(payload, api_model, validate_required=True):
    errors = {}
    # check if any reqd fields are missing in payload
    if validate_required:
        for key in api_model:
            if api_model[key].required and key not in payload:
                errors[key] = 'Required field \'%s\' missing' % key
    if len(errors)>0:
        abort(make_response(jsonify({
                'errors':errors,
                'message':'Request validation failed'
        }), 422))
