'use strict'

const store = require('./store')

const addHandlers = function () {
  $('.game-cell').on('click', playHere)
}

const playHere = function (event) {
  console.log('Clicked cell # (event.target.id): ', event.target.id)
  swapTurns()
}

const swapTurns = function () {
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
