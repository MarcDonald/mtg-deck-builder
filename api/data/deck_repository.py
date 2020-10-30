from bson import ObjectId

from data import card_repository
from data.database_interactor import db

decks = db.decks


def create_deck(username, deck_name):
    return decks.insert({
        "_id": ObjectId(),
        "username": username,
        "name": deck_name,
        "cards": []
    })


def update_deck_details(deck_id, deck_name):
    decks.update_one({"_id": ObjectId(deck_id)}, {"$set": {
        "name": deck_name,
    }})


def get_deck_details(deck_id):
    return decks.find_one({"_id": ObjectId(deck_id)})


def delete_deck(deck_id):
    decks.delete_one({"_id": ObjectId(deck_id)})


def get_user_decks(username, page_size, page_start):
    results = decks \
        .find({"username": username}) \
        .skip(int(page_start)) \
        .limit(int(page_size))
    return results


def get_user_deck_count(username):
    return decks.count({"username": username})


def add_card_to_deck(deck_id, card_id):
    card = card_repository.get_card_details(card_id)
    # card_deck_id is the id of the card within the deck, this is so a single card can be removed without removing
    # all cards with the same ID
    card_deck_id = ObjectId()
    card['card_deck_id'] = card_deck_id
    decks.update_one({"_id": ObjectId(deck_id)}, {"$push": {
        "cards": card
    }})
    return card_deck_id


def delete_card_from_deck(deck_id, card_deck_id):
    return decks.update_one({"_id": ObjectId(deck_id)}, {"$pull": {
        "cards": {"card_deck_id": ObjectId(card_deck_id)}
    }})
