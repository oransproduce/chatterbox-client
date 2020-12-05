var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/`,

  // server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(item, successCB, errorCB = null, endPoint) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server + endPoint,
      type: 'POST',
      data: JSON.stringify(item),
      contentType: 'application/json',
      success: successCB,
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        coendpointnsole.error('chatterbox: Failed to send ' + endPoint, data);
      }
    });
  },

  readAll: function(successCB, endpoint, errorCB = null) {
    $.ajax({
      url: Parse.server + endpoint,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch ' + endpoint, error);
      }
    });
  }

};