import jwt
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

import config
from presenters import card_presenter, user_presenter, deck_presenter, auth_presenter
from utils.auth_guards import auth_required
from utils.exceptions import NotFoundError, InvalidIdError, AlreadyExistsError
from utils.pagination_utils import get_page_size, get_page_number
from utils.response_utils import make_error_response, make_paginated_response

app = Flask(__name__)
prefix = '/api/v1'
app.config['JWT_SECRET'] = config.JWT_SECRET
CORS(app)


####
# AUTH ROUTES
###
@app.route(prefix + '/login', methods=['POST'])
def login():
    login_info = request.get_json()
    try:
        token = auth_presenter.login(login_info['username'], login_info['password'])
        return make_response({"token": token.decode('UTF-8')}, 200)
    except Exception as err:
        print(err)
        return make_error_response("Invalid username or password", 401)


@app.route(prefix + '/login/token', methods=['POST'])
def token_login():
    return make_response(jsonify({'message': 'Success'}), 200)


@app.route(prefix + '/logout', methods=['POST'])
def logout():
    if 'Authorization' in request.headers:
        auth_presenter.logout(request.headers['Authorization'])
        return make_response(jsonify({"message": "Logout Successful"}), 200)
    else:
        return make_error_response("Token is missing", 401)


@app.route(prefix + '/register', methods=['POST'])
def register_new_user():
    login_info = request.get_json()
    if "username" in login_info \
            and "givenName" in login_info \
            and "familyName" in login_info \
            and "password" in login_info:
        try:
            result = auth_presenter.create_user(login_info['username'],
                                                login_info['givenName'],
                                                login_info['familyName'],
                                                login_info['password']
                                                )
            return make_response(jsonify(result), 201)
        except AlreadyExistsError as err:
            return make_error_response("{}".format(err), 400)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username, passsowrd, givenName, and familyName must be in body", 400)


###
# CARD ROUTES
###
@app.route(prefix + '/cards/search/<string:card_name>', methods=['GET'])
@auth_required
def search_cards_by_name(card_name):
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        search_result = card_presenter.search_by_name(card_name, page_num, page_size)
        return make_paginated_response(search_result['data'], page_num, page_size, search_result['count'], 200)
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + '/cards/<string:card_id>', methods=['GET'])
@auth_required
def get_card_details(card_id):
    try:
        card = card_presenter.get_card_details(card_id)
        return make_response(jsonify(card), 200)
    except NotFoundError:
        return make_error_response("Card could not be found", 404)


###
# USER ROUTES
###
@app.route(prefix + '/user', methods=['GET'])
@auth_required
def get_current_user():
    token = request.headers['Authorization']
    data = jwt.decode(token, config.JWT_SECRET)
    try:
        user = user_presenter.get_user_details(data['username'])
        return make_response(user, 200)
    except NotFoundError:
        return make_error_response("User could not be found", 404)


@app.route(prefix + '/users/<string:username>', methods=['GET'])
# TODO lock down
@auth_required
def get_user(username):
    try:
        user = user_presenter.get_user_details(username)
        return make_response(user, 200)
    except NotFoundError:
        return make_error_response("User could not be found", 404)


@app.route(prefix + '/users', methods=['PUT'])
# TODO lock down
@auth_required
def update_user():
    login_info = request.get_json()
    if "username" in login_info and "givenName" in login_info and "familyName" in login_info:
        try:
            result = user_presenter.update_user(login_info['username'],
                                                login_info['givenName'],
                                                login_info['familyName']
                                                )
            return make_response(jsonify(result), 200)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username, givenName, and familyName must be in body", 400)


@app.route(prefix + '/users', methods=['DELETE'])
# TODO lock down
@auth_required
def delete_user():
    token = request.headers['Authorization']
    token_data = jwt.decode(token, config.JWT_SECRET)
    user_presenter.delete_user(token_data['username'])
    return make_response(jsonify({}), 200)


###
# DECK ROUTES
###
@app.route(prefix + '/decks/user', methods=['GET'])
# TODO lock down
@auth_required
def get_users_decks():
    token = request.headers['Authorization']
    token_data = jwt.decode(token, config.JWT_SECRET)
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        result = deck_presenter.get_user_decks(token_data['username'], page_num, page_size)
        return make_paginated_response(result['data'], page_num, page_size, result['count'], 200)
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


# TODO paginate cards in deck?
@app.route(prefix + '/decks/<string:deck_id>', methods=['GET'])
# TODO lock down
@auth_required
def get_specific_deck(deck_id):
    try:
        deck = deck_presenter.get_deck_details(deck_id)
        return make_response(jsonify(deck), 200)
    except InvalidIdError:
        return make_error_response("Invalid ID", 400)
    except NotFoundError:
        return make_error_response("Deck could not be found", 404)


@app.route(prefix + '/decks', methods=['POST'])
@auth_required
def create_new_deck():
    login_info = request.get_json()
    # TODO get username from token
    if "username" in login_info and "deckName" in login_info:
        try:
            result = deck_presenter.create_deck(login_info['username'], login_info['deckName'])
            return make_response(jsonify(result), 201)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("Username and deckName must be in body", 400)


@app.route(prefix + '/decks/<string:deck_id>', methods=['PUT'])
# TODO lock down
@auth_required
def update_deck_details(deck_id):
    login_info = request.get_json()
    if "deckName" in login_info:
        try:
            result = deck_presenter.update_deck_details(deck_id, login_info['deckName'])
            return make_response(jsonify(result), 201)
        except NotFoundError as err:
            return make_error_response("Deck could not be found", 404)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("deckName must be in body", 400)


@app.route(prefix + '/decks/<string:deck_id>', methods=['DELETE'])
# TODO lock down
@auth_required
def delete_deck(deck_id):
    deck_presenter.delete_deck(deck_id)
    return make_response(jsonify({}), 200)


@app.route(prefix + '/decks/<string:deck_id>/<string:card_id>', methods=['POST'])
# TODO lock down
@auth_required
def add_card_to_deck(deck_id, card_id):
    try:
        result = deck_presenter.add_card_to_deck(deck_id, card_id)
        return make_response(jsonify(result), 200)
    except NotFoundError as err:
        return make_error_response("{}".format(err), 404)
    except InvalidIdError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + '/decks/<string:deck_id>/<string:deck_card_id>', methods=['DELETE'])
# TODO lock down
@auth_required
def delete_card_from_deck(deck_id, deck_card_id):
    deck_presenter.delete_card_from_deck(deck_id, deck_card_id)
    return make_response(jsonify({}), 200)


if __name__ == "__main__":
    app.run(debug=True)
