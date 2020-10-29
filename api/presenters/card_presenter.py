from data import card_repository


def search_by_name(card_name, page_num, page_size):
    return card_repository.search_by_name(card_name, page_num, page_size)
