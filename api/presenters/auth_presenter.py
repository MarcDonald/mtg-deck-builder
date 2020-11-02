import datetime

import bcrypt
import jwt

import config
from data import user_repository, token_blacklist_repository
from utils.exceptions import AlreadyExistsError


def logout(token):
    token_blacklist_repository.add(token)


def login(username, password):
    user = user_repository.get_user_details(username)
    if user is not None:
        if bcrypt.checkpw(password.encode('utf8'), user['password']):
            token = jwt.encode({
                'username': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            }, config.JWT_SECRET)
            return token


def create_user(username, given_name, family_name, password):
    check_username_result = user_repository.get_user_details(username)
    if check_username_result is not None:
        raise AlreadyExistsError("User with that username already exists")
    else:
        hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        user_repository.create_user(username, given_name, family_name, hashed_password)
        return {
            "username": username,
            "givenName": given_name,
            "familyName": family_name
        }
