import re

from bson import ObjectId

from data.database_interactor import db

cards = db.mtgCards


def search_by_name(card_name, page_size, page_start):
    search_regex = re.compile("^.*{}.*$".format(card_name), re.IGNORECASE)
    search_results = cards \
        .find({"name": search_regex}) \
        .skip(int(page_start)) \
        .limit(int(page_size))
    return search_results


def search_by_name_count(card_name):
    search_regex = re.compile("^.*{}.*$".format(card_name), re.IGNORECASE)
    return cards.count({"name": search_regex})


def get_card_details(card_id):
    return cards.find_one({"_id": ObjectId(card_id)})
