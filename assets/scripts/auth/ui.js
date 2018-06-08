'use strict'

const store = require('../store')

const signUpSuccess = function (response) {
  console.log('signUpSuccess is ', response)
}

const signUpError = function (error) {
  console.log('signUpError is', error)
}

const signInSuccess = function (response) {
  console.log('signInSucces response is ', response)
  store.user = response.user
  console.log('store.user is ', store.user)
  console.log('store.user.token is ', store.user.token)
}

const signInError = function (error) {
  console.log('signInError is', error)
}

const changePasswordSuccess = function (response) {
  // there is not supposed to be a response
  console.log('changePasswordSuccess response is ', response)
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
}

const signOutError = function (error) {
  console.log('signOutError is', error)
}

module.exports = {
  signUpSuccess: signUpSuccess,
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError
}
