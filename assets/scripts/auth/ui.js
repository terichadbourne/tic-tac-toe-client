'use strict'

const store = require('../store')
const ui = require('../ui')

const signUpError = function (error) {
  console.log('signUpError is', error)
  showAuthMessage("That didn't work. The username is likely taken. Please try again.")
}

const signInSuccess = function (response) {
  console.log('signInSucces response is ', response)
  // If there was a message about needing to sign in, remove it
  ui.clearMessage()
  store.user = response.user
  console.log('store.user is ', store.user)
  console.log('store.user.token is ', store.user.token)
  $('#signin-form').addClass('hidden')
  $('#signup-form').addClass('hidden')
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('.change-password').removeClass('hidden')
  $('#player-x-email').html(store.user.email)
  showAuthMessage("Success! You're now signed in as Player X!")
  setTimeout(clearAuthMessage, 3000)
}

const signInError = function (error) {
  console.log('signInError is', error)
  showAuthMessage('Either your email or password was incorrect. Please try again.')
}

const changePasswordSuccess = function (response) {
  // there is not supposed to be a response
  console.log('changePasswordSuccess response is ', response)
  $('#change-password-form').addClass('hidden')
  showAuthMessage('Success! Your password has been changed!')
  setTimeout(clearAuthMessage, 3000)
}

const changePasswordError = function (error) {
  console.log('changePasswordError is', error)
  showAuthMessage('Oops! Please correct your old password and try again.')
}

const signOutSuccess = function (response) {
  // no response
  console.log('store.user.token is ', store.user.token)
  delete store.user
  console.log('You were successfully signed out')
  console.log('store.user after deleting it: ', store.user)
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('#sign-out').addClass('hidden')
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
}

const revealForm = function (event) {
  console.log('event.target in revealForm is: ', event.target)
  console.log('$(event.target).parent() is: ', $(event.target).parent())
  $(event.target).next().toggleClass('hidden')
  // if sign up or sign in was clicked, make sure the opposite form is hidden as
  // this one is revealed
  if ($(event.target).hasClass('sign-in')) {
    $($('#signup-form').addClass('hidden'))
  } else if ($(event.target).hasClass('sign-up')) {
    $($('#signin-form').addClass('hidden'))
  }
}

// displays a message to the user
const showAuthMessage = function (message) {
  $('.auth-alert').html(message).removeClass('hidden')
}

// removes message currently displayed to user
const clearAuthMessage = function () {
  $('.auth-alert').addClass('hidden').html('')
}

module.exports = {
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError,
  revealForm: revealForm,
  showAuthMessage: showAuthMessage,
  clearAuthMessage: clearAuthMessage
}
