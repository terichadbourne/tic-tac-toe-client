'use strict'

const store = require('./store')

// displays a message to the user
const showMessage = function (message) {
  $('#message').html(message)
}

// removes message currently displayed to user
const clearMessage = function () {
  $('#message').html('')
}

// loop through `store.cells` array to draw game board
const displayCells = function () {
  console.log('running displayCells')
  store.game.cells.forEach((element, index) => {
    $(`#${index}`).html(element)
  })
}

const updateWins = function () {
  $('#player-x-wins').html(store.xWins)
  $('#player-o-wins').html(store.oWins)
}

module.exports = {
  showMessage: showMessage,
  clearMessage: clearMessage,
  displayCells: displayCells,
  updateWins: updateWins
}
