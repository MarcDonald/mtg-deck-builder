from bson import ObjectId

from data import deck_repository, card_repository
from utils.exceptions import NotFoundError, InvalidIdError, InvalidAccessError
from utils.pagination_utils import get_page_start


def create_deck(username, deck_name):
    deck_id = deck_repository.create_deck(username, deck_name)
    return {
        "id": str(deck_id),
    }


def update_deck_details(deck_id, deck_name, username):
    deck = get_deck_details(deck_id)
    if deck is not None:
        if deck['username'] is username:
            deck_repository.update_deck_details(deck_id, deck_name)
            return {
                "id": deck_id,
                "name": deck_name
            }
        else:
            raise InvalidAccessError()
    else:
        raise NotFoundError()


def get_deck_details(deck_id, username):
    if ObjectId.is_valid(deck_id):
        deck = deck_repository.get_deck_details(deck_id)
        if deck is not None:
            if deck['username'] == username:
                del deck['_id']
                deck['id'] = str(deck_id)
                for card in deck['cards']:
                    card_id = str(card['_id'])
                    del card['_id']
                    card['id'] = card_id
                    card['cardDeckId'] = str(card['deck_card_id'])
                    del card['deck_card_id']
                return deck
            raise InvalidAccessError()
        raise NotFoundError()
    else:
        raise InvalidIdError()


def delete_deck(deck_id, username):
    deck_owner = deck_repository.get_owner_of_deck(deck_id)
    if deck_owner is not None:
        deck_owner = deck_owner['username']
    if deck_owner == username:
        return deck_repository.delete_deck(deck_id)
    else:
        raise InvalidAccessError()


def get_user_decks(username, page_num, page_size):
    page_start = get_page_start(page_size, page_num)
    decks = deck_repository.get_user_decks(username, page_size, page_start)
    deck_count = deck_repository.get_user_deck_count(username)
    returned_page = {}
    data = []
    for result in decks:
        deck_id = str(result['_id'])
        del result['_id']
        result['id'] = deck_id
        card_count = len(result['cards'])
        del result['cards']
        result['cardCount'] = card_count
        data.append(result)
    returned_page['data'] = data
    returned_page['count'] = deck_count
    return returned_page


def validate_id(id_to_check, name):
    if not ObjectId.is_valid(id_to_check):
        raise InvalidIdError("{} is not valid".format(name))


def add_card_to_deck(deck_id, card_id, username):
    validate_id(deck_id, "Deck ID")
    validate_id(card_id, "Card ID")
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        if deck['username'] == username:
            card = card_repository.get_card_details(card_id)
            if card is not None:
                deck_card_id = deck_repository.add_card_to_deck(deck_id, card_id)
                return {
                    "cardDeckId": str(deck_card_id)
                }
            else:
                raise NotFoundError("Card could not be found")
        else:
            raise InvalidAccessError()
    else:
        raise NotFoundError("Deck could not be found")


def delete_card_from_deck(deck_id, deck_card_id, username):
    validate_id(deck_id, "Deck ID")
    validate_id(deck_card_id, "Card ID")
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        if deck['username'] == username:
            return deck_repository.delete_card_from_deck(deck_id, deck_card_id)
        else:
            raise InvalidAccessError()
    else:
        raise NotFoundError("Deck could not be found")
