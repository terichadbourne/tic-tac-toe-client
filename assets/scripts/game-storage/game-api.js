'use strict'

const config = require('../config')
const store = require('../store')

// CREATE A GAME

const createGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

// Expected responses:
//
// SUCCESS: HTTP Status of 201 Created, body JSON of the created game with
// player_x set to the user calling create, e.g.:
//
//  {
//    "game": {
//      "id": 3,
//      "cells": ["","","","","","","","",""],
//      "over": false,
//      "player_x": {
//        "id": 1,
//        "email": "and@and.com"
//      },
//      "player_o": null
//    }
//  }
//
// ERROR: HTTP Status of 400 Bad Request, body of JSON describing the errors

// ***********************************************

// UPDATE A GAME
const updateGame = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/games/${store.game.id}`,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// expected responses:
//
// SUCCESS: HTTP Status of 200 OK, body of JSON containing modified game, e.g.:
//
//  {
//    "game": {
//      "id": 1,
//      "cells": ["x","","","","","","","",""],
//      "over":false,
//      "player_x": {
//        "id": 1,
//        "email": "and@and.com"
//        },
//      "player_o": {
//        "id": 3,
//        "email":
//        "dna@dna.com"
//      }
//    }
//  }
//
//  ERROR: HTTP Status of 400 Bad Request, response body JSON describing errors

// ***********************************************

// SHOW A GAME

// ***********************************************

// SHOW A SPECIFIC GAME

// ***********************************************

// SHOW ALL OF USER'S GAMES
const getCompletedGames = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/games?over=true',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// The index action is a GET that retrieves all the games associated with a user. The response body will contain JSON containing an array of games, e.g.:
//
// {
//   "games": [
//     {
//       "id": 1,
//       "cells": ["o","x","o","x","o","x","o","x","o"],
//       "over": true,
//       "player_x": {
//         "id": 1,
//         "email": "and@and.com"
//       },
//       "player_o": {
//         "id": 3,
//         "email": "dna@dna.com"
//       }
//     },
//     {
//       "id": 2,
//       "cells": ["","","","","","","","",""],
//       "over": false,
//       "player_x": {
//         "id": 3,
//         "email": "dna@dna.com"
//       },
//       "player_o": {
//         "id": 1,
//         "email": "and@and.com"
//       }
//     }
//   ]
// }
// If the over query parameter is specified the results will be restricted accordingly.
//
// If there are no games associated with the user, the response body will contain an empty games array, e.g.:
//
// {
//   "games": [
//   ]
// }
// Example of using the optional query parameter:
// End point to fetch all of a user's games
//
// /games
// End point to fetch all of a user's games that are over
//
// /games?over=true
// End point to fetch all of a user's games that are not over
//
// /games?over=false
//
//
module.exports = {
  createGame: createGame,
  updateGame: updateGame,
  getCompletedGames: getCompletedGames
}
