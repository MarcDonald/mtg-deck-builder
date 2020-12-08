from bson import ObjectId

from data import card_repository
from data.database_interactor import db

decks = db.decks


def add_note_to_deck(deck_id, note):
    return decks.update_one({"_id": ObjectId(deck_id)}, {"$push": {
        "notes": note
    }})


def update_note_in_deck(deck_id, note_id, edited_note):
    return decks.update_one({"notes._id": ObjectId(note_id)}, {"$set": edited_note})


def delete_note_from_deck(deck_id, note_id):
    return decks.update_one({"_id": ObjectId(deck_id)}, {"$pull": {
        "notes": {"_id": ObjectId(note_id)}
    }})
