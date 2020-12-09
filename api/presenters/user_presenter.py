from data import user_repository
from utils.exceptions import NotFoundError, InvalidDataError, AlreadyExistsError
import bcrypt

def get_user_details(username):
    user = user_repository.get_user_details(username)
    if user is not None:
        return {
            "username": username,
            "givenName": user['givenName'],
            "familyName": user['familyName']
        }
    raise NotFoundError()


def delete_user(username):
    return user_repository.delete_user(username)


def update_user(username, given_name, family_name):
    if given_name and family_name:
        user_repository.update_user(username, given_name, family_name)
        return {
            "username": username,
            "givenName": given_name,
            "familyName": family_name
        }
    raise InvalidDataError()


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