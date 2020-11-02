from bson import ObjectId

from data.database_interactor import db

users = db.users


def create_user(username, given_name, family_name, password):
    return users.insert({
        "_id": ObjectId(),
        "username": username,
        "givenName": given_name,
        "familyName": family_name,
        "password": password
    })


def get_user_details(username):
    return users.find_one({"username": username})


def delete_user(username):
    users.delete_one({"username": username})


def update_user(username, given_name, family_name):
    users.update_one({"username": username}, {"$set": {
        "givenName": given_name,
        "familyName": family_name
    }})
