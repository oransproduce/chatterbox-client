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
    for (let msg of Messages.storage) {
      MessagesView.defender(msg);
      if (msg.objectId in Messages.entries){
        continue;
      } else {
        Messages.entries[msg.objectId] = 1;
      }
      if (!msg.username || !msg.text){
        continue;
      }
      outputString += MessageView.render(msg);
    }
    let messagesNode = $(outputString);
    MessagesView.$chats.prepend(messagesNode);
    Messages.storage = [];

  },
  //For local pushing, also to server
  renderMessage: function(message) {
    MessagesView.defender(message);
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
  }
};

