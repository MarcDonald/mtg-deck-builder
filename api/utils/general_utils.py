from bson import ObjectId

from utils.exceptions import InvalidIdError


def validate_id(id_to_check, name):
    if not ObjectId.is_valid(id_to_check):
        raise InvalidIdError("{} is not valid".format(name))


def stringify_id(item):
    item_id = str(item['_id'])
    del item['_id']
    item['id'] = item_id


def stringify_id_nonstandard_key(item, id_key, new_id_key):
    item_id = str(item[id_key])
    del item[id_key]
    item[new_id_key] = item_id

def convert_array_to_count(item, array_key, count_key):
    array_count = len(item[array_key])
    del item[array_key]
    item[count_key] = array_count
