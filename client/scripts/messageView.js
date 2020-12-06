var MessageView = {

  render: _.template(
    "<div class='chat'>" +
      "<div class='username' id='<%= roomname %>'>" +
        "<span><%= username %></span>" +
      "</div>" +
      "<div>" +
        "<span><%= text %></span>" +
      "</div>" +
    "</div>"
  )
};

