#!/bin/bash

curl --include --request PATCH "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
      "game": {
        "cell": {
          "index": "'${INDEX}'",
          "value": "'"${VALUE}"'"
        },
        "over": "'${OVER}'"
        }
      }'

echo

# WORKING!!

# This update action expects a PATCH with changes to to an existing game, e.g.:
#
# Using an HTML form element this may look like:
#
# <form>
#   <input name="game[cell][index]" type="text" value="0">
#   <input name="game[cell][value]" type="text" value="x">
#   <input name="game[over]" type="text" value="false">
# </form>
# Alternatively, you may want to store the cell index in an HTML element that is not a form. To do this, you could utilize data attributes and add the value and over properties using javascript.
#
# <div data-cell-index='0'>
# </div>
# The update action expects data formatted as such:
#
# {
#   "game": {
#     "cell": {
#       "index": 0,
#       "value": "x"
#     },
#     "over": false
#   }
# }
# If the request is successful, the response will have an HTTP Status of 200 OK, and the body will be JSON containing the modified game, e.g.:
#
# {
#   "game": {
#     "id": 1,
#     "cells": ["x","","","","","","","",""],
#     "over":false,
#     "player_x": {
#       "id": 1,
#       "email": "and@and.com"
#       },
#     "player_o": {
#       "id": 3,
#       "email":
#       "dna@dna.com"
#     }
#   }
# }
# If the request is unsuccessful, the response will have an HTTP Status of 400 Bad Request, and the response body will be JSON describing the errors.
