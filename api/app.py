from flask import Flask, make_response, jsonify, request
from utils.pagination_utils import get_page_size, get_page_number

from presenters import card_presenter

app = Flask(__name__)


@app.route('/api/v1/cards/search/<string:card_name>')
def get_user(card_name):
    search_result = card_presenter.search_by_name(card_name, get_page_number(request), get_page_size(request))
    return make_response(jsonify(search_result), 200)


if __name__ == "__main__":
    app.run(debug=True)
