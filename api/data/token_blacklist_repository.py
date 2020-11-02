from data.database_interactor import db

blacklist = db.tokenBlacklist


def add(token):
    return blacklist.insert({
        "token": token
    })


def find(token):
    return blacklist.find_one({"token": token})
