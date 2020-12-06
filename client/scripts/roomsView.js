var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', RoomsView.handleSubmit);
    $('#rooms select').change(RoomsView.selectChanged);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    console.log('room submitted');
    //Parse.create(message);
    Rooms.storage.push($('#message').val());


    var roomObj = {
      roomname: $('#message').val()
    };

    Parse.create(roomObj, (data) => {
      roomObj = _.extend(roomObj, data);
      RoomsView.renderRoom(roomObj);
      //console.log(data);
    }, null, 'rooms');

  },

  selectChanged: function() {
    let roomName = $('#rooms select :selected').text();
    MessagesView.filterByRoom(roomName);

  },

  render: function() {

    for (let room of Rooms.storage){
      MessagesView.defender(room);
      if (room.objectId in Rooms.entries){
        continue;
      } else {
        Rooms.entries[room.objectId] = 1;
        let node = $('<option>', {
          value: 1,
          text: room.roomname
        });
        RoomsView.$select.append(node);
      }
    }
  },

  renderRoom: function(room){
    MessagesView.defender(room);
    Rooms.entries[room.objectId] = 1;
    RoomsView.$select.append($('<option>', {
      value: 1,
      text: room.roomname
    }));
  }

};
