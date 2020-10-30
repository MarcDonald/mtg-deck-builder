from data import card_repository


def search_by_name(card_name, page_num, page_size):
    search_result = card_repository.search_by_name(card_name, page_num, page_size)
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

