var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    var message = {
      username: App.username,
      text: $('#message').val(),
      roomname: $('#rooms select :selected').text()

    };
    //console.log("message", message);

    Parse.create(message, (data) => {
      message = _.extend(message, data);
      if (!(message.objectId in Messages.entries)) {
        Messages.storage.push(message);
      }
      MessagesView.renderMessage(message);
    }, null, 'messages');

  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};