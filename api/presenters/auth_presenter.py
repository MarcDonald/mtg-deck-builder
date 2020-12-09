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
