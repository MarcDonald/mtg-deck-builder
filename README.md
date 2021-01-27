# Deck Builder for Magic the Gathering

This is a full-stack application that was created for an assignment in my Software Engineering
university course. For this assignment I was given a mark of 94%.

## Technologies

The application is made up of:

- A MongoDB database
- A Python Flask REST API
- An Angular webapp

## Features

- Authorization and Authentication on REST APIs using JWT
- User passwords stored using bcrypt
- Page protection using Angular guards
- Pagination on API
- Ability to create a deck and give it a name
- Ability to add notes to a deck
- Ability to search cards by their name and view all card details
- Ability to add and remove cards to and from a deck
- Ability to rename decks and delete them
- Ability to change your user details and delete your account

## Screenshots

|                        Register                         |                      Home                       |
| :-----------------------------------------------------: | :---------------------------------------------: |
| ![Register](/.github/screenshots/register.png?raw=true) | ![Home](/.github/screenshots/home.png?raw=true) |

|                      Add Deck Note                       |                          Card Details                          |
| :------------------------------------------------------: | :------------------------------------------------------------: |
| ![Add Deck Note](/.github/screenshots/note.png?raw=true) | ![Card Details](/.github/screenshots/cardDetails.png?raw=true) |

## API Documentation

You can find some documentation on the API
[here](https://documenter.getpostman.com/view/8039443/TVmTbZwC)

## OSS Used

### Data

#### Card data from [MTGJSON](https://mtgjson.com/) and slightly modified

MIT License

### API

#### [py-bson](https://github.com/py-bson/bson)

[License](https://github.com/py-bson/bson/blob/master/LICENSE)

#### [Flask](https://github.com/pallets/flask)

BSD-3-Clause License

#### [pyjwt](https://github.com/jpadilla/pyjwt)

MIT License

#### [PyMongo](https://github.com/mongodb/mongo-python-driver)

Apache 2.0 License

### Web-App

#### [Angular](https://github.com/angular/angular)

MIT License

#### [Angular Material](https://material.angular.io/)

MIT License

#### [RxJS](https://github.com/ReactiveX/rxjs)

Apache 2.0 License

#### [Prettier](https://github.com/prettier/prettier)

MIT License
