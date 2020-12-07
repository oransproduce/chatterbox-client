var App = {

  $spinner: $('.spinner img'),
  username: 'oransproduce',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);



    App.fetch(App.msgFetchCb, 'messages');

    App.fetch(
      (data) => {
        Rooms.storage = data.results;
        RoomsView.render();
      }, 'rooms');

    setInterval(App.fetch.bind(this, (data) =>{
      Rooms.storage = data.results;
      RoomsView.render();
    }, 'rooms'), 5000);

    setInterval(App.fetch.bind(this, App.msgFetchCb, 'messages'), 5000);
  },

  fetch: function(callback = ()=>{}, endpoint) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      //console.log(data);
      callback(data);
    }, endpoint);
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  msgFetchCb: function (data) {
    for (let msg of data.results) {
      if (!(msg.objectId in Messages.entries)) {
        Messages.newlyFetched.push(msg);
        Messages.entries[msg.objectId] = 1;
      }
    }
    console.log('test');
    //Messages.storage = data.results;
    // MessagesView.render(Messages.newlyFetched);
    Messages.storage = Messages.storage.concat(Messages.newlyFetched);
    Messages.newlyFetched = [];
  },
};

