'use strict'

// require dependencies
const store = require('./store')

// display a message to the user
const showMessage = function (message) {
  $('#message').html(message)
}

// remove message currently displayed to user
const clearMessage = function () {
  $('#message').html('')
}

// loop through `store.cells` array to draw symbols on game board
const displayCells = function () {
  store.game.cells.forEach((element, index) => {
    $(`#${index}`).html(element)
  })
}

// update display of win and draw counts
const updateWins = function () {
  $('#player-x-wins').html(store.xWins)
  $('#player-o-wins').html(store.oWins)
  $('#player-x-draws').html(store.xDraws)
  $('#player-o-draws').html(store.oDraws)
}

// highlight cells that make up the winning line
const showWinningCells = function () {
  store.winningCells.forEach((cellIndex) => {
    $(`#${cellIndex}`).addClass('winning-cell')
  })
}

// remove highlighting from game board
const hideWinningCells = function () {
  $('.game-cell').removeClass('winning-cell')
}

module.exports = {
  showMessage: showMessage,
  clearMessage: clearMessage,
  displayCells: displayCells,
  updateWins: updateWins,
  showWinningCells: showWinningCells,
  hideWinningCells: hideWinningCells
}
