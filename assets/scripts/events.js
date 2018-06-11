'use strict'

const store = require('./store')
const ui = require('./ui')
const gameApi = require('./game-storage/game-api')

// all event handlers
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#restart-game').on('click', restartGame)
}

const restartGame = function (event) {
  // clear message display
  ui.clearMessage()
  // set game state and current turn and clear out cells array
  store.currentTurn = 'x'
  delete store.game
  onCreateGame()
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
  // else continue
  } else {
    // if the game's not already over...
    if (store.game.over === false) {
      // if cell was blank, add symbol of current player to `store.cells` array,
      // redisplay symbols on all cells, then swap players
      if ($(event.target).html() === '') {
        store.game.cells[event.target.id] = store.currentTurn
        // send new move to server (also will run displayCells and checkForWins
        onUpdateGame(event.target.id, store.currentTurn)
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
  console.log('inside checkForWins')
  let winner = null
  // loop through all potential winning lines...
  winningLines.forEach((winningLine) => {
    // write each cell value from this specific winningLine to an array
    const testArray = []
    winningLine.forEach((cell) => {
      testArray.push(store.game.cells[cell])
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
    onFinishGame()
    ui.showMessage(`Player ${winner.toUpperCase()} has won the game!`)
    store[`${winner}Wins`]++
    ui.updateWins()
    // set restart game button text
    $('#restart-game').html('Demand a rematch!')
    $('#restart-game').addClass('rematch')
  // else if no winner but all cells full, alert draw
  } else if (store.game.cells.every(cellOccupied)) {
    onFinishGame()
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

const onCreateGame = function () {
  console.log('inside onCreateGame and store.user.token is: ', store.user.token)
  gameApi.createGame()
    .then((response) => {
      console.log('succeeded at creating new game and response is: ', response)
      store.game = response.game
      console.log('CREATED NEW GAME and store.game is: ', store.game)
      ui.displayCells()
      // empty contents game cells & update win counts
      ui.updateWins()
    })
    .catch((error) => {
      console.log('failed to create new game. error is: ', error)
    })
}

const onUpdateGame = function (cellIndex, value) {
  const data = {
    'game': {
      'cell': {
        'index': cellIndex,
        'value': value
      },
      'over': store.game.over
    }
  }
  console.log('inside onUpdateGame, data about to be sent to server is: ', data)
  gameApi.updateGame(data)
    .then((response) => {
      console.log('succeeded at updating game and response is: ', response)
      store.game = response.game
      console.log('still in onUpdateGame success thingy & store.game is: ', store.game)
      ui.displayCells()
      checkForWins()
    })
    .catch((error) => {
      console.log('failed to create new game. error is: ', error)
    })
}

const onFinishGame = function () {
  const data = {
    'game': {
      'over': true
    }
  }
  console.log('inside onFinishGame, data is: ', data)
  gameApi.updateGame(data)
    .then((response) => {
      console.log('succeeded at finishing game and response is: ')
      console.log(response)
      store.game = response.game
      console.log('store.game is: ', store.game)
      ui.displayCells()
    })
    .catch((error) => {
      console.log('failed to create new game. error is: ', error)
    })
}

module.exports = {
  addHandlers: addHandlers,
  swapTurns: swapTurns,
  playHere: playHere,
  checkForWins: checkForWins,
  cellOccupied: cellOccupied,
  winningLines: winningLines,
  restartGame: restartGame,
  onCreateGame: onCreateGame,
  onUpdateGame: onUpdateGame,
  onFinishGame: onFinishGame
}
