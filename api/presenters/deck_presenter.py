from data import deck_repository, card_repository
from utils.exceptions import NotFoundError, InvalidAccessError, InvalidDataError
from utils.general_utils import validate_id, stringify_id, convert_array_to_count, stringify_id_nonstandard_key
from utils.pagination_utils import get_page_start
from bson import ObjectId


def verify_owner_from_deck_id(deck_id, username):
    deck_owner = deck_repository.get_owner_of_deck(deck_id)
    if deck_owner is not None:
        if deck_owner != username:
            raise InvalidAccessError()
    else:
        raise NotFoundError()

def verify_owner_from_deck(deck, username):
    if deck is not None:
        if deck['username'] != username:
            raise InvalidAccessError()
    else:
        raise NotFoundError()


def create_deck(username, deck_name):
    if deck_name:
        deck_id = deck_repository.create_deck(username, deck_name)
        return {
            "id": str(deck_id),
        }
    else:
        raise InvalidDataError()


def update_deck_details(deck_id, deck_name, username):
    validate_id(deck_id, "Deck ID")
    if deck_name:
        verify_owner_from_deck_id(deck_id, username)
        deck_repository.update_deck_details(deck_id, deck_name)
        return {
            "id": deck_id,
            "name": deck_name
        }
    else:
        raise InvalidDataError()


def get_deck_details(deck_id, username):
    validate_id(deck_id, "Deck ID")
    deck = deck_repository.get_deck_details(deck_id)
    verify_owner_from_deck(deck, username)
    stringify_id(deck)
    for card in deck['cards']:
        stringify_id(card)
        stringify_id_nonstandard_key(card, 'card_deck_id', 'cardDeckId')
    for note in deck['notes']:
        stringify_id(note)
    return deck


def delete_deck(deck_id, username):
    validate_id(deck_id, "Deck ID")
    verify_owner_from_deck_id(deck_id, username)
    return deck_repository.delete_deck(deck_id)


def get_user_decks(username, page_num, page_size):
    page_start = get_page_start(page_size, page_num)
    decks = deck_repository.get_user_decks(username, page_size, page_start)
    deck_count = deck_repository.get_user_deck_count(username)
    returned_page = {}
    data = []
    for deck in decks:
        stringify_id(deck)
        convert_array_to_count(deck, 'cards', 'cardCount')
        convert_array_to_count(deck, 'notes', 'noteCount')
        data.append(deck)
    returned_page['data'] = data
    returned_page['count'] = deck_count
    return returned_page


def add_card_to_deck(deck_id, card_id, username):
    validate_id(deck_id, "Deck ID")
    validate_id(card_id, "Card ID")
    verify_owner_from_deck_id(deck_id, username)
    card = card_repository.get_card_details(card_id)
    if card is not None:
        card_deck_id = deck_repository.add_card_to_deck(
            deck_id, card_id)
        return {
            "cardDeckId": str(card_deck_id)
        }
    else:
        raise NotFoundError("Card could not be found")


def delete_card_from_deck(deck_id, card_deck_id, username):
    validate_id(deck_id, "Deck ID")
    validate_id(card_deck_id, "Card Deck ID")
    verify_owner_from_deck_id(deck_id, username)
    return deck_repository.delete_card_from_deck(deck_id, card_deck_id)
