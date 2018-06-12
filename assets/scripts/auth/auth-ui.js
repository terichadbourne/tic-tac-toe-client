'use strict'

const store = require('../store')
const ui = require('../ui')
const events = require('../events')

const signUpError = function (error) {
  console.log('signUpError is', error)
  showAuthMessage("That didn't work. The username is likely taken. Please try again.")
  clearAuthForms()
}

const signInSuccess = function (response) {
  console.log('signInSucces response is ', response)
  // If there was a message about needing to sign in, remove it
  ui.clearMessage()
  store.user = response.user
  console.log('in signinsuccess, store.user is ', store.user)
  console.log('in signinsuccess, store.user.token is ', store.user.token)
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('.sign-out').removeClass('hidden')
  $('.change-password').removeClass('hidden')
  $('#player-x-email').html(store.user.email)
  showAuthMessage("Success! You're now signed in as Player X!")
  setTimeout(clearAuthMessage, 3000)
  events.onCreateGame()
  events.onGetCompletedGames()
  clearAuthForms()
  $('#signInModal').modal('hide')
  $('#signUpModal').modal('hide')
}

const signInError = function (error) {
  console.log('signInError is', error)
  showAuthMessage('Either your email or password was incorrect. Please try again.')
  clearAuthForms()
}

const changePasswordSuccess = function (response) {
  // there is not supposed to be a response
  console.log('changePasswordSuccess response is ', response)
  showAuthMessage('Success! Your password has been changed!')
  setTimeout(clearAuthMessage, 3000)
  clearAuthForms()
  $('#changePasswordModal').modal('hide')
}

const changePasswordError = function (error) {
  console.log('changePasswordError is', error)
  showAuthMessage('Oops! Please correct your old password and try again.')
  clearAuthForms()
}

const signOutSuccess = function (response) {
  // no response
  console.log('store.user.token is ', store.user.token)
  // delete game and user records from database
  delete store.user
  delete store.game
  store.xWins = 0
  store.xDraws = 0
  store.oWins = 0
  store.oDraws = 0
  // clear cell contents
  $('.game-cell').html('')
  console.log('You were successfully signed out')
  console.log('store.user after deleting it: ', store.user)
  clearAuthForms()
  ui.updateWins()
  ui.hideWinningCells()
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('.sign-out').addClass('hidden')
  $('.change-password').addClass('hidden')
  $('#player-x-email').html('Anonymous')
  showAuthMessage("Success! You've been signed out.")
  setTimeout(clearAuthMessage, 3000)
  setTimeout(() => {
    showAuthMessage('Please sign in so your score can be tracked!')
  }, 3001)
}

const signOutError = function (error) {
  console.log('signOutError is', error)
  clearAuthForms()
}

// displays a message to the user
const showAuthMessage = function (message) {
  $('.auth-alert-main').html(message).removeClass('hidden')
  $('.auth-alert-modal').html(message).removeClass('hidden')
}

// removes message currently displayed to user
const clearAuthMessage = function () {
  $('.auth-alert-main').addClass('hidden').html('')
  $('.auth-alert-modal').addClass('hidden').html('')
}

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
