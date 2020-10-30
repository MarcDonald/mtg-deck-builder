from bson import ObjectId

from data import deck_repository, card_repository
from utils.exceptions import NotFoundError, InvalidIdError
from utils.pagination_utils import get_page_start


def create_deck(username, deck_name):
    deck_id = deck_repository.create_deck(username, deck_name)
    return {
        "id": str(deck_id),
    }


def update_deck_details(deck_id, deck_name):
    deck = get_deck_details(deck_id)
    if deck is not None:
        deck_repository.update_deck_details(deck_id, deck_name)
        return {
            "id": deck_id,
            "name": deck_name
        }
    else:
        raise NotFoundError()


def get_deck_details(deck_id):
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        del deck['_id']
        deck['id'] = str(deck_id)
        for card in deck['cards']:
            card_id = str(card['_id'])
            del card['_id']
            card['id'] = card_id
            card['card_deck_id'] = str(card['card_deck_id'])
        return deck
    raise NotFoundError()


def delete_deck(deck_id):
    return deck_repository.delete_deck(deck_id)


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
        for card in result['cards']:
            card_id = str(card['_id'])
            del card['_id']
            card['id'] = card_id
            card['card_deck_id'] = str(card['card_deck_id'])
        data.append(result)
    returned_page['data'] = data
    returned_page['count'] = deck_count
    return returned_page


def validate_id(id_to_check, name):
    if not ObjectId.is_valid(id_to_check):
        raise InvalidIdError("{} is not valid".format(name))


def add_card_to_deck(deck_id, card_id):
    validate_id(deck_id, "Deck ID")
    validate_id(card_id, "Card ID")
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        card = card_repository.get_card_details(card_id)
        if card is not None:
            card_deck_id = deck_repository.add_card_to_deck(deck_id, card_id)
            return {
                "cardDeckId": str(card_deck_id)
            }
        else:
            raise NotFoundError("Card could not be found")
    else:
        raise NotFoundError("Deck could not be found")


def delete_card_from_deck(deck_id, card_deck_id):
    validate_id(deck_id, "Deck ID")
    validate_id(card_deck_id, "Card ID")
    deck = deck_repository.get_deck_details(deck_id)
    if deck is not None:
        return deck_repository.delete_card_from_deck(deck_id, card_deck_id)
    else:
        raise NotFoundError("Deck could not be found")
