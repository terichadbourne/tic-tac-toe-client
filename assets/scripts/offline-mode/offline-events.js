// WORK IN PROGRESS
'use strict'
// require dependcies
// const ui = require('../ui')
// const events = require('../events')

// set up localStorage
const local = window.localStorage

// Syntax for accessing localStorage:
//
// write/overwrite data:
// localStorage.setItem('myCat', 'Tom')
//
// read data:
// var cat = localStorage.getItem('myCat');
//
// remove data:
// localStorage.removeItem('myCat');

// add event handlers for clicking on game board and for rematch button
const addHandlers = function () {
  $('.game-cell').on('click', playHere)
  $('#rematch-button').on('click', startNewGame)
}

// // start new game when rematch button is clicked
// const startNewGame = function (event) {
//   // clear message display
//   ui.clearMessage()
//   // set game state and current turn and clear out cells array
//   local.setItem('currentTurn', 'x')
//   local.removeItem('game')
//   // create new game on the server
//   onCreateGame()
//   // set player x active and player o inactive
//   $('#player-x').addClass('active')
//   $('#player-o').removeClass('active')
//   // hide rematch button
//   $('#rematch-button').addClass('hidden')
// }

// // steps to take when user clicks on a cell on the game board
// const playHere = function (event) {
//   // clear any previous messages
//   ui.clearMessage()
//   // if not logged in, block action, otherwsie continue
//   if (!local.user) {
//     ui.showMessage('You must log in before you can play.')
//   // else continue
//   } else {
//     // if the game's not already over...
//     if (local.game.over === false) {
//       // if cell was blank, add symbol of current player to `store.cells` array,
//       // redisplay symbols on all cells, then swap players
//       if ($(event.target).html() === '') {
//         local.game.cells[event.target.id] = local.currentTurn
//         // send new move to server (also will run displayCells and processMove
//         onUpdateGame(event.target.id, local.currentTurn)
//       // if cell was occupied, log error and prevent play and turn swap
//       } else {
//         ui.showMessage('That cell is already occupied. Try again!')
//       }
//     // else if game is over, alert that
//     } else {
//       ui.showMessage('This game is over. Click the button below for a rematch.')
//     }
//   }
// }

// swap players' turns after a successful move (called from processMove)
// const swapTurns = function () {
//   // swap value of store.currentTurn and toggle active classes
//   if (local.currentTurn === 'x') {
//     local.currentTurn = 'o'
//     $('.player').toggleClass('active')
//   } else if (local.currentTurn === 'o') {
//     local.currentTurn = 'x'
//     $('.player').toggleClass('active')
//   }
// }

// array of arrays representing each set of cell indexes that represents a
// winning line
const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// callback function returns true if a cell contains an x or o already
const cellOccupied = (cell) => {
  return cell === 'x' || cell === 'o'
}

// run when new player is logged in or new game is rquested, to create a new
// game on the server and update the UI
// const onCreateGame = function () {
//   gameApi.createGame()
//     // if request to server is successful...
//     .then((response) => {
//       // save retrieved game record to local storage
//       store.game = response.game
//       // refresh display, contents of game cells, win counts, etc.
//       ui.hideWinningCells()
//       local.winningCells = []
//       ui.displayCells()
//       ui.updateWins()
//     })
//     // if new game isn't created, log error
//     .catch((error) => {
//       ui.displayMessage("Something went wrong. We couldn't create a new game on the server. Quick, show this error message to the nearest developer: ", error)
//     })
// }

// save current game state to server and udpate display after each move
// const onUpdateGame = function (cellIndex, value) {
//
//   // send revised data to server
//   gameApi.updateGame(data)
//     // if move is successfully written to server...
//     .then((response) => {
//       // save response to local storage
//       store.game = response.game
//       // refresh display to add x or o
//       ui.displayCells()
//       // process move (check for wins, etc.)
//       processMove()
//     })
//     // if call to server fails, log the error
//     .catch((error) => {
//       ui.displayMessage("Something went wrong. We couldn't save that move to the server. Quick, show this error message to the nearest developer: ", error)
//     })
// }

// run when game is over
// const onFinishGame = function () {
//   local.setItem('game.over', 'true')
//   ui.displayCells()
//   $('#rematch-button').removeClass('hidden')
//   onGetCompletedGames()
// }

// fetch record of user's completed games and use data to update stats displayed
// const onGetCompletedGames = function () {
//   // call to server to retrieve list of completed games
//   gameApi.getCompletedGames()
//     // if successful...
//     .then((response) => {
//       // save returned data locally
//       store.games = response.games
//       // reset win and draw counts for reprocessing
//       store.xWins = 0
//       store.oWins = 0
//       store.xDraws = 0
//       store.oDraws = 0
//       // if there are any games returned, determine the winner of each and
//       // adjust counts
//       if (store.games.length > 0) {
//         store.games.forEach((game) => {
//           checkForWin(game.cells)
//         })
//       }
//       // display win and draw counts on page
//       ui.updateWins()
//     })
//     // if unsuccessful, log error to console
//     .catch((error) => {
//       ui.displayMessage("Something went wrong. We couldn't retrieve your game hisotry from the server. Quick, show this error message to the nearest developer: ", error)
//     })
// }

// process latest move made to check for a win or swap turns accordingly
// const processMove = function () {
// update winner and winningCells variables using checkForWin function,
// which returns x, o, draw, or incomplete
//   const currentGameStatus = checkForWin(local.game.cells)
//   // if game is incomplete, swap turns
//   if (currentGameStatus === 'incomplete') {
//     swapTurns()
//   } else {
//     // if a draw, alert user
//     if (currentGameStatus === 'draw') {
//       ui.showMessage("It's a draw! Click below to start a new game.")
//     // if a win, alert user and highlght winning cells
//     } else {
//       ui.showMessage(`Player ${currentGameStatus.toUpperCase()} has won the game!`)
//       ui.showWinningCells()
//     }
//     // for any completed game, update completed status on server
//     onFinishGame()
//   }
// }

// // test a single gaame to find win, draw, incomplete
// const checkForWin = function (cellsArray) {
//   // temporaty variables
//   let winner = null
//   let gameStatus = null
//   // loop through all potential winning lines...
//   winningLines.forEach((winningLine) => {
//     // write each cell value from this specific winningLine to an array
//     const testArray = []
//     winningLine.forEach((cellIndex) => {
//       testArray.push(cellsArray[cellIndex])
//     })
//     // check if all values in the array are identical and NOT ''
//     // if so, set winner variable to that value
//     if (testArray[0] === testArray[1] && testArray[1] === testArray[2] &&
//       testArray[0] !== '') {
//       winner = testArray[0]
//       store.winningCells = [winningLine[0], winningLine[1], winningLine[2]]
//     }
//   })
//   // after looping, if a winner was found (value isn't null), increase
//   // appropriate win count and update gameStatus
//   if (winner) {
//     gameStatus = winner
//     store[`${winner}Wins`]++
//   // else if no winner but all cells full, add to both draw records and updates
//   // gameStatus
//   } else if (cellsArray.every(cellOccupied)) {
//     gameStatus = 'draw'
//     store[`xDraws`]++
//     store[`oDraws`]++
//   // else if no win or draw, set gameStatus to incomplete
//   } else {
//     gameStatus = 'incomplete'
//   }
//   // return gameStatus as "x", "o", "draw", or "incomplete"
//   return gameStatus
// }

module.exports = {
  local: local,
  addHandlers: addHandlers,
  // swapTurns: swapTurns,
  // playHere: playHere,
  // processMove: processMove,
  cellOccupied: cellOccupied,
  winningLines: winningLines
  // startNewGame: startNewGame,
  // onCreateGame: onCreateGame,
  // onUpdateGame: onUpdateGame,
  // onFinishGame: onFinishGame,
  // onGetCompletedGames: onGetCompletedGames,
  // checkForWin: checkForWin
}

// ************************************
//
// CODE AS OF FUNCTIONAL MODE BEFORE CONNECTING TO API FOR AUTH OR GAME STORAGE:
//
// 'use strict'
//
// const store = require('./store')
// const ui = require('./ui')
//
// // all event handlers
// const addHandlers = function () {
//   $('.game-cell').on('click', playHere)
//   $('#restart-game').on('click', restartGame)
// }
//
// const restartGame = function (event) {
//   // clear message display
//   ui.clearMessage()
//   // set game state and current turn and clear out cells array
//   store.over = false
//   store.currentTurn = 'x'
//   store.cells = ['', '', '', '', '', '', '', '', '']
//   // empty contents game cells & update win counts
//   ui.displayCells()
//   ui.updateWins()
//   // set player x active and player o inactive
//   $('#player-x').addClass('active')
//   $('#player-o').removeClass('active')
//   // set restart game button text
//   $('#restart-game').html('Restart Game')
//   $('#restart-game').removeClass('rematch')
// }
//
// const playHere = function (event) {
//   // clear any previous messages
//   ui.clearMessage()
//   // if the game's not already over...
//   if (store.over === false) {
//     // if cell was blank, add symbol of current player to `store.cells` array,
//     // redisplay symbols on all cells, then swap players
//     if ($(event.target).html() === '') {
//       store.cells[event.target.id] = store.currentTurn
//       ui.displayCells()
//       // use checkForWins to either alert winner or run swapTurns
//       checkForWins()
//     // if cell was occupied, log error and prevent play and turn swap
//     } else {
//       ui.showMessage('That cell is already occupied. Try again!')
//     }
//   // else if game is over, alert that
//   } else {
//     ui.showMessage('This game is over. Click the button below for a rematch.')
//   }
// }
//
// const swapTurns = function () {
//   // swap value of store.currentTurn and toggle active classes
//   if (store.currentTurn === 'x') {
//     store.currentTurn = 'o'
//     $('.player').toggleClass('active')
//   } else if (store.currentTurn === 'o') {
//     store.currentTurn = 'x'
//     $('.player').toggleClass('active')
//   }
// }
//
// const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
//   [2, 5, 8], [0, 4, 8], [2, 4, 6]]
//
// const checkForWins = function () {
//   let winner = null
//   // loop through all potential winning lines...
//   winningLines.forEach((winningLine) => {
//     // write each cell value from this specific winningLine to an array
//     const testArray = []
//     winningLine.forEach((cell) => {
//       testArray.push(store.cells[cell])
//     })
//     // check if all values in the array are identical and NOT ''
//     // if so, set winner variable to that value
//     if (testArray[0] === testArray[1] && testArray[1] === testArray[2] &&
//       testArray[0] !== '') {
//       winner = testArray[0]
//     }
//   })
//   // after looping, if a winner was found (value isn't null), alert win
//   if (winner) {
//     store.over = true
//     ui.showMessage(`Player ${winner.toUpperCase()} has won the game!`)
//     store[`${winner}Wins`]++
//     ui.updateWins()
//     // set restart game button text
//     $('#restart-game').html('Demand a rematch!')
//     $('#restart-game').addClass('rematch')
//   // else if no winner but all cells full, alert draw
//   } else if (store.cells.every(cellOccupied)) {
//     store.over = true
//     ui.showMessage("It's a draw! Click below to start a new game.")
//     // set restart game button text
//     $('#restart-game').html('Demand a rematch!')
//     $('#restart-game').addClass('rematch')
//   // else continue with game
//   } else {
//     swapTurns()
//   }
// }
//
// // callback function returns true if a cell contains an x or o already
// const cellOccupied = (cell) => {
//   return cell === 'x' || cell === 'o'
// }
//
// module.exports = {
//   addHandlers: addHandlers,
//   swapTurns: swapTurns,
//   playHere: playHere,
//   checkForWins: checkForWins,
//   cellOccupied: cellOccupied,
//   winningLines: winningLines,
//   restartGame: restartGame
// }
//

// *******************
//
// STUFF THAT WAS IN STORE.JS AT THAT TIME
//
// 'use strict'
//
// const store = {
//   currentTurn: 'x',
//   cells: ['', '', '', '', '', '', '', '', ''],
//   over: false,
//   xWins: 0,
//   oWins: 0
// }
//
// module.exports = store
