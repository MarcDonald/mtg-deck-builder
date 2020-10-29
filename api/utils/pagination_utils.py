def get_page_number(request):
    if request.args.get('page_num'):
        return request.args.get('page_num')
    return 1


def get_page_size(request):
    if request.args.get('page_size'):
        return request.args.get('page_size')
    return 10


def get_page_start(page_size, page_num):
    return int(page_size) * (int(page_num) - 1)
