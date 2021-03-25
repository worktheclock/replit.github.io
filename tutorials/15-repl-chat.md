# Building a Repl.it to Repl.it chat app using Node.js

In this tutorial, we'll make a chat app with a difference. Instead of the usual web client to server chat architecture, we'll have a chat app directly running from the repl.it console window.

We'll use Socket.io to implement websockets in our app. We'll also use the fact that the [Socket.io-client code can be run in Node.js](https://socket.io/docs/v3/client-installation/index.html), not only in a browser!

![Example of the chat app functionality](/images/tutorials/15-replit-chat/friends_chat.gif)

## Overview and requirements

We'll use the [Repl.it](https://repl.it) Web IDE for developing and running our chat app. There will be 1 Repl.it project that runs the chat server, and as many client Repl.it projects you want to chat between. 

These are the main tasks we need to complete:
- Create the chat server using [express](http://expressjs.com) and [socket.io](https://socket.io)
- Create a chat client using [socket.io-client](https://socket.io/docs/v3/client-installation/index.html)
- Using the [readline module](https://nodejs.org/api/readline.html) in Node.js to create the user interface to chat from in the Repl.it console window. 

## Create a chat server

Head over to [repl.it](https://repl.it) and create a new Repl. Choose **Node.js** as your language. Now, give this Repl a name, like "repl-chat-server"

![create new server repl.it instance](/images/tutorials/15-replit-chat/new-server-project.png)


### Add a web framework

We need to start with a web framework that will be able to route incoming request from chat clients. We'll use [express](http://expressjs.com), a popular Node.js web framework for this. In the default `index.js` file, add a reference to expressjs, and create a new express app: 

```javascript
const express = require('express');
const app = express();
```

One of the handy things about [repl.it](https://repl.it) is that you don't need to manually install packages. It will automatically install them, just by referencing them in your code as we've done for express. 

### Add a web server

Now that we have a web framework to route our requests, we need to create a web server to listen for requests and handle the HTTP protocol. We will use the built in [node HTTP module](https://nodejs.org/api/http.html) for this. 

Add a reference to HTTP, and create a new server with the express framework we created above: 

```javascript
const http = require('http'); 
const server = http.Server(app);
```


### Extend the server with Socket.io
To make the chat responsive in realtime, we are going to extend our web server with web sockets. Web sockets are used to create a long-lived connection between clients and servers. This means we don't have the overhead of creating a new connection to the server each time we want to send and receive messages. Talk about efficient!

Add the following code to extend your server to support websockets:

```javascript
const sockets = require('socket.io');
io = sockets(server);
```

### Listen for new connections and messages

Now that we've got all our infrastructure, we can setup how we want to handle new connections and messages. Socket.io has many [events](https://socket.io/docs/v3/emitting-events/) that we can create and listen for - we'll be using the new `connection` event and a custom `message` event. Add the following code to handle new connection events, and handle incoming messages from clients:

```javascript
io.on('connection', function (connection) {
	connection.on('message', function(data) {
    	console.log('new message: ' + data); 
		io.emit("broadcast", data);
	});
});
```
What this code does is handle a new connection event on **line 1**. It grabs this connection, and waits for a new message to be sent by the client on **line 2**.

Once it has a new message, it writes it to the local server console on **line 3**. This is just really for our own debugging and interest. In a production application, perhaps it would save the message logs for later browsing. 

**line 4** is where we send out, or _emit_, the incoming message to all connected clients, so they can see the message. 

### Startup the server and test run

The final part of our chat server is to start it up to listen for connections. Add this code to start the server:

```javascript
server.listen(3000, function() {
  console.log('listening on port 3000');
});
```

Now you can click the big **Run >** button at the top of the repl to test the server. You should see it installing packages, and output the connection, and finally write _listening on port 3000_

![Running the chat server](/images/tutorials/15-replit-chat/server_run.png)

### Complete server code

Ok, the server code is done. Your completed code should look like this: 

```javascript
const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const sockets = require('socket.io');
io = sockets(server);


io.on('connection', function (connection) {
	connection.on('message', function(data) {
        console.log('new message: ' + data); 
		io.emit("broadcast", data);
	});
});


server.listen(3000, function() {
  console.log('listening on 3000');
});
```

## Building the chat client

Once again, head over to [repl.it](https://repl.it) and create a new Repl. Choose **Node.js** as your language. Now, give this Repl a name, like "repl-chat-client"

![create new client repl.it instance](/images/tutorials/15-replit-chat/new-client-project.png)


### Add the socket client and readline modules

Add the [socket.io-client](https://socket.io/docs/v3/client-installation/index.html) and [readline module](https://nodejs.org/api/readline.html) to the **index.js** file. 

```javascript
const io = require('socket.io-client');
const readline = require('readline');
```

### Create a new connection to the chat server

Add a connection to your chat server repl by adding the line: 

```javascript
var socket = io("https://repl-chat-server.<your username>.repl.co");
```
Replace the `<your username>` in the line above with your actual username on repl.it

### Setup a console interface

Because we are creating this chat app purely in the repl console, we need to be able to read and write messages from the console. To help us do this, we'll use the [readline module](https://nodejs.org/api/readline.html). Create the interface by adding this code: 

```javascript
const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```
The line `input: process.stdin` means that we will be getting user input from the Standard Input, which commonly means the console. Likewise, `output: process.stdout` means we will output messages to the Standard Output, i.e. the console. 

### User and message variables

To remember the user's chat handle (username) and the message they want to send, we'll setup 2 variables. Add this to your code: 

```javascript
var chat_handle = "";
var message_to_send = "";
```

### Handle socket events

There are 2 main events we are interested in: 
1. When we successfully connect to the chat server, and; 
2. When the server broadcasts messages to us. 

Add this code to connect to these events: 

```javascript
socket.on('connect', function(){
	get_chat_handle(); 
	socket.on('broadcast', display_message);
}); 
```

You'll notice this code calls 2 methods: `get_chat_handle` and `display_message`. We'll define these next: 

### Getting the user chat handle

Once we're successfully connected to the server, we'll want to introduce the user. Add this function to your code: 

```javascript
// Gets the user's name, so we can introduce and prepend each message with their name
function get_chat_handle(){
	chat_interface.question(`Hello! What's your chat handle? `, function(answer){
		chat_handle = answer;
		socket.emit("message", chat_handle + ' has entered the chat');
		chat();
	});
}
```

You'll notice this uses the interface we setup earlier to ask a question to the user: _"What's your chat handle?"_. When we get the answer, we store it in the variable `chat_handle` that we added earlier. We then send this to the server using `socket.emit("message")`. The server will get the message, and then broadcast it out to all the other chat clients. 

Finally, we call another function, `chat()`, which we will setup next. 


### Waiting and sending user messages

Now we'll implement the `chat()` function, which waits for a user's message and sends it to the server. Add this function to your code: 

```javascript
// Waits for a new message to send
function chat(){
	chat_interface.question(chat_handle + ": ", function(message){
		message_to_send = chat_handle + ': ' + message;
		socket.emit("message", message_to_send );
		chat();
	});
}
```

This code adds a prompt with the user's `chat_handle` to the console, and waits for them to enter a message, through the `chat_interface.question` method. When they enter a message, we prepend it with the user's chat handle and save it to the variable `message_to_send` that we added earlier. Then we send this combined user chat handle and message to the server using `socket.emit`. Finally we call our chat function again, to setup a prompt and wait for the next message.


### Showing messages from other users

Our last function writes out messages that we receive from the server. We get these messages in code we added earlier that looked like this : `socket.on('broadcast', display_message);`

That code listened for any broadcast message, and then called the function `display_message`. We'll implement this function now. 

Add the `display_message` function to your code: 

```javascript
// Handles an incoming message, and checks to see that it is not the one we sent. 
// Shows it on the console if it is from another user. 
function display_message(message){
    if(message_to_send != message){
        console.log("\n" + message);
        chat();
    }
}
```

As noted in the comment above the function declaration, this function first compares the incoming message to the last message the user sent, stored in the `message_to_send` variable. If the incoming message matches, the function ignores it and doesn't write it out. It would just look weird if a user send a message, and then had it send right back to them!

If it doesn't match (i.e it is a message from another user), then we write it to the console, with a newline `\n` preceding it. Then we wait for our user to send a reply by calling our `chat()` function again. 

### Complete client code 

Ok, we are done with the chat client code. The completed code should look like this: 

```javascript
const io = require('socket.io-client');
const readline = require('readline');

var socket = io("https://repl-chat-server.<your username>.repl.co");

const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var chat_handle = "";
var message_to_send = "";


socket.on('connect', function(){
    get_chat_handle(); 
	socket.on('broadcast', display_message);
}); 

// Gets the user's name, so we can introduce and append each message with their name
function get_chat_handle(){
	chat_interface.question(`Hello! What's your chat handle? `, function(answer){
        chat_handle = answer;
        socket.emit("message", chat_handle + ' has entered the chat');
        chat();
	});
}

// Waits for a new message to send
function chat(){
	chat_interface.question(chat_handle + ": ", function(message){
        message_to_send = chat_handle + ': ' + message;
		socket.emit("message", message_to_send );
		chat();
	});
}

// Handles an incoming message, and checks to see that it is not the one we sent. 
// Shows it on the console if it is from another user. 
function display_message(message){
    if(message_to_send != message){
        console.log("\n" + message);
        chat();
    }
}

```
Remember to replace the `<your username>` in the socket connection with your actual username on repl.it!

### Running the client app

Now you can click the big **Run >** button at the top of the chat client repl to test the client app. You should see it installing packages, and output the connection, and finally ask _Hello! What's your chat handle?_

This assumes you are still running the chat server we created earlier on. 

If you type in a message to your client, you should see it logged on the server. The image below shows the repl console of the client on the left, and the repl console of the server on the right. 

![testing client and server together, showing output](/images/tutorials/15-replit-chat/client_server_run.gif)


## Chatting with a friend 

Now that we've built a server and a client, we can chat with a buddy. Get a friend to copy the client code and run it in their own [repl.it](https://repl.it) instance so that they can chat with you, or share a link with them to your chat client repl!

Run the chat server app. Then run your client app, and your friend's client app. 

You should see the client apps prompt for your usernames. And after you send them, they will be shown on both clients, and in the server logs. Now you can message each other from the repl console! Once you're comfortable it works with a friend, you can invite others to join you as well.


## Make it your own

If you followed along, you'll already have your own version of the chat server and chat client repl to extend. If not, start from ours. Fork the chat server or chat client from the repls embed below.


### Chat server

<iframe height="400px" width="100%" src="https://replit.com/@ritza/repl-chat-server?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


### Chat client

<iframe height="400px" width="100%" src="https://replit.com/@ritza/repl-chat-client?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


![Example chat with a friend](/images/tutorials/15-replit-chat/friends_chat.gif)


## Things to try next

You can try some interesting things to spice up your chat app. 
* Try using different colors on the message outputs - one for the user, and another for their chat friends. There are many modules available for this, one of them being [colors](https://www.npmjs.com/package/colors)
* Try logging the server messages to the [repl.it database](https://docs.repl.it/misc/database), so that you can restore previous chats. 




