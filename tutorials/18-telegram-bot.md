# Quick-start Telegram Bot

If you've ever used an online forum, you may have seen that there are sometimes ways to post messages other than doing it straight on the forum, like posting by email.

In this tutorial we will build a public message board and instead of users posting messages directly on the site, they will send them to a Telegram bot.

The messages will simply contain the message text but we will provide further information on how to use other data, such as the usernames of users. It will be left as an exercise for the reader to expand the functionality.

![](/images/tutorials/18-telegram-bot/pic2.png)
![](/images/tutorials/18-telegram-bot/pic1.png)

## Prerequisites
You should be familiar with basic Python programming.

It would be helpful to have a familiarity with the [replit database](https://docs.repl.it/tutorials/11-using-the-replit-database) but it's not necessary.

## Generating credentials

### Registering a Bot
We need to register a bot to generate the credentials that we will use to connect to the Telegram API. Each bot requires a user account to be responsible over it. This can be done using Telegram's official management bot called "BotFather".

To do this, start by signing into your Telegram client and searching for "@botfather" in the chat-search.

Warning: We must be sure to select the verified account (the one with the checkmark beside it), otherwise we may end up talking to someone impersonating the official BotFather.

![](/images/tutorials/18-telegram-bot/pic3.png)

To activate BotFather, click on "start".

![](/images/tutorials/18-telegram-bot/pic4.png)

We can send BotFather "/newbot" to begin the bot creation workflow.

It will ask us for:

* the name of the bot which will be displayed on the top of the new bot's chat, for example, "Replit Quick-start Tutorial".

* the username, which will be used to reference the bot uniquely, for example, "@replit_tutorialbot"

Note: it is useful to have a short username to make it easier for users to type it out – especially if you plan on adding an inline mode.

![](/images/tutorials/18-telegram-bot/pic5.jpg)

Once we have answered all the questions, the BotFather will send us our authentication token that will look something like this "110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw".

Note: the whole string (the colon and both strings on either side of it) is the token.

## Make a Bot Interface

We can now begin writing the part of the program that handles requests from Telegram. Create a new repl and select Python from the language dropdown.

![](/images/tutorials/18-telegram-bot/pic6.png)

Our bot needs to interact with Telegram. We will need to access the REST API. There are many ways of doing this, but for the sake of this tutorial, we will use a convenience library that wraps around the API.
Before we can go any further, we will need to make our Token accessible for our bot later on. Create a file called ".env" containing our token. Something like this:

	TOKEN=110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw

This will ensure that our token is available as an environment variable and that it cannot be accessed by people viewing the repl publicly.

### Barebones Bot
We will start with the following in our "main.py" file:

	import os

	from telegram import Update #upm package(python-telegram-bot)
	from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext  #upm package(python-telegram-bot)


	def help_command(update: Update, context: CallbackContext) -> None:
	    htext = '''
	Welcome
	Send a message to store it.
	Send /fetch to retrieve the most recent message'''
	    update.message.reply_text(htext)


	def main():
	    updater = Updater(os.getenv("TOKEN"))
	    
	    dispatcher = updater.dispatcher
	    dispatcher.add_handler(CommandHandler("start", help_command))
	    dispatcher.add_handler(CommandHandler("help", help_command))

	    updater.start_polling()

	    updater.idle()


	if __name__ == '__main__':
	    main()

At the top, we import "os" so that we can get our token from the environment variable.

We then import classes from the telegram library.

The comments starting with "#upm" are not optional. They are used by Replit to download the correct package. It is not needed in general, but it is needed here because there are a lot of similar Telegram libraries.

The function `help_command` , is run whenever the user sends us a "/start" or "/help" command. "/start" is also automatically run when a new user joins your bot (like we did earlier with BotFather). The bot knows to use this function because we tell it later in the `main` function's body.

The `main` function initialises an updater for us using our token.

	updater = Updater(os.getenv("TOKEN"))  

The updater is the class that will continuously check Telegram for new messages for our bot.

When the updater gets a new message, it hands it over to the dispatcher. The dispatcher checks if we have an appropriate handler for the message. As mentioned above, we define ours to handle the commands /start and /help. We do that with the `add_handler` function, like this:

	dispatcher.add_handler(CommandHandler("start", help_command))

and

	dispatcher.add_handler(CommandHandler("help", help_command))

Sometimes you may want to have a different function for handling the start command from the one that handles the help command but to keep it simple, they will both use the same handler here.

We then need to actually tell the updater to start checking for new messages. We accomplish that with this line:

	updater.start_polling()

It's important to know that `start_polling` is a non-blocking function. That means that the code won't halt execution here. It will just carry on until the program terminates.

In other words, if we left this as our last line of the `main` function, the code would execute and then immediately exit because there was nothing else blocking it. So to keep our bot listening, we use the line `updater.idle()` to block the script while we are listening.


### Logging Functionality

According to the help text, there are two things the bot should do.

1. If you send a message to the bot, it should store it somehow.

2. If you send it the /fetch command, it should send you back the latest message.

To accomplish this, we will use Replit's key-value database. Start by importing the API.

	from replit import db

`db` is an object that behaves like a dictionary but persists its content between runs. It also serializes its keys as strings.

Since we want to store logged messages in a certain order, but the db object is not inherently ordered, let's create a helper function that can get the largest key (assuming we are only going to use numeric indices). Add this function before the definition of the `help_command` function:

	def latest_key():
	    ks = db.keys()
	    if len(ks):
	        return max(map(int, ks))
	    else:
	        return -1

`latest_key` gets all the keys from our db. If there are keys, convert them all to integers and return the biggest one. If there aren't any keys, return -1.

We can now create a handler that logs the user's messages to the database. Add this function after the definition of the `help_command` function:

	def log(update: Update, context: CallbackContext) -> None:
	    db[latest_key() + 1] = update.message.text

It gets the latest key from the database, increments it by one and sets a new key-pair with the message.

However, this will not be run until we register the handler, so add the following line after the other `dispatcher.add_handler(...)` lines:

	dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, log))

You may notice that `MessageHandler` is used instead of `CommandHandler`. This is a more general handler that selects messages based off of flags that you supply. In this case, it handles messages that contain text but aren't commands.

We can now log messages, but we can't see them yet. Let's add a handler that lets a user fetch the latest message. Add this function after the definition of the `log` function

	def fetch(update: Update, context: CallbackContext) -> None:
	    update.message.reply_text(db.get(latest_key(), 'No Messages yet.'))


We can register this one along with the other command handlers. Add this after the existing `dispatcher.add_handler(...)` lines:

	dispatcher.add_handler(CommandHandler("fetch", fetch))

## Make a Web UI

Now that we have a functional bot, we may want to add a web interface for it. The tool we will use is Flask. We can include the following code after our other imports and before our `latest_key` definition.

	from math import ceil
	from flask import render_template
	from flask import Flask
	app = Flask(__name__)

	@app.route('/')
	@app.route('/<int:page>')
	def home(page=None):
	    ks = sorted(map(int, db.keys()))
	    pages = ceil(len(ks) / 10)
	    if page is None: #Default to latest page
	        page = pages

	    if page < pages:
	        next_page = page + 1
	    else:
	        next_page = None
	    if page > 1:
	        prev_page = page - 1
	    else:
	        prev_page = None

	    messages = tuple(db[key] for key in ks[(page-1)*10:page*10])

	    return render_template('home.html', messages=messages, next_page=next_page, page=page, prev_page=prev_page)

This defines a small flask app. Replit takes care of our Flask import. For this tutorial, we'll only make a single page.

We tell Flask how the page should be reachable with special decorators. `@app.route('/')` says that when the user accesses at https://example.com it will serve this handler. In this case, the variable "page" will default to None.

`@app.route('/<int:page>')` says that when a user accesses something like https://example.com/4 then it will open to page 4 of the logged messages. In this case, the variable "page" will be set to 4.

This won't work yet, however, because our template `home.html` doesn't exist. Let us create that now in a folder called templates (i.e. templates/home.html)

	<!doctype html>
	<h1>Messages - Page {{ page }}</h1>
	<ul>
	 {% for msg in messages %}
	 <li>{{ msg | escape }}</li>
	 {% endfor %}
	</ul>

	{% if prev_page %}<a href='/{{ prev_page }}'>Previous Page</a>{% endif %}
	{% if prev_page and next_page %}|{% endif%}
	{% if next_page %}<a href='/{{ next_page }}'>Next Page</a>{% endif %}

This template will output a page of logged messages and links to the next or previous page at the bottom.

The template requires a variable "page" for the page number and an array of "messages" that is looped through and displayed as a list. It also takes in variables "prev_page" and "next_page" which we use to create links to the previous page and next page, if they exist respectively. These are all provided in our route function above when we run `render_template`.

How do we calculate the maximum number of pages?

	pages = ceil(len(ks) / 10)

That is to say, we divide the number of keys in our Replit database by ten and round it up. We can also use this number as our default. That way, if someone visits the plain "/" route, we will just display the latest page.

	if page is None:
	    page = pages

We know that the last messages will be the "latest" because we sorted them in ascending order in the line before.

"prev_page" and "next_page" are the current page either decremented or incremented if they are a valid page number (otherwise set to None so that the template doesn't display them).


### Pulling it all Together

If we run our program now, the flask web-app won’t work yet. Flask needs to listen for requests in a similar way to the Telegram library. We might normally end the program with `app.run()` to start the Flask server.

The problem is that this line of code would never be reached in normal circumstances because we have the line `updater.idle()` blocking our code before that. To solve this, we can replace this line with the line that starts our Flask server in the foreground. This is because the only reason we had the line was to stop the program from quitting prematurely and Flask accomplishes the same thing anyway. So let us change it to this:

	#updater.idle()
	app.run(host='0.0.0.0', port=8080)

The parameters, host and port, set to these values allow Replit to access the server and should normally display a window with our page’s content. We can now browse through messages sent to this bot by users.

## Make it your own

If you've followed along, you'll have your own version of the repl to extend. Otherwise fork [this one](https://replit.com/@JoshuaStubbs1/IncompleteCleanSpools) instead.

## Where next?

Try using the "/setcommands" command in BotFather to add a quick-menu for the commands in your bot. Usage is described [here](https://core.telegram.org/bots#6-botfather)

If we wanted access to the username of a person sending a message, we could access it in a similar way that we would access the message's text:

	username = update.message.from_user.username

You can check [the documentation](https://python-telegram-bot.readthedocs.io/en/stable/telegram.message.html#telegram.Message) for a list of aditional data made available.
