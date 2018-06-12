#!/bin/bash

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games?over=false" \
  --header "Authorization: Token token=${TOKEN}" \

echo

# WORKING!!
