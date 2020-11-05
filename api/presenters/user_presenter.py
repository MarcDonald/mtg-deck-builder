from data import user_repository
from utils.exceptions import NotFoundError, InvalidDataError


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
