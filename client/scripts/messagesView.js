var MessagesView = {

  $chats: $('#chats'),
  // previousIndex = 0;
  initialize: function() {


  },

  //fetches data from the server
  render: function() {
    // MessageView.render(msg object) => string => jquery node(string)

    // create totalString
    let outputString = '';
    // console.log("dictionary", Messages.entries);
    // newArray of Just fetched messages;
    for (let msg of Messages.newlyFetched) {
      MessagesView.defender(msg);
      if (msg.objectId in Messages.entries){
        continue;
      } else {
        Messages.entries[msg.objectId] = 1;
      }
      if (!msg.username || !msg.text || !msg.roomname){
        continue;
      }
      outputString += MessageView.render(msg);
    }
    let messagesNode = $(outputString);
    MessagesView.$chats.prepend(messagesNode);
    Messages.storage = Messages.storage.concat(Messages.newlyFetched);
    Messages.newlyFetched = [];

  },
  //For local pushing, also to server
  renderMessage: function(message) {
    MessagesView.defender(message);
    Messages.entries[message.objectId] = 1;
    let node = $(MessageView.render(message));
    MessagesView.$chats.prepend(node);
    Messages.storage = [];
  },

  defender: function(message) {
    let replaceWith = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    for (let prop in message) {
      if (message[prop]) {
        message[prop] = message[prop].replace(/[&<>]/g, function(tag) {
          return replaceWith[tag] || tag;
        });
      }

    }
  },

  filterByRoom: function(roomName) {
    // remove everything from current $chats node
    // rerender, from Messages.storage, which should be every message that has been sent, this time filtering by roomname;
    MessagesView.$chats.children().remove();
    // first loop over storage, create new array that is filtered by roomname;
    let filtered = Messages.storage.filter((msg) => {
      return msg.roomname === roomName;
    });
    console.log("filtered", filtered);

    //our current render function, loops over Messages.newlyFetched, if we abstract out the newlyFetched pass in an array to render
  }
};

// let $node = MessagesView.$chats.children().first();

