var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', RoomsView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    console.log('room submitted');
    //Parse.create(message);
    Rooms.storage.push($('#message').val());
    RoomsView.$select.append($('<option>', {
      value: 1,
      text: $('#message').val()
    }));

  },

  render: function() {
  },



};
