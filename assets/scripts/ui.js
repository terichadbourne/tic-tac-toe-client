'use strict'

// displays a message to the user
const showMessage = function (message) {
  $('#message').html(message)
}

// removes message currently displayed to user
const clearMessage = function () {
  $('#message').html('')
}

module.exports = {
  showMessage: showMessage,
  clearMessage: clearMessage
}
