from flask import current_app, jsonify
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

def generate_auth_token(user, expiration = 18000):
    s = Serializer(current_app.config.get('SECRET_KEY', b'ss\x9a$M_\xfd\xee\xda\x12A\x88Z\xcf"$'), expires_in = expiration)
    token = s.dumps({'user_id' : user.get_user_id()})
    return {
        'token' : token.decode('ascii'),
        'user_id' : user.get_user_id(),
        'username' : user.username
    }

def verify_auth_token(token):
    s = Serializer(current_app.config.get('SECRET_KEY', b'ss\x9a$M_\xfd\xee\xda\x12A\x88Z\xcf"$'))
    try:
        data = s.loads(token)
    except SignatureExpired:
        return None
    except BadSignature:
        return None
    return data['user_id']
