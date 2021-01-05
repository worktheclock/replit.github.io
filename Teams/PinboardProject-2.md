# Pinboard Project (part 2)

In [part one](./PinboardProject), we created a pinboard of cards. Each card contained an image and some tags that we could search or filter. A shortcoming of this project was that data was not persisted - each time you refreshed the page your cards would disappear. In this tutorial, we'll show you how to use `Window.localStorage` to save the card data locally. This data will only be stored on each of your users' local machines, so cards will not be shared.

After implementing this, your users will be able to see their saved cards even after closing and reopening their browser (as long as they do not use their browser's tools to clear cookies and other local data).

## What is localStorage?

The [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) property is a read-only way of storing data with *no expiration date* to the user's web browser, using key-value pairs. This allows your data to be stored after your browser is refreshed or closed.

An example of saving data to localStorage:

```javascript
  localStorage.setItem("key", "value");
```

An example of retrieving previously saved data from localStorage:

```javascript
  localStorage.getItem("key");
```

## Adding our initial cards to local storage

If you have your own project from part 1, you can continue from that. If not, you can fork [our Part 1 project](https://repl.it/@ritza/pinboard-project) and continue from there.

The first step is to add our existing cards (stored as JSON) to localStorage. Because any cards the user adds will be saved here, this means that all our cards will be stored in the same place. We'll store these cards in a key called `initialPins`, so let's add some code to 

* Check if this data already exists
* If it doesn't, add the initial data from the JSON representation
 
Open the `script.js` file and replace the code between the `cardContainer` variable and the `appendData()` function with the following.

![Adding pins from json to localStorage](/images/teamsForEducation/PinboardProject-2/01-initialPins.png)

```javascript
let initialPins = fetch("pins.json")

document.addEventListener("DOMContentLoaded", function (event) {
  if (localStorage.getItem("initialPins") === null) {
    localStorage.setItem("initialPins", JSON.stringify(initialPins))
    cards = JSON.parse(localStorage.getItem("initialPins"));
    appendData(cards);
  } else {
    cards = JSON.parse(localStorage.getItem("initialPins"));
    appendData(cards);
  }
});
```

This code uses an event listener that runs automatically once the page has loaded. It checks to see if there's any data already stored in `initialPins` and adds the data from the `initialPins` variable.

## The `saveNewCard` function

Our `saveNewCard` function also needs to be adjusted to take into account the initial data. Add the following code to the top of the `saveNewCard()` function near the bottom of the `script.js` file.

```javascript
    var existingPins = JSON.parse(localStorage.getItem("initialPins"));
    if (existingPins == null) {
      existingPins = [];
    }
```

This function also needs to push new cards into localStorage and update the `existingPins` array so that the card will be displayed. Add the following lines to the end of the same function right after `appendData(cards)`.

```javascript
  localStorage.setItem("newCard", JSON.stringify(newCard));
  existingPins.push(newCard);
```

The last step is to append the `existingPins` array to our main array called `initialPins`, in order to add our new card to the main array that will be rendered on page load. Add the following line below the code added above. 

```javascript
  localStorage.setItem("initialPins", JSON.stringify(existingPins));
```

The complete `saveNewCard()` function should now look as follows.

```javascript
  function saveNewCard() {
    var existingPins = JSON.parse(localStorage.getItem("initialPins"));
    if (existingPins == null) {
      existingPins = [];
    }
    var newImgSrc = document.getElementById("imgsrc").value;
    var newTags = document.getElementById("tags").value.split(";");
    var lastCardId = cards[cards.length - 1].id;

    var newCard = {
      id: lastCardId + 1,
      src: newImgSrc,
      tags: newTags,
    };
    cards = [...cards, newCard];
    appendData(cards);
    
    localStorage.setItem("newCard", JSON.stringify(newCard));
    existingPins.push(newCard);

    localStorage.setItem("initialPins", JSON.stringify(existingPins));

    newCardModal.style.display = "none";
  }
```

## Adding a clear search button

Another shortcoming with our product at the end of part 1 was that a user couldn't easily clear a search term to go back to viewing all of the cards. Let's add a "Clear search" button for this.

Add a button similar to the "Add a card" button from part 1, under the search bar. For now, we'll use the same styling as for the "Add a card" button. 

### HTML

Add the following to the `index.html` file above the 'Add a card' button.

```html
  <button id="clearSearchButton" class="clearSearchButton">Clear Search</button>
```

### CSS

In `style.css` add the following under `.newCardButton`:

```javascript
.clearSearchButton {
  font-family: "Montserrat", sans-serif;
  font-size: large;
  margin: 0 0.2rem;
}
```

### Javascript

Finally, we'll need to add an `onClick()` function to the new button, specifying that we want to append and display all the available cards in our data array. Add this function to your `script.js` file, below the `saveNewCard()` function. 

```javascript
clearSearchButton.onclick = function () {
    appendData(cards);
};
```
To "clear" our filtered or searched items, we actually set our displayed data back to its original state.

![Clear search button](/images/teamsForEducation/PinboardProject-2/02-clear-search-button.png)

## What's next?

We've added persistent cards and an easy way to clear a search. There's no way for a user to remove cards yet though. You can try to implement this functionality using [`localStorage.removeItem("key")`](https://www.w3schools.com/jsref/met_storage_removeitem.asp)

<iframe height="400px" width="100%" src="https://repl.it/@ritza/pinboard-project-2?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
