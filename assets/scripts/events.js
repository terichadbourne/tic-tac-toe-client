'use strict'

const store = require('./store')
const ui = require('./ui')
const gameEvents = require('./game-storage/events')

// all event handlers
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#restart-game').on('click', restartGame)
}

const restartGame = function (event) {
  // clear message display
  ui.clearMessage()
  // // if someone's logged in, create new game on server
  // if (store.user) {
  //   gameEvents.createGame(store.user.token)
  // }
  // set game state and current turn and clear out cells array
  store.over = false
  store.currentTurn = 'x'
  store.cells = ['', '', '', '', '', '', '', '', '']
  // empty contents game cells & update win counts
  ui.displayCells()
  ui.updateWins()
  // set player x active and player o inactive
  $('#player-x').addClass('active')
  $('#player-o').removeClass('active')
  // set restart game button text
  $('#restart-game').html('Restart Game')
  $('#restart-game').removeClass('rematch')
}

const playHere = function (event) {
  // clear any previous messages
  ui.clearMessage()
  // if not logged in, block action, otherwsie continue
  if (!store.user) {
    ui.showMessage('You must log in before you can play.')
  } else {
    // if the game's not already over...
    if (store.over === false) {
      // if cell was blank, add symbol of current player to `store.cells` array,
      // redisplay symbols on all cells, then swap players
      if ($(event.target).html() === '') {
        store.cells[event.target.id] = store.currentTurn
        ui.displayCells()
        // use checkForWins to either alert winner or run swapTurns
        checkForWins()
      // if cell was occupied, log error and prevent play and turn swap
      } else {
        ui.showMessage('That cell is already occupied. Try again!')
      }
    // else if game is over, alert that
    } else {
      ui.showMessage('This game is over. Click the button below for a rematch.')
    }
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
  }
}

const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const checkForWins = function () {
  let winner = null
  // loop through all potential winning lines...
  winningLines.forEach((winningLine) => {
    // write each cell value from this specific winningLine to an array
    const testArray = []
    winningLine.forEach((cell) => {
      testArray.push(store.cells[cell])
    })
    // check if all values in the array are identical and NOT ''
    // if so, set winner variable to that value
    if (testArray[0] === testArray[1] && testArray[1] === testArray[2] &&
      testArray[0] !== '') {
      winner = testArray[0]
    }
  })
  // after looping, if a winner was found (value isn't null), alert win
  if (winner) {
    store.over = true
    ui.showMessage(`Player ${winner.toUpperCase()} has won the game!`)
    store[`${winner}Wins`]++
    ui.updateWins()
    // set restart game button text
    $('#restart-game').html('Demand a rematch!')
    $('#restart-game').addClass('rematch')
  // else if no winner but all cells full, alert draw
  } else if (store.cells.every(cellOccupied)) {
    store.over = true
    ui.showMessage("It's a draw! Click below to start a new game.")
    // set restart game button text
    $('#restart-game').html('Demand a rematch!')
    $('#restart-game').addClass('rematch')
  // else continue with game
  } else {
    swapTurns()
  }
}

// callback function returns true if a cell contains an x or o already
const cellOccupied = (cell) => {
  return cell === 'x' || cell === 'o'
}

module.exports = {
  addHandlers: addHandlers,
  swapTurns: swapTurns,
  playHere: playHere,
  checkForWins: checkForWins,
  cellOccupied: cellOccupied,
  winningLines: winningLines,
  restartGame: restartGame
}
