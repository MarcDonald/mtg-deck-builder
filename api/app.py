import jwt
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS

import config
from presenters import (auth_presenter, card_presenter, deck_presenter,
                        user_presenter)
from utils.auth_guards import auth_required
from utils.exceptions import (AlreadyExistsError, InvalidAccessError,
                              InvalidIdError, NotFoundError, InvalidDataError)
from utils.pagination_utils import get_page_number, get_page_size
from utils.response_utils import make_error_response, make_paginated_response

app = Flask(__name__)
prefix = "/api/v1"
app.config["JWT_SECRET"] = config.JWT_SECRET
CORS(app)


####
# AUTH ROUTES
###
@app.route(prefix + "/login", methods=["POST"])
def login():
    login_info = request.get_json()
    try:
        token = auth_presenter.login(login_info["username"], login_info["password"])
        return make_response({"token": token.decode("UTF-8")}, 200)
    except Exception as err:
        print(err)
        return make_error_response("Invalid username or password", 401)


@app.route(prefix + "/login/token", methods=["POST"])
@auth_required
def token_login():
    return make_response(jsonify({"message": "Success"}), 200)


@app.route(prefix + "/logout", methods=["POST"])
def logout():
    if "Authorization" in request.headers:
        auth_presenter.logout(request.headers["Authorization"])
        return make_response(jsonify({"message": "Logout Successful"}), 200)
    else:
        return make_error_response("Token is missing", 401)


@app.route(prefix + "/register", methods=["POST"])
def register_new_user():
    login_info = request.get_json()
    if (
            "username" in login_info
            and "givenName" in login_info
            and "familyName" in login_info
            and "password" in login_info
    ):
        try:
            result = auth_presenter.create_user(
                login_info["username"],
                login_info["givenName"],
                login_info["familyName"],
                login_info["password"],
            )
            return make_response(jsonify(result), 201)
        except AlreadyExistsError as err:
            return make_error_response("{}".format(err), 400)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response(
            "Username, passsword, givenName, and familyName must be in body", 400
        )


###
# CARD ROUTES
###
@app.route(prefix + "/cards/search", methods=["GET"])
@auth_required
def search_cards():
    if request.args.get("query"):
        search_term = str(request.args.get("query"))
        try:
            page_num = get_page_number(request)
            page_size = get_page_size(request)
            search_result = card_presenter.search_by_name(search_term, page_num, page_size)
            return make_paginated_response(
                search_result["data"], page_num, page_size, search_result["count"], 200
            )
        except ValueError as err:
            return make_error_response("{}".format(err), 400)
    else:
        return make_error_response("No query parameter supplied", 400)


@app.route(prefix + "/cards/<string:card_id>", methods=["GET"])
@auth_required
def get_card_details(card_id):
    try:
        card = card_presenter.get_card_details(card_id)
        return make_response(jsonify(card), 200)
    except InvalidIdError:
        return make_error_response("cardId is invalid", 400)
    except NotFoundError:
        return make_error_response("Card could not be found", 404)


###
# USER ROUTES
###
@app.route(prefix + "/user", methods=["GET"])
@auth_required
def get_current_user():
    token = request.headers["Authorization"]
    data = jwt.decode(token, config.JWT_SECRET)
    try:
        user = user_presenter.get_user_details(data["username"])
        return make_response(user, 200)
    except NotFoundError:
        return make_error_response("User could not be found", 404)


@app.route(prefix + "/user", methods=["PUT"])
@auth_required
def update_user():
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)

    login_info = request.get_json()
    if "givenName" in login_info and "familyName" in login_info:
        try:
            result = user_presenter.update_user(token_data["username"],
                                                login_info["givenName"],
                                                login_info["familyName"]
                                                )
            return make_response(jsonify(result), 200)
        except InvalidDataError:
            return make_error_response("All fields must contain a value", 400)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("givenName, and familyName must be in body", 400)


@app.route(prefix + "/user", methods=["DELETE"])
@auth_required
def delete_user():
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    user_presenter.delete_user(token_data["username"])
    return make_response(jsonify({}), 200)


###
# DECK ROUTES
###
@app.route(prefix + "/decks", methods=["GET"])
@auth_required
def get_users_decks():
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    try:
        page_num = get_page_number(request)
        page_size = get_page_size(request)
        result = deck_presenter.get_user_decks(
            token_data["username"], page_num, page_size
        )
        return make_paginated_response(
            result["data"], page_num, page_size, result["count"], 200
        )
    except ValueError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + "/decks/<string:deck_id>", methods=["GET"])
@auth_required
def get_specific_deck(deck_id):
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)

    try:
        deck = deck_presenter.get_deck_details(deck_id, token_data["username"])
        return make_response(jsonify(deck), 200)
    except InvalidAccessError:
        return make_error_response("You are not the owner of that deck", 401)
    except InvalidIdError:
        return make_error_response("Invalid ID", 400)
    except NotFoundError:
        return make_error_response("Deck could not be found", 404)


@app.route(prefix + "/decks", methods=["POST"])
@auth_required
def create_new_deck():
    request_data = request.get_json()
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    if "deckName" in request_data:
        try:
            result = deck_presenter.create_deck(
                token_data["username"], request_data["deckName"]
            )
            return make_response(jsonify(result), 201)
        except InvalidDataError:
            return make_error_response("deckName must not be empty", 400)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("deckName must be in body", 400)


@app.route(prefix + "/decks/<string:deck_id>", methods=["PUT"])
@auth_required
def update_deck_details(deck_id):
    request_data = request.get_json()
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    if "deckName" in request_data:
        try:
            result = deck_presenter.update_deck_details(
                deck_id, request_data["deckName"], token_data["username"]
            )
            return make_response(jsonify(result), 201)
        except NotFoundError:
            return make_error_response("Deck could not be found", 404)
        except InvalidAccessError:
            return make_error_response("You are not the owner of that deck", 401)
        except InvalidIdError:
            return make_error_response("Invalid deck ID", 400)
        except InvalidDataError:
            return make_error_response("All fields must have a value", 400)
        except Exception as err:
            return make_error_response("{}".format(err), 500)
    else:
        return make_error_response("deckName must be in body", 400)


@app.route(prefix + "/decks/<string:deck_id>", methods=["DELETE"])
@auth_required
def delete_deck(deck_id):
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    try:
        deck_presenter.delete_deck(deck_id, token_data["username"])
        return make_response(jsonify({}), 200)
    except InvalidAccessError:
        return make_error_response("You are not the owner of that deck", 401)
    except InvalidIdError as err:
        return make_error_response("{}".format(err), 400)
    except NotFoundError:
        return make_error_response("Deck could not be found", 404)
    except Exception as err:
        return make_error_response("{}".format(err), 500)


@app.route(prefix + "/decks/<string:deck_id>/<string:card_id>", methods=["POST"])
@auth_required
def add_card_to_deck(deck_id, card_id):
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    try:
        result = deck_presenter.add_card_to_deck(
            deck_id, card_id, token_data["username"]
        )
        return make_response(jsonify(result), 200)
    except InvalidAccessError:
        return make_error_response("You are not the owner of that deck", 401)
    except NotFoundError as err:
        return make_error_response("{}".format(err), 404)
    except InvalidIdError as err:
        return make_error_response("{}".format(err), 400)


@app.route(prefix + "/decks/<string:deck_id>/<string:deck_card_id>", methods=["DELETE"])
@auth_required
def delete_card_from_deck(deck_id, deck_card_id):
    token = request.headers["Authorization"]
    token_data = jwt.decode(token, config.JWT_SECRET)
    try:
        deck_presenter.delete_card_from_deck(
            deck_id, deck_card_id, token_data["username"]
        )
        return make_response(jsonify({}), 200)
    except InvalidIdError as err:
        return make_error_response("{}".format(err), 400)
    except InvalidAccessError:
        return make_error_response("You are not the owner of that deck", 401)
    except NotFoundError:
        return make_error_response("Card could not be found in deck", 404)


if __name__ == "__main__":
    app.run(debug=True)
