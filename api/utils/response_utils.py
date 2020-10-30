from flask import make_response, jsonify
from utils.pagination_utils import get_max_page


def make_error_response(message, status):
    return make_response(jsonify({"message": message}), status)


def make_paginated_response(data, page_num, page_size, count, status):
    return make_response(jsonify({
        "data": data,
        "pageNum": page_num,
        "pageSize": page_size,
        "count": count,
        "maxPage": get_max_page(page_size, count)
    }), status)
