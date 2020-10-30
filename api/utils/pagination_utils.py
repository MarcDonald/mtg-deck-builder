import math


def get_page_number(request):
    try:
        if request.args.get('page_num'):
            return int(request.args.get('page_num'))
        return 1
    except ValueError:
        raise ValueError("page_num must be an integer")


def get_page_size(request):
    try:
        if request.args.get('page_size'):
            return int(request.args.get('page_size'))
        return 10
    except ValueError:
        raise ValueError("page_size must be an integer")


def get_page_start(page_size, page_num):
    return int(page_size) * (int(page_num) - 1)


def get_max_page(page_size, result_count):
    if result_count == 0:
        return 1
    return int(math.ceil(int(result_count) / int(page_size)))
