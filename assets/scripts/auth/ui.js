'use strict'

const store = require('../store')

const signUpError = function (error) {
  console.log('signUpError is', error)
}

const signInSuccess = function (response) {
  console.log('signInSucces response is ', response)
  store.user = response.user
  console.log('store.user is ', store.user)
  console.log('store.user.token is ', store.user.token)
  $('#signin-form').addClass('hidden')
  $('#signup-form').addClass('hidden')
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('.change-password').removeClass('hidden')
}

const signInError = function (error) {
  console.log('signInError is', error)
}

const changePasswordSuccess = function (response) {
  // there is not supposed to be a response
  console.log('changePasswordSuccess response is ', response)
  $('#change-password-form').addClass('hidden')
}

const changePasswordError = function (error) {
  console.log('changePasswordError is', error)
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
}

const signOutError = function (error) {
  console.log('signOutError is', error)
}

const revealForm = function (event) {
  console.log('event.target in revealForm is: ', event.target)
  $(event.target).next().toggleClass('hidden')
}

// TODO:
// if no token present, options are sign in or sign up
// if token present, options are sign out or change password

module.exports = {
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError,
  revealForm: revealForm
}
