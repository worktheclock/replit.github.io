# Building a pinboard front-end project

The goal of this project is to create a "pinboard" of images that you can collect, categorise with tags and reflect on later.

You will be able to create new cards with custom tags and then filter tags via the search bar or by clicking on a tag.

![Example of the Moodboard functionality. You can add a new card, search tags and filter by tag buttons.](/images/teamsForEducation/PinboardProject/moodboard.gif)

## Planning

Before we jump into the code, let's start by creating a wireframe to plan the layout and functionality of our project.

![Landing page displaying cards with images and tags.](/images/teamsForEducation/PinboardProject/wireframe.png)

This will be a single-page website with a header, a search bar, an `add card` button and a collection of cards.

Some initial card data is stored in a `.json` file, which will be displayed by default. Each card has a unique image URL, as well as custom, user-generated tags. The user will be able to filter the cards by searching for tags or by clicking on a tag within a card.

To add a new card, a modal will pop up that will allow the user to enter an image URL and custom tags.

![Popup modal with a form that allows a user to create new cards.](/images/teamsForEducation/PinboardProject/modal-wireframe.png)

## Creating the project on Repl.it

If you haven't already, head to the [sign up page](https://repl.it/signup) and create a Repl.it account.

Let's set up our project on Repl.it by following the below steps:

1. Create a new repl.
2. Choose repl language: "HTML, CSS, JS"
3. Give the repl a name: In our case "pinboard-project"
4. Click the "Create repl" button.

![Setting up the repl](/images/teamsForEducation/PinboardProject/repl-setup.png)

Because we chose "HTML, CSS, JS" as the repl language, Repl.it has gone ahead and created the basic files needed for a web front-end. We now have a base project with three files namely: `index.html`, `style.css` and `script.js`.

For this project, however, we need one more file that will be the home of our initial card data.

Add a new file called `pins.json` and copy the following code to it.

```json
[
  {
    "id": 1,
    "src": "https://mk0internationadm2x7.kinstacdn.com/wp-content/uploads/2018/10/ben-mullins-785443-unsplash-768x432.jpg",
    "tags": ["headphones", "smile"]
  },
  {
    "id": 2,
    "src": "https://i.pinimg.com/originals/2a/65/f3/2a65f33890ff03e08954a76d0a3d1865.jpg",
    "tags": ["headphones", "smile", "laptop"]
  },
  {
    "id": 3,
    "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfhYdIplE-UtslZHzzjdM5zJkCir1atAvgXg&usqp=CAU",
    "tags": ["laptop", "focussed"]
  },
  {
    "id": 4,
    "src": "https://miro.medium.com/max/10368/1*QDuUtggUKQxKA0pg8iCsyA.jpeg",
    "tags": ["laptop", "teamwork", "smile"]
  },
  {
    "id": 5,
    "src": "https://thegctv.com/wp-content/uploads/2018/11/BlackGirlsCode_main.jpg",
    "tags": ["laptop", "teamwork"]
  },
  {
    "id": 6,
    "src": "https://i.ytimg.com/vi/Q6NiqRqGePU/maxresdefault.jpg",
    "tags": ["laptop", "headphones", "focussed"]
  }
]

```
Above we have a basic `.json` file that houses 6 initial cards with links and tags. These are the demo cards that we use in this project to demonstrate the pin-board functionality.

## Adding the HTML skeleton

We'll start off with a basic HTML skeleton, hard-coding the elements in our wireframe, which we are going to populate with data later on in this tutorial.

Open the `index.html` file and replace the contents with the following.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
  </head>

  <body>
    <h1 class="header">My Moodboard</h1>
    <div class="searchContainer">
      <label class="searchLabel">search</label>
      <input
        class="searchInput"
      />
      <p class="searchResult"></p>
      <button class="newCardButton">Add a card</button>
    </div>
    <div class="cardContainer">
      <div class="card">
        <img/>
        <div class="tagContainer">
          <button class="tagButton">
            tagButton
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
```
Above we have our basic HTML skeleton that we will expand throughout this tutorial to get to our final product.

Click the "Run" button at the top. You should see our basic HTML form populate in the repl browser to the right, like below:

![Basic HTML skeleton without styling](/images/teamsForEducation/PinboardProject/html-skeleton.png)

## Adding styling

After writing our initial HTML, we need to start adding some styling to make it pretty and add some interactivity such as hover animations.

Copy the styling from [this CSS file](https://github.com/replit/replit.github.io/tree/master/static/tutorial-files/PinboardProject/style.css) into the file called `style.css`.

Let's link to the stylesheet in our `index.html` file by adding the following code within our `<head/>` below the `<title/>`.

```html
<link rel="stylesheet" href="style.css" />
```
While we're at it, let's add some pretty fonts. 

[Google Fonts](https://fonts.google.com/) is a great resource for typography. You can choose the fonts you like, copy the `<link>` url and paste it in the `<head/>` of your `index.html` file.

We chose the font family "Bungee Shade" for the heading and family "Montserrat" for the body text. After adding the font links to the `index.html` file our `<head/>` now looks like this.

```html
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
		<link rel="stylesheet" href="style.css" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
      href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@300&display=swap"
      rel="stylesheet"
    />
  </head>
```
In the `style.css` that you copied earlier we make use of the above mentioned fonts already. If you chose different fonts than ours you should update the `style.css` accordingly. You can do this by changing the `font-family:` to match the ones you chose, like the below example for the heading as "Bungee Shade".

```css
h1 {
  font-size: 4rem;
  text-align: center;
  font-family: "Bungee Shade", cursive;
  color: #fc47bb;
  text-shadow: 0 0 5px #fc47bb;
}
```
Click the "Run" button again to see your plain html form change into our newly styled page. Your page should now look like this:

![Page after adding the stylesheet and fonts](/images/teamsForEducation/PinboardProject/page-after-adding-css.png)

We still have a hard-coded card container with a tag button as part of our HTML skeleton. Let's fix this next. 

## Writing data to your HTML

Ideally, we'd like to dynamically populate our front end instead of needing to hard-code it into the HTML. We can do this by using the Javascript `fetch()` function to fetch the array in our `pins.json` file and populate the card containers accordingly. 

In the `index.html` file, find the current `cardContainer` element that looks like below:

```html
<div class="cardContainer">
      <div class="card">
        <img/>
        <div class="tagContainer">
          <button class="tagButton">
            tagButton
          </button>
        </div>
      </div>
    </div>
```
And replace all of it with the following:

```html
<div class="cardContainer" id="cardContainer"></div>
```

This creates an empty card container, which we will dynamically fill with card data using Javascript.

Your `index.html` should now look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
		<link rel="stylesheet" href="style.css" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
      href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@300&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    <h1 class="header">My Moodboard</h1>
    <div class="searchContainer">
      <label class="searchLabel">search</label>
      <input
        class="searchInput"
      />
      <p class="searchResult"></p>
      <button class="newCardButton">Add a card</button>
    </div>
    <div class="cardContainer" id="cardContainer"></div>
  </body>
</html>
```

Your page should now look like this:

![Current view after linking the stylesheet](/images/teamsForEducation/PinboardProject/html-styling.png)

## Using Javascript

In order to render a card with data from each object in the `pins.json` file, we'll need to add some scripting. In this project we will use [Javascript](https://www.javascript.com/). We will be adding our Javascript code to the `script.js` file but before we do that let's add a `<script/>` element to the `index.html` file.

Similar to `style.css` we need to link to our `script.js` file within the `index.html` file.

Add the following code above the the closing `<body/>` tag: 

```html
<script type="text/javascript" src="script.js"></script>
```

Now that we have linked our `script.js` file, we can start adding our Javascript code to it.

Open the `script.js` file and add the following code:

```javascript
const cardContainer = document.querySelector("cardContainer");
let cards = [];
fetch("pins.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    cards = data;
		appendData(cards);
})
.catch(function (err) {
    console.log(err);
});
```

Above we begin by selecting the `cardContainer`, which will house the cards we are about to render. Using the `fetch()` function, we set `cards = data`, where the data is received from the `pins.json` file.

Next we want to create a separate card for each card object in the `pins.json` file. We can accomplish this by adding a function with a `for` loop. `For` loops are useful when you want to run over the same code over and over, using different values. Like in our case where we want to "loop" through all the `json` objects and create a separate card for each.

Add the following function `appendData()` to the `script.js` file:

```javascript
function appendData(data) {

  //<!-- get the element that we want to transform -->

  var cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  //<!-- i represents each object within the array  -->

  for (var i = 0; i < data.length; i++) {

    //<!-- create a new div element with class="card" and append it to the cardContainer -->

    var card = document.createElement("div");
    card.className = "card";
    cardContainer.appendChild(card);

    //<!-- similarly, create an img element with a src value of data[i].src, which refers to the src object within our pins.json file -->

    var img = document.createElement("img");
    img.src = data[i].src;
    card.appendChild(img);

    //<!-- create another div element with class="tagContainer" -->

    var tagContainer = document.createElement("div");
    tagContainer.className = "tagContainer";
    card.appendChild(tagContainer);

    //<!-- to create the individual tag buttons, we will need to map over the data[i].tags object within pins.json, using the javascript function, map(). For each tag, we create a new button element with an onClick() function -->

    const tagButtons = data[i].tags.map((tag) => {
      const tagButton = document.createElement("button");
      tagButton.innerHTML = tag;
      return tagButton;
    });
    for (const tagButton of tagButtons) {
      tagButton.className = "tagButton";
      tagContainer.appendChild(tagButton);
    }
  }
}
```
Above we create an `appendData()` function, which maps over all the objects within the `pins.json` array using a `for` loop. 

Note that we can set attributes such as class names, source tags and IDs directly within this function. For example, the following code would set a class name of `class="card"` on all cards created within the for loop.

```javascript
var card = document.createElement("div");
card.className = "card";
```

## Filtering through the tags

Now that we have cards with tags, we want to be able to filter these tags into collections. We can do this by taking user input and searching our tags for a match.

Lets update our `index.html` file so that we can pass the user input to the `filterTags()` function we are going to create next.

Replace the current `searchContainer` element that looks like this:

```html
<div class="searchContainer">
  <label class="searchLabel">search</label>
  <input
    class="searchInput"
  />
  <p class="searchResult"></p>
  <button class="newCardButton">Add a card</button>
</div>
```
With the following:

```html
<div class="searchContainer">
  <label class="searchLabel">search</label>
  <input
    type="text"
    id="searchInput"
    class="searchInput"
    oninput="filterTags()"
  />
  <p id="searchResult" class="searchResult"></p>
  <button id="newCardButton" class="newCardButton">Add a card</button>
</div>
```

Add the following function `filterTags()` to your `script.js` file, below the `appendData()` function.

```javascript
function filterTags() {

  //<!-- get the value of the searchInput and display it to the user within the searchResult element  -->

  var searchTerm = document.getElementById("searchInput").value;
  document.getElementById("searchResult").innerHTML = "You searched for: " + searchTerm;

  //<!-- transform the user input as well as the tags to be lowercase to ensure that the tags match the search keys exactly -->

  const searchTermLower = searchTerm.toLowerCase();

  //<!-- filter the cards based on whether the tags include the search term results -->

  const filteredCards = cards.filter((card) => {
      return (
          card.tags.find((tag) => {
              const tagLower = tag.toLowerCase();
              return tagLower.includes(searchTermLower);
          }) !== undefined
      );
  });
  appendData(filteredCards);
}
```
Note how we can set the search term value to the user's input value in the search bar by finding `var searchTerm = document.getElementById("searchInput").value;`.

Additionally, we want to be able to filter the cards by clicking on one of the tags. 

Add the following to your `appendData()` function, below the creation of the tagButton element `const tagButton = document.createElement("button");`.
            
```javascript
tagButton.onclick = () => {
  const filteredCards = cards.filter((card) => {
    return (
      card.tags.find((tag) => {
        return tag.includes(tagButton.innerHTML);
      }) !== undefined
    );
  });
  appendData(filteredCards);
};
```
![tagButton onclick location](/images/teamsForEducation/PinboardProject/tagbutton-onclick.png)

The `onClick()` function filters the cards in the card container by checking which cards contain tags with the same innerHTML.

## Adding a modal

A modal is a variation of a popup that can display information or ask for user information, such as a sign-up form. In our case, we want to use a basic modal to get the data we need to add a new card to our collection.

Add the following modal HTML code below the `cardContainer` element in your `index.html` file.

```html
<div id="newCardModal" class="modal">
      <div class="modal-content">

      <!-- the X-button can be achieved by using the "&times;" entity -->

        <span class="close">&times;</span>
        <form>
          <label for="imgSrc">Image source</label>
          <input
            type="text"
            id="imgsrc"
            name="source"
            class="newCardInput"
            placeholder="Paste your image url here"
          />
          <label for="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            class="newCardInput"
            placeholder="Separate tags with a semicolon ( ; )"
          />
           
          <!-- we will define the functionality of saveNewCard() within our script tag -->

          <button type="button" class="submitButton" onclick="saveNewCard()">
            Submit
          </button>
        </form>
      </div>
    </div>
```
Within the modal, we use an HTML form element with a submit button. The input type specifies the type of user input we expect, which can be text, radio buttons, checkboxes, etc.

Your `index.html` file should now look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
		<link rel="stylesheet" href="style.css" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
      href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@300&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    <h1 class="header">My Moodboard</h1>
    <div class="searchContainer">
  		<label class="searchLabel">search</label>
  		<input
    		type="text"
    		id="searchInput"
    		class="searchInput"
    		oninput="filterTags()"
  		/>
  		<p id="searchResult" class="searchResult"></p>
  		<button id="newCardButton" class="newCardButton">Add a card</button>
		</div>
    <div class="cardContainer" id="cardContainer"></div>
		<div id="newCardModal" class="modal">
      <div class="modal-content">

      <!-- the X-button can be achieved by using the "&times;" entity -->

        <span class="close">&times;</span>
        <form>
          <label for="imgSrc">Image source</label>
          <input
            type="text"
            id="imgsrc"
            name="source"
            class="newCardInput"
            placeholder="Paste your image url here"
          />
          <label for="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            class="newCardInput"
            placeholder="Separate tags with a semicolon ( ; )"
          />
           
          <!-- we will define the functionality of saveNewCard() within our script file -->

          <button type="button" class="submitButton" onclick="saveNewCard()">
            Submit
          </button>
        </form>
      </div>
		</div>
		<script type="text/javascript" src="script.js"></script>
  </body>
	
</html>

```

We still need to create a button to open and close the modal. We can do this by changing the display property of the button we create. 

Add the following code to the end of your `script.js` file:

```javascript
var newCardButton = document.getElementById("newCardButton");

      var newCardModal = document.getElementById("newCardModal");
      newCardButton.onclick = function () {
        newCardModal.style.display = "block";
      };

      var closeModal = document.getElementsByClassName("close")[0];
      closeModal.onclick = function () {
        newCardModal.style.display = "none";
      };

    //<!-- this will enable the modal to close when the user clicks anywhere outside of the modal body -->

      window.onclick = function (event) {
        if (event.target == newCardModal) {
          newCardModal.style.display = "none";
        }
};
```
Above we create the button and set the display property to "block" (from a default of `display="none"`). To close the modal, we do the opposite, setting the display property back to `display="none"`.

When clicking on the `Add a card` button, the modal form should appear and you should be able to close it by clicking the X at the top right, or anywhere outside of the modal contents. 

![Styled modal containing a form and submit button](/images/teamsForEducation/PinboardProject/styled-modal.png)

## Create a new card with custom input data

Lastly, we need to use the user data that we collected from the modal inputs to create and append a new card to our collection.

Add the following code to the end of your `script.js` file.

```javascript
function saveNewCard() {
    var newImgSrc = document.getElementById("imgsrc").value;

    //<!-- To separate the tag values, we can use the Javasript split() function. -->

    var newTags = document.getElementById("tags").value.split(";");

    //<!-- Each card needs to have a unique ID, which we can create by getting the last ID in the existing array and adding one. -->

    var lastCardId = cards[cards.length - 1].id;

    //<!-- Create a newCard variable that stores the new data in the same format as in the existing pins.json format -->

    var newCard = {
        id: lastCardId + 1,
        src: newImgSrc,
        tags: newTags,
    };

    //<!-- add newCard to your existing card array -->

    cards = [...cards, newCard];
    appendData(cards);

    //<!-- set modal display to none to close the modal -->

    newCardModal.style.display = "none";
}
```
The above function will take the input from the user, correctly format it with a unique id, add it to our collection and close the modal.

## Where next?

A good place to start would be to customize this project. Feel free to play around with the fonts and styling to make it your own. 
If you followed along you'll have your own version to extend, otherwise you can fork our pinboard repl below.

<iframe height="400px" width="100%" src="https://repl.it/@ritza/inspiration-board?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Here are some customized pinboards based on this project with their own cards for your inspiration.

* [Home decor board](https://repl.it/@ritza/home-decor)
* [Recipe collection](https://repl.it/@ritza/recipe-board)
* [Travel wishlist](https://repl.it/@ritza/travel-todos)

## Shortcomings of the project
The main missing feature you'll likely notice from this project is that it doesn't *persist* cards - the moment the user refreshes the page, any added cards disappear. It's also hard to remove search terms to get back to a view where all cards can be seen.

[Part two](./PinboardProject-2) of this tutorial addresses these shortcomings.

Below are some more ideas for how you might add more features.

### Get photos using the Unsplash API

[Unsplash](https://unsplash.com/developers) has a free JSON API that gives you access to thousands of high-quality photos that can easily be integrated to your project. After creating an account, follow the README.md instructions for the [official Javascript wrapper](https://github.com/unsplash/unsplash-js) and read their [documentation](https://unsplash.com/documentation) if you get stuck. 

### Searching for multiple tags at once

You may want to search for more than one tag at a time, like searching "vegetarian" and "easy" recipes simultaneously. A hint for doing this is to split the search terms in a similar way to how we split the tags when adding them to the card.  

### Suggest tags as you type

When you have a large number of tags, you may want to suggest existing tags to the user while they are typing in the search bar, using a drop-down list. To do this, you'll need to perform a fetch query while the user types, and populate your drop-down list with the all the possible tags that contain the search phrase. 
