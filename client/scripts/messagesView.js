var MessagesView = {

  $chats: $('#chats'),
  currentRoom: 'lobby',
  initialize: function() {

    MessagesView.render(Messages.storage);

    setInterval(() => {
      MessagesView.render(Messages.storage);
    }, 5000);

  },

  render: function(arr) {
    MessagesView.$chats.children().remove();
    let outputString = '';
    console.log(MessagesView.$chats.children().length);
    for (let msg of arr) {
      MessagesView.defender(msg);
      // if (msg.objectId in Messages.entries){
      //   continue;
      // } else {
      //   Messages.entries[msg.objectId] = 1;
      // }
      if (!msg.username || !msg.text || !msg.roomname){
        continue;
      }
      if (MessagesView.currentRoom !== 'lobby' && msg.roomname !== MessagesView.currentRoom){
        continue;
      }
      outputString += MessageView.render(msg);
    }
    let messagesNode = $(outputString);
    MessagesView.$chats.prepend(messagesNode);
    console.log(MessagesView.$chats.children().length);
    console.log("Messages storage length" + Messages.storage.length);
    // Messages.storage = Messages.storage.concat(Messages.newlyFetched);
    // Messages.newlyFetched = [];

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
};


