'use strict'

const store = require('./store')
const ui = require('./ui')

// all event handlers
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#restart-game').on('click', restartGame)
}

const restartGame = function (event) {
  // set game over state to false
  store.over = false
  // set current player to x
  store.currentTurn = 'x'
  // clear out `store.cells` array
  store.cells = ['', '', '', '', '', '', '', '', '']
  // empty out contents of all game cells
  $('.game-cell').html('')
  // set player x active and player o inactive
  $('#player-x').addClass('active')
  $('#player-o').removeClass('active')
  // display win counts
  ui.updateWins()
  // alert new game
  ui.showMessage('New Game!')
  // set restart game button text
  $('#restart-game').html('Restart Game')
}

const playHere = function (event) {
  // clear any previous messages
  ui.clearMessage()
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
    if (testArray[0] === testArray[1] && testArray[1] === testArray[2]) {
      if (testArray[0] !== '') {
        winner = testArray[0]
      }
    }
  })
  // after looping, if a winner was found (value isn't null), alert win
  if (winner) {
    store.over = true
    ui.showMessage(`Player ${winner} has won the game!`)
    if (winner === 'x') {
      store.xWins++
    } else if (winner === 'o') {
      store.oWins++
    }
    ui.updateWins()
    // set restart game button text
    $('#restart-game').html('Demand a rematch!')
  // else if no winner but all cells full, alert draw
  } else if (store.cells.every(cellOccupied)) {
    store.over = true
    ui.showMessage("It's a draw! Click below to start a new game.")
    // set restart game button text
    $('#restart-game').html('Demand a rematch!')
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
