from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

from presenters import card_presenter, user_presenter, deck_presenter
from utils.exceptions import NotFoundError, InvalidIdError
from utils.pagination_utils import get_page_size, get_page_number
from utils.response_utils import make_error_response, make_paginated_response

app = Flask(__name__)
prefix = '/api/v1'
CORS(app)


####
# AUTH ROUTES
###
@app.route(prefix + '/login', methods=['GET'])
def login():
    return make_response(jsonify({}), 200)


@app.route(prefix + '/logout', methods=['GET'])
def logout():
    return make_response(jsonify({}), 200)


###
# CARD ROUTES
###
@app.route(prefix + '/cards/search/<string:card_name>', methods=['GET'])
def search_cards_by_name(card_name):
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        search_result = card_presenter.search_by_name(card_name, page_num, page_size)
        return make_paginated_response(search_result['data'], page_num, page_size, search_result['count'], 200)
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + '/cards/<string:card_id>', methods=['GET'])
def get_card_details(card_id):
    try:
        card = card_presenter.get_card_details(card_id)
        return make_response(jsonify(card), 200)
    except NotFoundError:
        return make_error_response("Card could not be found", 404)


###
# USER ROUTES
###
@app.route(prefix + '/users', methods=['POST'])
def register_new_user():
    if "username" in request.form and "givenName" in request.form and "familyName" in request.form:
        try:
            result = user_presenter.create_user(request.form['username'],
                                                request.form['givenName'],
                                                request.form['familyName']
                                                )
            return make_response(jsonify(result), 201)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username, givenName, and familyName must be in form", 400)


@app.route(prefix + '/users/<string:username>', methods=['GET'])
def get_user(username):
    try:
        user = user_presenter.get_user_details(username)
        return make_response(user, 200)
    except NotFoundError:
        return make_error_response("User could not be found", 404)


@app.route(prefix + '/users', methods=['PUT'])
def update_user():
    if "username" in request.form and "givenName" in request.form and "familyName" in request.form:
        try:
            result = user_presenter.update_user(request.form['username'],
                                                request.form['givenName'],
                                                request.form['familyName']
                                                )
            return make_response(jsonify(result), 200)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username, givenName, and familyName must be in form", 400)


@app.route(prefix + '/users/<string:username>', methods=['DELETE'])
def delete_user(username):
    user_presenter.delete_user(username)
    return make_response(jsonify({}), 200)


###
# DECK ROUTES
###
@app.route(prefix + '/decks/user/<string:username>', methods=['GET'])
def get_users_decks(username):
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        result = deck_presenter.get_user_decks(username, page_num, page_size)
        return make_paginated_response(result['data'], page_num, page_size, result['count'], 200)
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


# TODO paginate cards in deck?
@app.route(prefix + '/decks/<string:deck_id>', methods=['GET'])
def get_specific_deck(deck_id):
    try:
        deck = deck_presenter.get_deck_details(deck_id)
        return make_response(jsonify(deck), 200)
    except NotFoundError:
        return make_error_response("Deck could not be found", 404)


@app.route(prefix + '/decks', methods=['POST'])
def create_new_deck():
    if "username" in request.form and "deckName" in request.form:
        try:
            result = deck_presenter.create_deck(request.form['username'], request.form['deckName'])
            return make_response(jsonify(result), 201)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username and deckName must be in form", 400)


@app.route(prefix + '/decks/<string:deck_id>', methods=['PUT'])
def update_deck_details(deck_id):
    if "deckName" in request.form:
        try:
            result = deck_presenter.update_deck_details(deck_id, request.form['deckName'])
            return make_response(jsonify(result), 201)
        except NotFoundError as err:
            return make_error_response("Deck could not be found", 404)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("deckName must be in form", 400)


@app.route(prefix + '/decks/<string:deck_id>', methods=['DELETE'])
def delete_deck(deck_id):
    deck_presenter.delete_deck(deck_id)
    return make_response(jsonify({}), 200)


@app.route(prefix + '/decks/<string:deck_id>/<string:card_id>', methods=['POST'])
def add_card_to_deck(deck_id, card_id):
    try:
        result = deck_presenter.add_card_to_deck(deck_id, card_id)
        return make_response(jsonify(result), 200)
    except NotFoundError as err:
        return make_error_response("{}".format(err), 404)
    except InvalidIdError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + '/decks/<string:deck_id>/<string:card_deck_id>', methods=['DELETE'])
def delete_card_from_deck(deck_id, card_deck_id):
    deck_presenter.delete_card_from_deck(deck_id, card_deck_id)
    return make_response(jsonify({}), 200)


if __name__ == "__main__":
    app.run(debug=True)
