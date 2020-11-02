from functools import wraps

import jwt
from flask import request, jsonify

import config
from data import token_blacklist_repository


def auth_required(func):
    @wraps(func)
    def auth_required_wrapper(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        bl_token = token_blacklist_repository.find(token)
        if bl_token is not None:
            return jsonify({'message': 'Token has been cancelled'}), 401

        try:
            data = jwt.decode(token, config.JWT_SECRET)
        except Exception:
            return jsonify({'message': 'Token is invalid'}), 401
        return func(*args, **kwargs)

    return auth_required_wrapper
