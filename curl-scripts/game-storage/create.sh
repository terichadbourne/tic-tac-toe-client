#!/bin/bash

curl --include --request POST "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo

# WORKING!!

# The create action expects a POST with an empty body (e.g '' or '{}' if JSON). If the request is successful, the response will have an HTTP Status of 201 Created, and the body will contain JSON of the created game with player_x set to the user calling create, e.g.:
#
# {
#   "game": {
#     "id": 3,
#     "cells": ["","","","","","","","",""],
#     "over": false,
#     "player_x": {
#       "id": 1,
#       "email": "and@and.com"
#     },
#     "player_o": null
#   }
# }
# If the request is unsuccessful, the response will have an HTTP Status of 400 Bad Request, and the response body will be JSON describing the errors.
