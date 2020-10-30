from flask import make_response, jsonify


def make_error_response(message, status):
    return make_response(jsonify({"error": message}), status)


# TODO maxPageNum
def make_paginated_response(data, page_num, page_size, status):
    return make_response(jsonify({
        "data": data,
        "pageNum": page_num,
        "pageSize": page_size
    }), status)
