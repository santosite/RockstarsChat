  // Initialize User
if (user === undefined) {
    var user = {
      name: 'Chuck host',
      img: '/images/chuck.jpg'
    };
  }
  console.log("user: ", user)
  var socket = io();
// Initialize Elements
var messagesList = null,
    message = null,
    messageSend = null,
    backupMessages = [],
    isWriting = false,
    timeDelay = 3000,
    writingTimeout = null,
    writingMessage = null;
// Create new li to append message to the table in index
var appendMessage = function(message) {
  if (messagesList) {
    var li = document.createElement('li');
    li.className = "message-element";
    li.innerHTML = '<img src="'+message.user.img+'" class="user" data-user="'+message.user.id+'"/>'
    +'<span class="user-name">'+message.user.name+': </span>'
    +'<span class="text">'+message.text+'</span>';
    messagesList.append(li);
    $(messagesList).stop()
  }
}

// Recieve Messages
socket.on('chat-message', function(message){
  console.log('message recieved on frontend: ', message);
  appendMessage(message);
});

socket.on('start-writing', function(another_user){
  if (another_user.id === user.id) {
    writingMessage.innerText = another_user.name + " is writing...";
    writingMessage.className = "is-writing";
  }
});

socket.on('stop-writing', function(user){
  writingMessage.className = "hidden";
});

socket.on('new-connection', function(connection) {
  console.log('this is my id: ', connection.id);
  user.id = connection.id;
  if (messagesList) {
    connection.messages.forEach(function(message) {
      appendMessage(message);
    });
  } else {
    backupMessages = connection.messages;
  }
});

// Check if messge has value and send
var sendMessage = function() {
  if (message.value !== "") {
    var timestamp = new Date();
    socket.emit('chat-message', {
      user: user,
      time: +timestamp,
      text: message.value
    });
  }
  message.value = "";
}

// Load info on load
var documentReady = function(){
  messagesList = document.getElementById('message-list');
  message = document.getElementById('message');
  messageSend = document.getElementById('message-send');
  writingMessage = document.getElementById('writing-message');

  if (backupMessages.length) {
    backupMessages.forEach(function(message) {
      appendMessage(message);
    });
    backupMessages = [];
  }

  // Bind Events to Enter and Click
  if (message) {
    message.addEventListener('keyup', function(event) {
      // Send Message
      if (event.keyCode === 13) {
        sendMessage();
        socket.emit('stop-writing', user);
      } else {
        socket.emit('start-writing', user);
        if (!isWriting) {
          isWriting = true;
        } else {
          clearTimeout(writingTimeout);
        }
        writingTimeout = setTimeout(function() {
          isWriting = false;
          socket.emit('stop-writing', user);
        }, timeDelay);
      }
    });
  }

  if (messageSend) {
    messageSend.addEventListener('click', function() {
      // Send Message
      sendMessage();
    });
  }
}