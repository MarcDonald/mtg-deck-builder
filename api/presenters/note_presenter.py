from data import deck_repository, note_repository
from utils.exceptions import NotFoundError, InvalidAccessError, InvalidDataError
from utils.general_utils import validate_id
from utils.pagination_utils import get_page_start
from bson import ObjectId


def add_note_to_deck(deck_id, note_message, username):
    if note_message:
        validate_id(deck_id, "Deck ID")
        deck = deck_repository.get_deck_details(deck_id)
        if deck is not None:
            if deck['username'] == username:
                new_note_id = ObjectId()
                new_note = {
                    "_id": new_note_id,
                    "message": note_message
                }
                note_repository.add_note_to_deck(deck_id, new_note)
                return {
                    "id": str(new_note_id),
                }
            else:
                raise InvalidAccessError()
        else:
            raise NotFoundError("Deck could not be found")
    raise InvalidDataError()

def update_note_in_deck(deck_id, note_id, note_message, username):
    if note_message:
        validate_id(deck_id, "Deck ID")
        validate_id(note_id, "Note ID")
        deck = deck_repository.get_deck_details(deck_id)
        if deck is not None:
            if deck['username'] == username:
                edited_note = {
                    "notes.$.message": note_message
                }
                result = note_repository.update_note_in_deck(note_id, edited_note)
                if result.matched_count > 0:
                    return {
                        "id": str(note_id),
                        "message": note_message
                    }
                else:
                    raise NotFoundError("Note could not be found")
            else:
                raise InvalidAccessError()
        else:
            raise NotFoundError("Deck could not be found")
    raise InvalidDataError()

def delete_note_from_deck(deck_id, note_id, username):
    validate_id(deck_id, "Deck ID")
    validate_id(note_id, "Note ID")
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        if deck['username'] == username:
            return note_repository.delete_note_from_deck(deck_id, note_id)
        else:
            raise InvalidAccessError()
    else:
        raise NotFoundError("Deck could not be found")