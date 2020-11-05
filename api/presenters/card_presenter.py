from data import card_repository
from utils.exceptions import NotFoundError
from utils.general_utils import validate_id
from utils.pagination_utils import get_page_start


def search_by_name(card_name, page_num, page_size):
    page_start = get_page_start(page_size, page_num)
    search_result = card_repository.search_by_name(card_name, page_size, page_start)
    result_count = card_repository.search_by_name_count(card_name)
    returned_page = {}
    data = []
    for result in search_result:
        card_id = str(result['_id'])
        del result['_id']
        result['id'] = card_id
        data.append(result)
    returned_page['data'] = data
    returned_page['count'] = result_count
    return returned_page


def get_card_details(card_id):
    validate_id(card_id, "Card ID")
    card = card_repository.get_card_details(card_id)
    if card:
        del card['_id']
        card['id'] = card_id
        return card
    else:
        raise NotFoundError()
