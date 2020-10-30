import re

from data.database_interactor import db
from utils.pagination_utils import get_page_start

cards = db.mtgCards


def search_by_name(card_name, page_num, page_size):
    search_regex = re.compile("^.*{}.*$".format(card_name), re.IGNORECASE)
    page_start = get_page_start(page_size, page_num)
    results_count = cards \
        .count({"name": search_regex})
    search_results = cards \
        .find({"name": search_regex}) \
        .skip(int(page_start)) \
        .limit(int(page_size))
    returned_page = {}
    data = []
    for result in search_results:
        result['_id'] = str(result['_id'])
        data.append(result)
    returned_page['data'] = data
    returned_page['count'] = results_count
    return returned_page
