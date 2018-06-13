'use strict'
// require dependencies
const store = require('../store')
const ui = require('../ui')
const events = require('../events')

// run on sign up error
const signUpError = function (error) {
  showAuthMessage('That email is already taken. Please pick a new one or sign in to an existing account instead.')
  clearAuthForms()
}

// run on sign in success
// (also run after successful sign-up leads to automatic sign-in, if successful)
const signInSuccess = function (response) {
  // if there was a message about needing to sign in, remove it
  ui.clearMessage()
  // store data retricved from server
  store.user = response.user
  // update display
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('.sign-out').removeClass('hidden')
  $('.change-password').removeClass('hidden')
  $('#player-x-email').html(store.user.email)
  // display success message
  showAuthMessage("Success! You're now signed in as Player X!")
  setTimeout(clearAuthMessage, 3000)
  // create a new game and pull user stats
  events.onCreateGame()
  events.onGetCompletedGames()
  // clear form fields and hide modal
  clearAuthForms()
  $('#signInModal').modal('hide')
  $('#signUpModal').modal('hide')
}

// run on sign-in error
const signInError = function (error) {
  // display error message and clear form fields
  showAuthMessage('Email or password was incorrect. Please try again or sign up for a new account instead.')
  clearAuthForms()
}

// run on successful password change (note no response expected from server)
const changePasswordSuccess = function (response) {
  // diplay success message
  showAuthMessage('Success! Your password has been changed!')
  setTimeout(clearAuthMessage, 3000)
  // clear form fields and hide modal
  clearAuthForms()
  $('#changePasswordModal').modal('hide')
}

// run password change fails
const changePasswordError = function (error) {
  // display error message and clear form fields
  showAuthMessage('Oops! Please correct your old password and try again.')
  clearAuthForms()
}

// run on successful sign-outline (note no response expected from server)
const signOutSuccess = function (response) {
  // delete game and user records from local database
  delete store.user
  delete store.game
  store.xWins = 0
  store.xDraws = 0
  store.oWins = 0
  store.oDraws = 0
  // reset game board, form fields, win/player stats, and button states
  $('.game-cell').html('')
  clearAuthForms()
  ui.updateWins()
  $('#player-x-email').html('Anonymous')
  ui.hideWinningCells()
  // change which auth options are available
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('.sign-out').addClass('hidden')
  $('.change-password').addClass('hidden')
  // show success message
  showAuthMessage("Success! You've been signed out.")
  setTimeout(clearAuthMessage, 3000)
  // ask user to sign in for next game
  setTimeout(() => {
    showAuthMessage('Please sign in so your score can be tracked!')
  }, 3001)
}

// run on sign-out error
const signOutError = function (error) {
  // show error and clear auth forms
  showAuthMessage("Something went wrong. You're still logged in. Quick, show this error message to the nearest developer: ", error)
  clearAuthForms()
}

// display a message to the user on main screen and in modal
const showAuthMessage = function (message) {
  $('.auth-alert-main').html(message).removeClass('hidden')
  $('.auth-alert-modal').html(message).removeClass('hidden')
}

// remove message currently displayed to user
const clearAuthMessage = function () {
  $('.auth-alert-main').addClass('hidden').html('')
  $('.auth-alert-modal').addClass('hidden').html('')
}

// clear values from all auth forms
const clearAuthForms = function () {
  $('input').val('')
}

module.exports = {
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError,
  showAuthMessage: showAuthMessage,
  clearAuthMessage: clearAuthMessage,
  clearAuthForms: clearAuthForms
}
