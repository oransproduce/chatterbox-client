var MessagesView = {

  $chats: $('#chats'),
  // previousIndex = 0;
  initialize: function() {


  },

  render: function() {
    // MessageView.render(msg object) => string => jquery node(string)

    // create totalString
    let outputString = '';
    for (let msg of Messages.storage) {
      outputString += MessageView.render(msg);
    }
    let messagesNode = $(outputString);
    MessagesView.$chats.append(messagesNode);
    Messages.storage = [];

  },

  renderMessage: function(message) {
    let node = $(MessageView.render(message));
    MessagesView.$chats.append(node);
    Messages.storage = [];
  }
};


