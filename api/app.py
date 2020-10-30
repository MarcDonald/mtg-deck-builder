from flask import Flask, request
from flask_cors import CORS

from presenters import card_presenter
from utils.pagination_utils import get_page_size, get_page_number
from utils.response_utils import make_error_response, make_paginated_response

app = Flask(__name__)
CORS(app)


@app.route('/api/v1/cards/search/<string:card_name>')
def get_user(card_name):
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        search_result = card_presenter.search_by_name(card_name, page_num, page_size)
        return make_paginated_response(search_result, page_num, page_size, 200)
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


if __name__ == "__main__":
    app.run(debug=True)
