'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const authApi = require('./api')
const authUi = require('./ui')

const addHandlers = function () {
  $('#signup-form').on('submit', onSignUp)
  $('#signin-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out-button').on('click', onSignOut)
}

const onSignUp = function (event) {
  event.preventDefault()
  console.log('clicked on signup button')
  console.log('event.target of sign-up: ', event.target)
}
// SIGN UP
//
// expected responses:
//
// successful: JSON as follows...
//
// {
//   "user": {
//     "id": 1,
//     "email": "an@example.email"
//   }
// }
//
// unsuccessful, HTTP Status of 400 Bad Request (empty body)

const onSignIn = function (event) {
  event.preventDefault()
  console.log('clicked on sign-in button')
  console.log('event.target of sign-in: ', event.target)
}
// SIGN IN
//
// expected responses:
//
// successful: JSON as follows...
//
// {
//   "user": {
//     "id": 1,
//     "email": "an@example.email",
//     "token": "an example authentication token"
//   }
// }
//
// unsuccessful: HTTP Status of 401 Unauthorized (empty body)

const onSignOut = function (event) {
  event.preventDefault()
  console.log('clicked on sign-out button')
  console.log('event.target of sign-out: ', event.target)
}

// SIGN OUT
//
// expected responses:
//
// successful: HTTP status of 204 No Content (no body)
//
// unsuccessful: HTTP status of 401 Unauthorized (no body)

const onChangePassword = function (event) {
  event.preventDefault()
  console.log('clicked on change password button')
  console.log('event.target of change password: ', event.target)
}
// CHANGE PASSWORD
//
// expected responses:
//
// successful: HTTP status of 204 No Content (no body)
//
// unsuccessful: HTTP status of 400 Bad Request (no body)

module.exports = {
  addHandlers: addHandlers,
  onSignIn: onSignIn,
  onSignUp: onSignUp,
  onChangePassword: onChangePassword,
  onSignOut: onSignOut

}
