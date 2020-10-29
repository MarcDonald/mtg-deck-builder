import re

from data.database_interactor import db
from utils.pagination_utils import get_page_start

cards = db.mtgCards


def search_by_name(card_name, page_num, page_size):
    search_regex = re.compile("^.*{}.*$".format(card_name), re.IGNORECASE)
    page_start = get_page_start(page_size, page_num)
    search_results = cards \
        .find({"name": search_regex}) \
        .skip(int(page_start)) \
        .limit(int(page_size))
    data_to_return = []
    for result in search_results:
        print(result)
        result['_id'] = str(result['_id'])
        data_to_return.append(result)
    return data_to_return
