#!/bin/bash

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --include \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo

# WORKING !!
#
#The show action is a GET specifing the id of the game to retrieve. If the request is successful the status will be 200, OK, and the response body will contain JSON for the game requested, e.g.:
#
# {
#   "game": {
#     "id": 1,
#     "cells": ["o","x","o","x","o","x","o","x","o"],
#     "over": true,
#     "player_x": {
#       "id": 1,
#       "email": "and@and.com"
#     },
#     "player_o": {
#       "id": 3,
#       "email": "dna@dna.com"
#     }
#   }
# }
