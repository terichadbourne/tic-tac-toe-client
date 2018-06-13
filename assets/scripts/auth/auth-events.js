'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const authApi = require('./auth-api')
const authUi = require('./auth-ui')

// event handlers for...
const addHandlers = function () {
  // auth-related buttons
  $('#signup-form').on('submit', onSignUp)
  $('#signin-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('.sign-out').on('click', onSignOut)
  // clicking out of a modal
  $('button[data-dismiss]').on('click', authUi.clearAuthForms)
}

// SIGN UP expected responses:
// * successful: JSON as follows...
// {
//   "user": {
//     "id": 1,
//     "email": "an@example.email"
//   }
// }
// * unsuccessful, HTTP Status of 400 Bad Request (empty body)

const onSignUp = function (event) {
  event.preventDefault()
  console.log('event.target of sign-up: ', event.target)
  const data = getFormFields(event.target)
  console.log('data in onSignUp is: ', data)
  authApi.signUp(data)
    // if signup is successful, immediately run signIn using same credentials
    .then(() => { return authApi.signIn(data) })
    // use the signInSuccess function if that works
    .then(authUi.signInSuccess)
    // if signup was not successful, use signUpError
    .catch(authUi.signUpError)
}

// SIGN IN expected responses:
// * successful: JSON as follows...
// {
//   "user": {
//     "id": 1,
//     "email": "an@example.email",
//     "token": "an example authentication token"
//   }
// }
// * unsuccessful: HTTP Status of 401 Unauthorized (empty body)

const onSignIn = function (event) {
  event.preventDefault()
  console.log('clicked on sign-in button')
  console.log('event.target of sign-in: ', event.target)
  const data = getFormFields(event.target)
  console.log('data in onSignIn is: ', data)
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInError)
}

// CHANGE PASSWORD expected responses:
// * successful: HTTP status of 204 No Content (no body)
// * unsuccessful: HTTP status of 400 Bad Request (no body)

const onChangePassword = function (event) {
  event.preventDefault()
  console.log('clicked on change password button')
  console.log('event.target of change password: ', event.target)
  const data = getFormFields(event.target)
  console.log('data in onChangePassword is: ', data)
  authApi.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordError)
}

// SIGN OUT expected responses:
// * successful: HTTP status of 204 No Content (no body)
// * unsuccessful: HTTP status of 401 Unauthorized (no body)

const onSignOut = function (event) {
  event.preventDefault()
  console.log('clicked on sign-out button')
  console.log('event.target of sign-out: ', event.target)
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutError)
}

module.exports = {
  addHandlers: addHandlers,
  onSignIn: onSignIn,
  onSignUp: onSignUp,
  onChangePassword: onChangePassword,
  onSignOut: onSignOut
}
