'use strict'

const store = require('./store')

// all event handlers
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#restart-game').on('click', restartGame)
}

const restartGame = function (event) {
  // set current player to x
  store.currentTurn = 'x'
  // empty out contents of all game cells
  $('.game-cell').html('')
  // set player x active and player o inactive
  $('#player-x').addClass('active')
  $('#player-o').removeClass('active')
}

const playHere = function (event) {
  console.log('Player ', store.currentTurn, ' selected cell ', event.target.id)
  // if cell was blank, add symbol of current player, then swap players
  if ($(event.target).html() === '') {
    $(event.target).html(store.currentTurn)
    swapTurns()
  // if cell was occupied, log error and prevent play and turn swap
  } else {
    console.log('That cell is already occupied. Try again!')
  }
}

const swapTurns = function () {
  // swap value of store.currentTurn and toggle active classes
  if (store.currentTurn === 'x') {
    store.currentTurn = 'o'
    $('.player').toggleClass('active')
  } else if (store.currentTurn === 'o') {
    store.currentTurn = 'x'
    $('.player').toggleClass('active')
  } else {
    console.log('something went wrong in swapTurns')
  }
  console.log('now the turn of player ', store.currentTurn)
}

module.exports = {
  addHandlers: addHandlers,
  swapTurns: swapTurns,
  playHere: playHere
}
