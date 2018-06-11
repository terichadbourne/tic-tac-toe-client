#!/bin/bash

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games?over=true" \
  --header "Authorization: Token token=${TOKEN}" \

echo

# WORKING!!
