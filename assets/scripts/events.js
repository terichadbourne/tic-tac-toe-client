'use strict'

const store = require('./store')
const ui = require('./ui')
const gameApi = require('./game-storage/game-api')

// all event handlers
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#rematch-button').on('click', startNewGame)
}

const startNewGame = function (event) {
  // clear message display
  ui.clearMessage()
  // set game state and current turn and clear out cells array
  store.currentTurn = 'x'
  delete store.game
  onCreateGame()
  // set player x active and player o inactive
  $('#player-x').addClass('active')
  $('#player-o').removeClass('active')
  // hide rematch button
  $('#rematch-button').addClass('hidden')
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
    // hide rematch button
    $('#rematch-button').removeClass('hidden')
  // else if no winner but all cells full, alert draw
  } else if (store.game.cells.every(cellOccupied)) {
    onFinishGame()
    ui.showMessage("It's a draw! Click below to start a new game.")
    // show rematch button
    $('#rematch-button').removeClass('hidden')
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

const onGetCompletedGames = function () {
  gameApi.getCompletedGames()
    .then((response) => {
      console.log('success retrieving completed games. response was: ', response)
      store.games = response.games
      console.log('saved completed games as store.games like this: ', store.games)
      console.log('store.games.length: ', store.games.length)
      console.log('store.games[0].cells: ', store.games[0].cells)
      store.xWins = 0
      store.oWins = 0
      store.xDraws = 0
      store.oDraws = 0
      store.games.forEach((game) => {
        updateWinRecord(game.cells)
      })
      ui.updateWins()
    })
    .catch((error) => {
      console.log('error retrieving games was: ', error)
    })
}

// test a single gaame to find win, draw, incomplete
const updateWinRecord = function (cellsArray) {
  // console.log('inside updateWinRecord')
  // console.log('typeof cellsArray inside updateWinRecord: ', typeof cellsArray)
  // console.log('now testing this cellsArray: ', cellsArray)
  // console.log('cellsArray[1]: ', cellsArray[1])
  // notation breaks the code
  let winner = null
  let gameStatus = null
  // loop through all potential winning lines...
  winningLines.forEach((winningLine) => {
    // write each cell value from this specific winningLine to an array
    const testArray = []
    winningLine.forEach((cellIndex) => {
      testArray.push(cellsArray[cellIndex])
    })
    console.log('testArray this time through winningLines.forEach is: ', testArray)
    // check if all values in the array are identical and NOT ''
    // if so, set winner variable to that value
    if (testArray[0] === testArray[1] && testArray[1] === testArray[2] &&
      testArray[0] !== '') {
      // console.log('found a winner while looping through this winningLine: ', winningLine)
      winner = testArray[0]
      // console.log('winner as found in winningLines.forEach is: ', winner)
    }
  })
  // after looping, if a winner was found (value isn't null), alert win
  if (winner) {
    gameStatus = winner
    console.log('found winner: ', winner)
    store[`${winner}Wins`]++
    console.log('store.xWins: ', store.xWins)
    console.log('store.oWins: ', store.oWins)
  // else if no winner but all cells full, add to both draw records
  // we know the board is full because the game was marked over w/o a win
  } else if (cellsArray.every(cellOccupied)) {
    gameStatus = 'draw'
    store[`xDraws`]++
    store[`oDraws`]++
    console.log('store.xDraws: ', store.xDraws)
    console.log('store.oDraws: ', store.oDraws)
  } else {
    gameStatus = 'incomplete'
  }
  console.log('game.status in updateWinRecord: ', gameStatus)
  return gameStatus
}

module.exports = {
  addHandlers: addHandlers,
  swapTurns: swapTurns,
  playHere: playHere,
  checkForWins: checkForWins,
  cellOccupied: cellOccupied,
  winningLines: winningLines,
  startNewGame: startNewGame,
  onCreateGame: onCreateGame,
  onUpdateGame: onUpdateGame,
  onFinishGame: onFinishGame,
  onGetCompletedGames: onGetCompletedGames,
  updateWinRecord: updateWinRecord
}
