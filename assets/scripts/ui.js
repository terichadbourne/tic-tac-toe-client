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
  $('#player-x-draws').html(store.xDraws)
  $('#player-o-draws').html(store.oDraws)
}

const showWinningCells = function () {
  store.winningCells.forEach((cellIndex) => {
    $(`#${cellIndex}`).addClass('winning-cell')
  })
}

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
