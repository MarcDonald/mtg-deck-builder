from bson import ObjectId

from utils.exceptions import InvalidIdError


def validate_id(id_to_check, name):
    if not ObjectId.is_valid(id_to_check):
        raise InvalidIdError("{} is not valid".format(name))
