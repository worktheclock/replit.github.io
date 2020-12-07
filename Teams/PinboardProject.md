# Introduction

## What we're going to build

The goal of this project is to create a "pinboard" of images that you can collect, categorise with tags and reflect on later.

You will be able to create new cards with custom tags and then filter tags via the search bar or by clicking on a tag.

![Example of the Moodboard functionality. You can add a new card, search tags and filter by tag buttons.](/images/teamsForEducation/PinboardProject/moodboard.gif)

Before we jump into the code, let's start by creating a wireframe to plan the layout and functionality of our project.

![Landing page displaying cards with images and tags.](/images/teamsForEducation/PinboardProject/wireframe.png)

This will be a single-page website with a header, a search bar, an `add card` button and a collection of cards.

Some initial card data is stored in a `.json` file, which will be displayed by default. Each card has a unique image URL, as well as custom, user-generated tags. The user will be able to filter the cards by searching for tags or by clicking on a tag within a card.

To add a new card, a modal will pop up that will allow the user to enter an image URL and custom tags.

![Popup modal with a form that allows a user to create new cards.](/images/teamsForEducation/PinboardProject/modal-wireframe.png)

## The HTML skeleton

We'll start off with a basic HTML skeleton, hard-coding the elements in our wireframe, which we are going to populate with data later on in this tutorial.

```
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

It should look something like this:

![Basic HTML skeleton without styling](/images/teamsForEducation/PinboardProject/html-skeleton.png)

## Adding styling

After writing our initial HTML, we need to start adding some styling to make it pretty and add some interactivity such as hover animations.

Copy the styling from [this CSS file](https://github.com/ritza-co/simple-pinterest/blob/main/style.css) into a new file called `style.css` in the same directory.

Remember to link your stylesheet within the <head/> of your `index.html` file:

`<link rel="stylesheet" href="style.css" />`

[Google Fonts](https://fonts.google.com/) is a great resource for typography. We are using the font family Bungee Shade for the heading and family Montserrat for the body text.
To use Google Fonts, select the font you'd like to use, copy the link and paste it below your stylesheet within the <head/>. Now you'll be able to use it within your CSS. 

## Writing data to your HTML

Ideally, we'd like to dynamically populate our front end instead of needing to hard-code it into the HTML. We can do this by using the Javascript `fetch()` function to fetch the array in our `pins.json` file. To do this, we'll need to modify our HTML skeleton.

Most important to note for now is that we are replacing *this* version of the cardContainer element:

```
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

We'll replace it with an empty div with an ID, `id = "cardContainer"`, like this:

`<div class="cardContainer" id="cardContainer"></div>`

This creates an empty card container, which we will dynamically fill with card data using Javascript.

Your HTML should now look like this. Don't forget to link your stylesheet and your fonts. 

```
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>My Moodboard</title>
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
  </body>
</html>
```

Your page should now look something like this:

![Current view after linking the stylesheet](/images/teamsForEducation/PinboardProject/html-styling.png)

## Using Javascript

In order to render a card with data from each object in the `pins.json` file, we need to add a `<script/>` element to the bottom of the HTML, just above the closing `<body/>` tag.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>

  <!-- Your HTML here -->

    <script>
    </script>

  </body>
</html>
```

We'll begin by selecting the `cardContainer`, which will house the cards we are about to render. Using the `fetch()` function, we set `cards = data`, where the data is received from the `pins.json` file.

```
<script>
    const cardContainer = document.querySelector("cardContainer");
    let cards = [];
    fetch("pins.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        cards = data;
    })
    .catch(function (err) {
        console.log(err);
    });
</script>
```

We then create an `appendData()` function, which maps over all the objects within the `pins.json` array using a for loop. For loops are useful when you want to run over the same code over and over, using different values. In this case, we want to create a separate card for each card object in the `pins.json` file.

Note that we can set attributes such as class names, source tags and IDs directly within this function. For example, this code would set a class name of `class="card"` on all cards created within the for loop.

```
var card = document.createElement("div");
card.className = "card";
```

Your `appendData()` function would look something like this:

```
    function appendData(data) {

        <!-- get the element that we want to transform -->

        var cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = "";

        <!-- i represents each object within the array  -->

        for (var i = 0; i < data.length; i++) {

          <!-- create a new div element with class="card" and append it to the cardContainer -->

          var card = document.createElement("div");
          card.className = "card";
          cardContainer.appendChild(card);

          <!-- similarly, create an img element with a src value of data[i].src, which refers to the src object within our pins.json file -->

          var img = document.createElement("img");
          img.src = data[i].src;
          card.appendChild(img);

          <!-- create another div element with class="tagContainer" -->

          var tagContainer = document.createElement("div");
          tagContainer.className = "tagContainer";
          card.appendChild(tagContainer);

          <!-- to create the individual tag buttons, we will need to map over the data[i].tags object within pins.json, using the javascript function, map(). For each tag, we create a new button element with an onClick() function -->

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

## Filtering through the tags

Once we have cards with tags, we want to be able to filter these tags into collections.

Note how we can set the search term value to the user's input value in the search bar by finding `var searchTerm = document.getElementById("searchInput").value;`.

Add the following snippet to your `<script/>`, below the `appendData()` function.

```
function filterTags() {

    <!-- get the value of the searchInput and display it to the user within the searchResult element  -->

    var searchTerm = document.getElementById("searchInput").value;
    document.getElementById("searchResult").innerHTML = "You searched for: " + searchTerm;

    <!-- transform the user input as well as the tags to be lowercase to ensure that the tags match the search keys exactly -->

    const searchTermLower = searchTerm.toLowerCase();

    <!-- filter the cards based on whether the tags include the search term results -->

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

Additionally, we want to be able to filter the cards by clicking on one of the tags. The `onClick()` function filters the cards in the card container by checking which cards contain tags with the same innerHTML. Add the following to your `appendData()` function, below the creation of the tagButton element `const tagButton = document.createElement("button");`.
            
```
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

## Adding a modal

A modal is a variation of a popup that can display information or ask for user information, such as a sign-up form. In our case, we want to use a basic modal to get the data we need to add a new card to our collection.

Within the modal, we'll be using an HTML form element with a submit button. The input type specifies the type of user input we expect, which can be text, radio buttons, checkboxes, etc.

Add the modal HTML code below the `cardContainer` element.

```
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

Your full HTML, excluding the `<script/>`git contents, should now look like this:

```
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
        <span class="close">&times;</span>
        <form>
          <label for="fname">Image source</label>
          <input
            type="text"
            id="imgsrc"
            name="source"
            class="newCardInput"
            placeholder="Paste your image url here"
          />
          <label for="lname">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            class="newCardInput"
            placeholder="Separate tags with a semicolon ( ; )"
          />
          <button type="button" class="submitButton" onclick="saveNewCard()">
            Submit
          </button>
        </form>
      </div>
    </div>
  </body>
</html>

```

We still need to create a button to open and close the modal. We'll do this by setting the display property to "block" (from a default of `display="none"`). To close the modal, we'll do the opposite, setting the display property back to `display="none"`.

```
var newCardButton = document.getElementById("newCardButton");

      var newCardModal = document.getElementById("newCardModal");
      newCardButton.onclick = function () {
        newCardModal.style.display = "block";
      };

      var closeModal = document.getElementsByClassName("close")[0];
      closeModal.onclick = function () {
        newCardModal.style.display = "none";
      };

    <!-- this will enable the modal to close when the user clicks anywhere outside of the modal body -->

      window.onclick = function (event) {
        if (event.target == newCardModal) {
          newCardModal.style.display = "none";
        }
};
```

When clicking on the `Add a card` button, the modal form should appear and you should be able to close it by clicking the X at the top right, or anywhere outside of the modal contents. 

![Styled modal containing a form and submit button](/images/teamsForEducation/PinboardProject/styled-modal.png)

## Create a new card with custom input data

Lastly, we need to use the user data that we collected from the modal inputs to create and append a new card to our collection.

We also need to append the new cards to our existing collection and close the modal.

```
function saveNewCard() {
    var newImgSrc = document.getElementById("imgsrc").value;

    <!-- To separate the tag values, we can use the Javasript split() function. -->

    var newTags = document.getElementById("tags").value.split(";");

    <!-- Each card needs to have a unique ID, which we can create by getting the last ID in the existing array and adding one. -->

    var lastCardId = cards[cards.length - 1].id;

    <!-- Create a newCard variable that stores the new data in the same format as in the exising pins.json format -->

    var newCard = {
        id: lastCardId + 1,
        src: newImgSrc,
        tags: newTags,
    };

    <!-- add newCard to your existing card array -->

    cards = [...cards, newCard];
    appendData(cards);

    <!-- set modal display to none to close the modal -->

    newCardModal.style.display = "none";
}
```

## Where next?

A good place to start would be to customize this project. Feel free to play around with the fonts and styling to make it your own. 

Here are some example projects if you need inspiration:

* [Home decor board](https://repl.it/@Lean3Viljoen94/home-decor)
* [Recipe collection](https://repl.it/@Lean3Viljoen94/recipe-board)
* [Travel wishlist](https://repl.it/@Lean3Viljoen94/travel-todos)

Following that, here are some ideas for feature add-ons to this project:  

### Get photos using the Unsplash API

[Unsplash](https://unsplash.com/developers) has a free JSON API that gives you access to thousands of high-quality photos that can easily be integrated to your project. After creating an account, follow the README.md instructions for the [official Javascript wrapper](https://github.com/unsplash/unsplash-js) and read their [documentation](https://unsplash.com/documentation) if you get stuck. 

### Searching for multiple tags at once

You may want to search for more than one tag at a time, like searching "vegetarian" and "easy" recipes simultaneously. A hint for doing this is to split the search terms in a similar way to how we split the tags when adding them to the card.  

### Suggest tags as you type

When you have a large number of tags, you may want to suggest existing tags to the user while they are typing in the search bar, using a drop-down list. To do this, you'll need to perform a fetch query while the user types, and populate your drop-down list with the all the possible tags that contain the search phrase. 