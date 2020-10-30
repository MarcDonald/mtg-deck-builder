from data import user_repository
from utils.exceptions import NotFoundError, AlreadyExistsError


def login(username, password):
    return get_user_details(username)


def create_user(username, given_name, family_name):
    check_username_result = user_repository.get_user_details(username)
    if check_username_result is not None:
        raise AlreadyExistsError("User with that username already exists")
    else:
        user_repository.create_user(username, given_name, family_name)
        return {
            "username": username,
            "givenName": given_name,
            "familyName": family_name
        }


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
    user_repository.update_user(username, given_name, family_name)
    return {
        "username": username,
        "givenName": given_name,
        "familyName": family_name
    }
