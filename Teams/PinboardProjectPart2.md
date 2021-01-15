<!-- omit in toc -->
# Pinboard Project: Part 2

During [Part 1](./PinboardProjectPart1.md) of this project, we created the basic structure and styling of our pinboard. However, static HTML and CSS can only get us so far. The last step in creating a fully functional pinboard is to add interactivity by means of JavaScript as follows:

- [Updating HTML and CSS](#updating-html-and-css)
- [JavaScript Code](#javascript-code)
- [Handling Data](#handling-data)
  - [Local Storage](#local-storage)
  - [HTML DOM Nodes](#html-dom-nodes)
- [Functions](#functions)
  - [Updating Displayed HTML](#updating-displayed-html)
  - [Updating Saved Pins](#updating-saved-pins)
  - [Filtering Displayed Pins](#filtering-displayed-pins)
- [Event Specific Functions](#event-specific-functions)
  - [Handling Input Events](#handling-input-events)
  - [Handling Click Events](#handling-click-events)
  - [Handling Submit Events](#handling-submit-events)
- [Executing Code](#executing-code)
- [Further Reading](#further-reading)

## Updating HTML and CSS

Given that we'll be using JavaScript to control and create dynamic content we can remove our hardcoded elements from our basic structure.

However, you'll remember that we added a `defer` attribute to our `script` tag in our HTML. This means that (given that we are no longer hardcoding our pins in the HTML) we have to wait for the HTML to be created before our JavaScript starts executing. This means that there might be a brief delay before the dynamic content is loaded by JavaScript (during which only the HTML and CSS will be shown). In order to notify users that the content is still loading, we might want to display a loading animation. 

To this end we should append the following CSS to our `style.css` file:  

```css
@keyframes spin {
  0% { transform: rotate(0deg) } 
  100% { transform: rotate(360deg) }
}

.loader {
  animation: spin 0.6s linear 0s infinite;
	display: block;
  border: 8px solid #80008030;
  border-top: 8px solid purple;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  margin: 6rem auto;
}
```

You will notice that we're using a very strange syntax in the snippet above. This is simply a way of declaring animations in CSS. The declared animation (via `@keyframes`) is essentially telling our styling that our animated element should start a 0 degrees rotation and continue all the way to 360 degrees rotation. You will see that we are also binding the animation to our `.loader` class by means of the `animation` property. Our `animation` property describes the following behaviour (in this order):

- We want to use the `spin` animation declared by means of the `@keyframe` at-rule.
- Each cycle of the animation (from `0%` to `100%` ) should last `0.6` seconds.
- The animation should be `linear`, in other words, it should continually move at the exact same speed and not speed up or down a cycle starts/ends.
- The animation should have no delay, in other words, it should wait `0` seconds before starting.
- The animation should keep on repeating the cycle indefinitely (`infinite`)

You'll also see that the HTML element with the `loader` class will be an exact square, with a `height` and `width` of `6rem`.  However, by applying a `border-radius` of `50%` the element gets turned into a circle. This circle should not have a background colour but should have a light-pink border, of which one edge is dark purple (by overriding with `border-top`). By spinning this circle on its own axis (as per the `animation`) we create our loading effect.

After adding the above we can replace our placeholder pins with the following HTML (note you should replace the entire original `<main>` element and its content in your HTML as follows):

```js
<main>
  <div class="list" id="pins-list">
    <span class="loader"></span>
  </div>
</main>
```

This means that the following will be displayed while our JavaScript loads (at the moment you don't have any JavaScript, meaning that it should be in this state indefinitely):

![../static/images/teamsForEducation/pinboard-project/image-7.png](../static/images/teamsForEducation/pinboard-project/image-7.png)

However, there are still some other left-overs from our hardcoded HTML in part 1. If we enter a value into the filter field (top-left) we will still get autocompleted recommendations from our previous pins (even though we have no pins or tags on the page at the moment). To fix this we need to also clear the contents of our `<datalist>` HTML element (since we'll be managing these via JavaScript): 

You should change the current `<datalist>` element to the following:

```js
<datalist id="existing-tags"></datalist>
```

## JavaScript Code

Having done the above we are ready to add our JavaScript code. Similar to our approach in part 1, we will add the JavaScript in its entirety and then walk through it step by step. Let us start by placing the entire snippet below in our `script.js` file:

```js
let pins = [];

const defaultPins = [
  {
    id: "122203215486581930752615279550",
    image: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=600",
    tags: ["engineering"],
  },
  {
    id: "144685389103194178251333634000",
    image: "https://images.unsplash.com/photo-1572932491814-4833690788ad?w=600",
    tags: ["headphones", "ocean", "wellness"],
  },
  {
    id: "159279541173033634211014623228",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?w=600",
    tags: ["office", "coding", "desk"],
  },
  {
    id: "75261220651273643680893699100",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600",
    tags: ["boxing", "wellness"],
  },
  {
    id: "161051747537834597427464147310",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
    tags: ["lab", "engineering"],
  },
];

const savedPins= localStorage.getItem('savedPins');

if (savedPins) {
  pins = JSON.parse(savedPins)
} else {
  pins = defaultPins;
}


const existingTagsNode = document.querySelector('#existing-tags');
const filterInputNode = document.querySelector('#filter-input');
const pinsListNode = document.querySelector('#pins-list');

const dialogNode = document.querySelector('#dialog');
const dialogStartNode = document.querySelector('#dialog-start');
const dialogFormNode = document.querySelector('#dialog-form');
const dialogImageNode = document.querySelector('#dialog-image');
const dialogTagsNode = document.querySelector('#dialog-tags');
const dialogSubmitNode = document.querySelector('#dialog-submit');


function updateHTML (providedPins) {
  pinsListNode.innerHTML = (providedPins || pins).map(
    ({ id, image, tags }) => (`
      <section class="pin">
        <img class="image" src="${image}">

        <ul class="info">
          ${tags.map(
            (tag) => (`
            <li class="tag-wrap">
              <button class="tag">${tag}</button>
            </li>
          `)
          ).join('')}
        </ul>
        <button class="remove" aria-label="remove" value="${id}">
          &#10005;
        </button>
      </section>
    `)
  ).join('');
}


function updatePins (newPins) {
	if (newPins) pins = newPins;
  localStorage.setItem('savedPins', JSON.stringify(pins))
  existingTagsNode.innerHTML = pins.reduce(
    (result, { tags }) => {
      const newTags = tags.filter(tag => !result.includes(tag));
      return [...result, ...newTags]
    }, 
    []
  ).map(
    (tag) => `<option>${tag[0].toUpperCase()}${tag.slice(1)}</option>`
  ).join('')
  updateHTML();
}


function applyFilter (filter) {
  if (filter.trim() === '') return updateHTML();
  const array = filter
    .split(',')
    .map(text => text.trim())
    .map(text => text.toLowerCase());
  const filteredPins = pins.filter(({ tags }) => {
    const matchedTags = tags.filter(tag => array.includes(tag));
    return matchedTags.length >= array.length;
    }
  )
  updateHTML(filteredPins);
}


function handleInput (event) {
  if (event.target === filterInputNode) {
    applyFilter(escape(event.target.value))
  } else if (event.target === dialogImageNode || event.target === dialogTagsNode) {
    if (dialogImageNode.value.trim() !== '' && dialogTagsNode.value.trim() !== '') {
      dialogSubmitNode.disabled = false;
    } else {
      dialogSubmitNode.disabled = true;
    }
  }
}


function handleClick (event) {
  if (event.target === dialogStartNode || event.target === dialogNode) { 
    dialogNode.classList.toggle('hidden')
    dialogNode.open = !dialogNode.open;
  } else if (event.target.classList.contains('remove')) {
    updatePins(pins.filter(({ id }) => id !== event.target.value));
    applyFilter(filterInputNode.value)
  }	else if (event.target.classList.contains('tag')) {
    filterInputNode.value = event.target.innerText;
    applyFilter(filterInputNode.value)
  }
}


function handleSubmit (event) {
  event.preventDefault();
  const time = new Date()
    .getTime()
	const id = `${time}${Math.random() * 100000000000000000}`;
  const image = encodeURI(dialogImageNode.value.trim());
  const tags = dialogTagsNode.value
    .split(',')
    .map(tag => tag.trim())
    .map(tag => tag.toLowerCase())
    .map(tag => escape(tag));
  updatePins([ ...pins, { id, image, tags } ]);
  applyFilter(filterInputNode.value)
  dialogNode.classList.add("hidden");
	dialogNode.open = false;
  dialogImageNode.value = '';
  dialogTagsNode.value = '';
  dialogSubmitNode.disabled = true;
}


document.body.addEventListener('input', handleInput)
document.body.addEventListener('click', handleClick)
document.body.addEventListener('submit', handleSubmit)
updatePins();
```

## Handling Data

Before executing any logic we need to set up some basic data structures. First and foremost, instead of hardcoding our pins in the HTML as before we will now keep track of them by means of an array with objects (each containing an `id`, `image` and an array of `tags`) in our JavaScript.  However, if a user visits our page for the first time their pins will start as an empty array (`[]`). This certainly won't look very appealing (especially if it is their first impression of our page!). Therefore we also add a `defaultPins` array that we can add to our active `pins` array if this is the first time a user is visiting our page. The `defaultPins` contains all the values that we hardcoded in part 1. However, you are welcome to replace them with your own default values.

### Local Storage

You probably know that all the above JavaScript will stop running once we close the page, meaning that any data stored in the `pins` variable (whether added by a user or the default pins) will be lost. This means that the array will be created again from scratch when the user returns to their pinboard. This is not very useful at all!

Fortunately, all modern browsers provide us with the means to persist data even after we close our pinboard. We can use the (appropriately named) `localStorage.setItem` method to save data locally to our device, and likewise, we can use `localStorage.getItem` to retrieve the data again when the page loads. While `localStorage` is super powerful there are a couple of things to keep in mind:

- It does not persists between different browsers (for example between Chrome, Firefox and Safari).
- It is tied to the specific device you are using at the time and won't sync between devices.
- If you clear your browser history it might delete your `localStorage` data too.
- You can only save strings (a single line of text data) in `localStorage`
- Each string needs to be assigned to a unique name in `localStorage`

The last two points are important since it means that we are unable to store arrays or objects to `localStorage`. However, there is a common way around this by turning our data structures into strings (via `JSON.stringify`) before saving it to `localStorage`, and then turning it back into an array or object (via `JSON.parse`) after retrieving it from `localStorage`.

For example, by running `JSON.stringify` on our array we are able to save a string resembling the following in `localStorage`: 

```jsx
"[{id:\"1222032154865\",image:\"https:\/\/images.unsplash.com\/photo-1580983218765-f663bec07b37?w=600\",tags:[\"engineering\"],},{id:\"1446853891031\",image:\"https:\/\/images.unsplash.com\/photo-1572932491814-4833690788ad?w=600\",tags:[\"headphones\",\"ocean\",\"wellness\"],},{id:\"1592795411730\",image:\"https:\/\/images.unsplash.com\/photo-1580894908361-967195033215?w=600\",tags:[\"office\",\"coding\",\"desk\"],},{id:\"752612206512\",image:\"https:\/\/images.unsplash.com\/photo-1584464491033-06628f3a6b7b?w=600\",tags:[\"boxing\",\"wellness\"],},{id:\"1610517475378\",image:\"https:\/\/images.unsplash.com\/photo-1581094271901-8022df4466f9?w=600\",tags:[\"lab\",\"engineering\"],},]"
```

We use `localStorage` as follows in our JavaScript code:

- We start by checking whether there is a string called `savedPins` saved in our `localStorage.`
- If a string is indeed assigned to `pisavedPins` we run `JSON.parse` on it to turn it into an array.
- Once converted to an array we set our active `pins` variable to the returned array.
- However, if no such `savedPins` value exists in `localStorage` then we know that this is the first time a user is visiting our page.
- Subsequently we populate the `pins` variable with the default pins:

```js
let pins = [];

const defaultPins = [
  {
    id: "1222032154865",
    image: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=600",
    tags: ["engineering"],
  },
  {
    id: "1446853891031",
    image: "https://images.unsplash.com/photo-1572932491814-4833690788ad?w=600",
    tags: ["headphones", "ocean", "wellness"],
  },
  {
    id: "1592795411730",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?w=600",
    tags: ["office", "coding", "desk"],
  },
  {
    id: "752612206512",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600",
    tags: ["boxing", "wellness"],
  },
  {
    id: "1610517475378",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
    tags: ["lab", "engineering"],
  },
];

const saved = localStorage.getItem('pins');

if (savedPins) {
  pins = JSON.parse(saved);
} else {
  pins = defaultPins;
}
```

### HTML DOM Nodes

In addition, to keeping all our active pins in a `pins` variable, it is also helpful to declare all the HTML elements that we will be using upfront. This makes it easier when returning to see all the IDs used by JavaScript grouped together. You'll see that all of these HTML elements are selected by means of the `document.querySelector` method. The query we use is similar to selectors in CSS, for example, `#existing-tags` means that JavaScript needs to look for an HTML tag with an `id` attribute of `existing-tags`.

As you'll remember we created a couple of `id` attributes in our HTML that we can use to find the required elements:

```js
const existingTagsNode = document.querySelector('#existing-tags')
const filterInputNode = document.querySelector('#filter-input');
const pinsListNode = document.querySelector('#pins-list')

const dialogNode = document.querySelector('#dialog')
const dialogStartNode = document.querySelector('#dialog-start')
const dialogFormNode = document.querySelector('#dialog-form')
const dialogImageNode = document.querySelector('#dialog-image')
const dialogTagsNode = document.querySelector('#dialog-tags')
const dialogSubmitNode = document.querySelector('#dialog-submit');
```

## Functions

Now that we've created our basic data structures, we will be declaring some JavaScript functions that we can run when specific conditions are met. Note that all of these snippets merely create the functions and don't do anything until the functions are called later in our code.

### Updating Displayed HTML

In essence, any type of interactivity on the web is only possible by directly modifying the HTML or CSS that is displayed by the user. This is either done by loading a new page (by means of server-side rendering) or by directly manipulating the former with JavaScript. It is to this end that we will create a low-level function that we can run each time our `pins` array changes. By running this function our HTML will be re-rendered to reflect the current state of our `pins` array.

We start by referencing the `pinsListNode` variable, which holds the `div` HTML tag that wraps all our displayed pins. However, (due to the changes we made above) it only contains a `<span class="loader"></span>` HTML at the moment. This means that once we run our `updateHTML` function then the HTML inside the `div` will be overridden by means of a new HTML string created by the following logic:

- When the `updateHTML` function is called an optional `providedPins` array can be passed directly to it as an argument.
- Within the function we start by with the following `(providedPins || pins)` which essentially tells JavaScript to use the `providedPins` argument if it is passed to the function, otherwise it should fall back to the default `pins` variable declared at the top of the file.
- Next, we start by running the `.map` method the array that was selected in the last step. The `.map` method accepts a function as an argument, which we immediately pass as an [arrow function.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) This function will be executed on every single item in our array (a pin object in our case) upon which it will return a new array populated with the results of each execution.
- Each object in our starting array should have an `id`, `image` and `tags` property (as decided when we created the `pins` variable above), This means that we can directly [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) them into the arrow function that we pass.
- Each time the arrow function executes it returns a string of HTML created by a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) (wrapped in back-tick characters). Template literals are super useful insofar that they allow us to insert dynamic values straight into the string. Dynamic values should be wrapped in the following syntax: `${ }` (this is called [interpolation](https://en.wikipedia.org/wiki/String_interpolation)).
- The first variable we interpolate is the `image` property retrieved directly from the object by means of destructuring. However, the next interpolation is an actual JavaScript expression (in this case the result of the expression will be placed in our string where the interpolation is defined).
- In this interpolated expression, we do another `.map`, this time over the tags array inside each pin object, and similarly, we're once again using interpolation to add the value dynamically to the returned HTML string.
- Our interpolation expression should have an array of HTML strings once it finishes, for example: `["<li class="tag-wrap"><button class="tag">engineering</button></li>", <li class="tag-wrap"><button class="tag">Wellness</button></li>", <li class="tag-wrap"><button class="tag">Coding</button></li>"]`
- You will notice at the end of the interpolated expression we are running a `.join('')` method. The `.join` method combines all values of an array into a single string. The argument that we pass to `.join` determines how the items will be divided in the final string. Since we don't want any dividers between our lines of HTML strings above we simply pass an empty string as an argument (`''`). For example the following `[1,2,3].join('-')` will create the following string: `"1-2-3"`, likewise `[1,2,3].join('')` will create `"123"`
- Finally, you'll see that we do the exact same thing on the first `.map` that provides the final value to `pinsListNode.innerHTML`.

```js
function updateHTML (providedPins) {
  pinsListNode.innerHTML = (providedPins || pins).map(
    ({ id, image, tags }) => (`
      <section class="pin">
        <img class="image" src="${image}">

        <ul class="info">
          ${tags.map(
            (tag) => (`
            <li class="tag-wrap">
              <button class="tag">${tag}</button>
            </li>
          `)
          ).join('')}
        </ul>
        <button class="remove" aria-label="remove" value="${id}">
          &#10005;
        </button>
      </section>
    `)
  ).join('');
}

```

The above should created a string that looks something as follows (and is assigned as the HTML inside `pinListNode` :

```js
pinsListNode.innerHTML = `
<section class="pin">
  <img 
    class="image" 
    src="https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=600"
  >

  <ul class="info">
    <li class="tag-wrap">
      <button class="tag">engineering</button>
    </li>
  </ul>

  <button class="remove"aria-label="remove" value="1222032154865">
  &#10005;
  </button>
</section>

<section class="pin">
  <img
    class="image"
    src="https://images.unsplash.com/photo-1572932491814-4833690788ad?w=600"
  >

  <ul class="info">
    <li class="tag-wrap">
      <button class="tag">headphones</button>
    </li>

    <li class="tag-wrap">
      <button class="tag">ocean</button>
    </li>

    <li class="tag-wrap">
      <button class="tag">wellness</button>
    </li>
  </ul>

  <button class="remove"aria-label="remove" value="1446853891031">
  &#10005;
  </button>
</section >`;
```

### Updating Saved Pins

However, merely updating our HTML is not enough. We also need to perform some higher-level tasks as well. For example, we need to save the current `pins` variable to `localStorage` and updates our `datalist` HTML (so that we get the most up-to-date autocomplete recommendations). We do this by means of the following function:

```js
function updatePins (newPins) {
	if (newPins) pins = newPins;
  localStorage.setItem('savedPins', JSON.stringify(pins))
  existingTagsNode.innerHTML = pins.reduce(
    (result, { tags }) => {
      const newTags = tags.filter(tag => !result.includes(tag));
      return [...result, ...newTags]
    }, 
    []
  ).map(
    (tag) => `<option>${tag[0].toUpperCase()}${tag.slice(1)}</option>`
  ).join('')
  updateHTML();
}
```

Firstly and foremost, similar to our `updateHTML` function we are able to pass a value called `newPins` to this function. If a `newPins` array is passed to the function then the current `pins` variable (declared at the top of the file) will be overridden with `newPins`. This is merely a quality of life feature, since in the majority of cases where we run `newPins`. we also want to update the `pins` variable.

The function firstly runs `JSON.stringify` on our `pins` array and then overriding (or creating) the current `savedPins` value in `localStorage` with the string from `JSON.stringify`.  Furthermore, we retrieve the `existingTagsNode` variable (which has the element for our `datalist` in the HTML) and we replace its inner HTML with the result of the following logic:

- We get the current `pins` array and run the `.reduce()` method on it.
- If you are not familiar with `.reduce()` it is very similar to `.map()`. It also runs a function (passed as an arrow function to reduce) on each item in the original array. However, instead of merely providing the item itself as the argument of the arrow function, `.reduce()` provides two arguments. The first `result` contains the last value returned and next argument (which we restructure as `{ tags }` is the current array item that it is looping over. This allows us to do some super powerful things in JavaScript! For example, we can add all the values in an array as follows: `[1,2,3,4,5,6,7,8].reduce((result, number) => result + number), 0);` which will return `36`.
- In our case, we destructuring only the `tags` array from each object in our array (although the other properties still exist on the object).
- We then use the `filter` method to create a new array that contains only the tag items that are not already in the existing `result`. The `.filter()` method works similar to `.map()` and `.reduce()` insofar that it returns a new array, but items from the original array are only copied over if the arrow function executed on the item in question returns `true`. For example `[21, 9, 40, 0, 3, 11].filter(number => number < 10)` will return `[9, 0, 3]`
- In our function, we use the `includes()` method to determine whether a tag already exists in `results`, if it does it will return `true` otherwise it will return `false`
- We then modify the `result` of our `.reduce()` method by combining the newly created array with the existing `result` values. If the newly created array is empty (if it has no tags or all its tags are already present in `result`) then an empty array will simply be added to `result` (effectively keeping `result` as is).
- In addition to the arrow function that we pass to `.reduce()`, we also need to pass a second argument (which people often forget about!). This second argument simply determines the `result` value when the `reduce()` method starts. In our case we simply want it be an empty array (`[]`)
- However, we're not done yet. Since we're only getting the string value of the tags themselves in the `result` of `.reduce()` we still need to wrap them in actual HTML. We will do this by passing the results to a `.map()` method that simply wraps them in an `<options>` HTML element.
- Furthermore, we are passing another expression into the interpolation of this template literal. In this case, the expression simply capitalizes the first character of the tag value by means of selecting it and running `.toUpperCase()` on it and then interpolating the rest of the value after it `.slice(1)` extracts all characters after the first one. This means that for example `engineering` will be converted to `Engineering`.
- Lastly, we run `.join('')` on the finale array and to turn it into one big HTML string.

The above should replace the inner HTML inside `existingTagsNode` with something as follows:

```js
existingTagsNode.innerHTML = `
  <option>Engineering</option>
  <option>Headphones</option>
  <option>Wellness</option>
  <option>Ocean</option>
  <option>Office</option>
  <option>Coding </option>
  <option>Desk</option>
  <option>Boxing</option>
  <option>Lab</option>
`
```

After all of the above completes we automatically trigger the `updateHTML` function to make sure that we are showing the correct pins.

### Filtering Displayed Pins

Lets' create our last core function before we start heading into the realm of event handlers. This function updates the HTML being displayed to the user based on a single text value (passed directly to the function). This value will correspond to the input of the filter field in our HTML:

```js
function applyFilter (filter) {
  if (filter.trim() === '') return updateHTML();
  const array = filter
    .split(',')
    .map(text => text.trim())
    .map(text => text.toLowerCase());
  const filteredPins = pins.filter(({ tags }) => {
    const matchedTags = tags.filter(tag => array.includes(tag));
    return matchedTags.length >= array.length;
    }
  )
  updateHTML(filteredPins);
}
```

Before we do anything we want to check if the `filter` argument passed to the function is `''`, in other words, if nothing is passed to the filter then we should simply call the `updateHTML` function without passing any arguments. This means that the function will replace the current HTML using the full default `pins` array (instead of a custom filtered object). This will override any currently filtered HTML (since we are essentially saying that no filters should be applied) and display all pins. You will also note that we also run `.trim()` on the values passed by means of `filter`. This is to account for empty spaced values like `"         "` (which should still be considered empty) by our logic.

However, if the string passed by means of `filter` is not empty we start by turning it into a variable called `array` that can be looped over when comparing tags. The reason being that we want to allow users to pass chained filters into a single string by means of separating them by commas (`,`) for example `"Engineering, Office, Lab"`. In order to transform this into a useable `array` value we will do the following:

- Run `split` on the string. This breaks the string into an array, with the argument passed being used as the point of division (essentially the opposite of `.join()`). This means that our example above will be transformed into the following array: `["Engineering", " Office", " Lab"]`
- However, you'll note that the last two items in the array have spaces before them. Meaning that they won't match any of our tags. Since `" Office"` is not the same as `"Office"` according to JavaScript. Therefore we use `.map()` to and the `trim()` method again to remove any whitespace around our tags. This should also account for arbitrary spaces added by users, for example, a user might enter something like: `"  Engineering,  Office,      Lab"`.
- Lastly, we also don't want our filtering to be case sensitive. This means that there should be no difference between "Engineering", "engineering" or "ENGINEERING". To this end, we run `.map()` over the array and covert all tags to lowercase (since we are keeping everything as lowercase in our JavaScript).

In addition to the above, you will notice that we have created another array. This array, titled `filteredPins` is a duplicate of the default `pins` array, but with all the objects that do not have tags that match any items in `array` removed. We create this array as follows:

- We run the `filter()` method we discussed previously on our `pins` array and pass an arrow function that automatically destructures the `tags` array from each object in `pins`.
- We then run a second nested filter inside the arrow function on the `tags` property from the pin object.
- Within this nested arrow function, we loop over each tag assigned to an object and use `.includes()` to determine whether it matches one of the values created in our initial `array` variable above (based on the filter string that was passed to the function)
- Given that the nested `filter()` will only return tags that actually match the filter `array` we can say that if it returns `0` items (checked with `.length`) then none of the tags in the object matches any items in our reference `array` variable. Subsequently, this object should not be added to our new `filteredPins` array.
- On the flipside, if there is at least one item in the `matchingTags` array we can say that at least one tag matches our original filter `array`. This means that the object should be copied to the new `filteredPins` array.
- After only the objects that have matching tags are copied to `filteredPins` we run `updateHTML` passing `filteredPins` as the array to use (by means of the `providePins` parameter created in the `updateHTMl` function. This means that the default `pins` variable won't be used, but instead the filtered pins array that we pass,

Here the distinction between `updatePins` and the lower-level `updateHTML` becomes important. The `updatePins` functions also runs the `updateHTML` function after it performed its own tasks, such as overriding `savedPins` in `localStorage` and updating the `datalist` HTML. For this reason you might have been wondering why we didn't merely embed the `updateHTML` logic directly in the `updatePins` functions. However here we see the value of being able to call `updateHTML` directly (without `updatePins`), since this means that we can side-step all the latter logic that changes the actual `pins` data.

The reason is that the filters are only visual in nature, so we only want to update the HTML show to the user, while keeping our `pins` data untouched. Filtering pins should not actually remove any objects from the `pins` array or remove any recommendations from our `datalist`. If we used `updatePins` instead, then this would accidentally change the pins that were added.

Taking the above approach also means that we can simply run the default `updateHTML` function (without passing an argument) if the filter value changes to empty, essentially syncing up the displayed HTML with the full `pins` array again.

## Event Specific Functions

We spent some time above creating three modular, low-level tasks by means of functions. These can be reused throughout our JavaScript logic and abstract away common tasks. However, at this point, we've only declared these functions. This means that nothing will happen if we run our JavaScript up until this point. In order to actually use the above functions, we will need to trigger them in response to actions performed by users.

This is commonly done by adding [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) directly to HTML nodes. For example in the case of our *"Add New Image"* button we want to remove the `hidden` CSS class from our dialog element. 

Therefore we can do the following: 

```js
dialogStartNode.addEventListener(
  'click',
	() => {
	  dialogNode.classList.remove('hidden')
		dialogNode.open = true;
	}
)
```

This is quite a common approach to handling user-triggered events. However, the latter becomes tricky if we relinquish the creation of our HTML to JavaScript itself. The reason being that upon recreating HTML via JavaScript (as we do with `updateHTML`) we need to manually re-add each individual event listener. Furthermore, we also need to manually remove all previous event listeners (via `removeEventListener` ) before swapping out the HTML. Otherwise, [as outlined by Nolan Lawson](https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/), we can cause unexpected memory leaks. That being said, this is not a problem with our example, since the `dialogStartNode`never gets replaced. However, in the cases where we do replace HTML, this approach introduces large amounts of overhead. 

Luckily the HTML DOM itself provides a way around this. Most modern browsers do something called [event propagation](https://www.freecodecamp.org/news/a-simplified-explanation-of-event-propagation-in-javascript-f9de7961a06e/). This essentially means that if an event is fired it echos up the entire HTML tree until it is captured or reaches the top-level `<body>` element. You can think of this as ripples that extend outwards as you toss a pebble into a pool of water.

This means that we can get around placing event listeners directly on our HTML elements by rather adding them to the highest level parent the HTML `<body>` element. However, since all events in our HTML will set off the event listener added to the  `<body>` element we need to be able to distinguish between events. This is surprisingly easy and only requires us to look at the `target` property of an event's dispatched object.

With this approach, we can create three separate functions that handle all our `click`, `input` and `submit` events on the page. Note these functions are not the event listeners themselves, but merely are used to respond to the event listeners by being passed as a callback to, for example, `document.body.addEventListener('input', handleInput)`.

### Handling Input Events

Let's start with a piece of interaction that seems at face value like it might require a fair bit of complexity: `input`. Given that things need to update real-time as our input events fire it stands to reason that the associated logic might be heavily nested. Surprisingly, both cases of where we listen to `input` events are actually pretty trivial, due to us already having done most of the work with our previous core functions. However, there is something else that we need to take into account here (or whenever a user submits any other data by means of a form), called [character escaping](https://en.wikipedia.org/wiki/Escape_character). 

Given that we allow users to enter values into our inputs without restriction we should prevent them from entering anything that might be harmful or break the functionality of our pinboard (even if accidentally). For example, if a user enters `console.log('You've been hacked!')` into the input we want to prevent this value from accidentally getting executed by JavaScript as code (thereby logging "You've been hacked to the browser console). 

Going back to one of our examples at the very top where we discussed how an array can be changed into a string with `JSON.stringify` (in order to save it into `localStorage`) we looked at the following example:

```jsx
"[{id:\"1222032154865\",image:\"https:\/\/images.unsplash.com\/photo-1580983218765-f663bec07b37?w=600\",tags:[\"engineering\"],},{id:\"1446853891031\",image:\"https:\/\/images.unsplash.com\/photo-1572932491814-4833690788ad?w=600\",tags:[\"headphones\",\"ocean\",\"wellness\"],},{id:\"1592795411730\",image:\"https:\/\/images.unsplash.com\/photo-1580894908361-967195033215?w=600\",tags:[\"office\",\"coding\",\"desk\"],},{id:\"752612206512\",image:\"https:\/\/images.unsplash.com\/photo-1584464491033-06628f3a6b7b?w=600\",tags:[\"boxing\",\"wellness\"],},{id:\"1610517475378\",image:\"https:\/\/images.unsplash.com\/photo-1581094271901-8022df4466f9?w=600\",tags:[\"lab\",\"engineering\"],},]"
```

If you look closely you'll see that all our double quotation marks (`"`) have backslashes (`\`) before them. This tells JavaScript that the double quote symbol should be treated as the string character `"` and not as actual JavaScript syntax symbol. For example, if we didn't escape the quotes JavaScript would actually close the above string prematurely, since the `"` symbol is used in JavaScript to end string declarations.

This means that JavaScript would end the string when it reaches the double quote as follows:

```jsx
"[{id:"
```

We will be escaping some of the data provided by users, therefore it is important to understand exactly why we are doing this. That being said, lets look at the function itself:


```js
function handleInput (event) {
  if (event.target === filterInputNode) {
    applyFilter(escape(event.target.value))
  } else if (event.target === dialogImageNode || event.target === dialogTagsNode) {
    if (dialogImageNode.value.trim() !== '' && dialogTagsNode.value.trim() !== '') {
      dialogSubmitNode.disabled = false;
    } else {
      dialogSubmitNode.disabled = true;
    }
  }
}
```

We can see that there are two types of event listeners that we are interested in:

- Where the `target` is the same as the `filterInputNode` input.
- Where the `target` is either the `dialogImageNode` or `dialogTagsNode` inputs.

Note that the `input` event is different from the `change` event insofar that `change` only fires when a user changes the value inside input and then clicks outside it. Whereas `input` is triggered even when a single character changes in our input. This means that if we type `Hello!` it would fire the `input` event six times, and then when we remove the exclamation mark (`!`), changing the value to `Hello`, it would fire again. Whereas `change` would only fire once we click away from the `input`.

The actual card filtering event is pretty trivial. We simply check if it was the `filterInputNode` that triggered `input` and if this is the case we pass the value of the input to the `applyFilter` function. However, in addition to this behaviour we also want to add an additional piece of functionality. Given that the fields used in our dialog are empty when our page loads we also want to set the button to add the values as a pin to `disabled` . However, having a button that is indefinitely disabled is of no use to us, so we want to check the values whenever either the image URL or entered tags change. Only once neither of these are empty anymore do we enable the button. We do it as follows:

- Remove all surrounding whitespace from the both input field values by means of `.trim()`
- If neither of these values are empty (i.e. they do not trim to `''` ) then we set the disabled state of the submit button to `false` (allowing it to be clicked).
- If either of the latter return `''` when trimmed we will either keep the button disabled or set it back to disabled.

### Handling Click Events

Second is perhaps one of the most common event listeners on the web, a `click` event listener. It is triggered whenever a user presses anything in our HTML (this include touch events on mobile). Currently, there are four types of click events that we are interested in:

- A user clicks on the `Add New Image"` button
- A user clicks outside of the dialog form
- A user clicks on the remove button (`x`) on top of a pinned image.
- A user clicks on one of the tag buttons on top of a pinned image.

We are able to cover all of these with the following function:

```js
function handleClick (event) {
  if (event.target === dialogStartNode || event.target === dialogNode) { 
    dialogNode.classList.toggle('hidden')
    dialogNode.open = !dialogNode.open;
  } else if (event.target.classList.contains('remove')) {
    updatePins(pins.filter(({ id }) => id !== event.target.value));
    applyFilter(filterInputNode.value)
  }	else if (event.target.classList.contains('tag')) {
    filterInputNode.value = event.target.innerText;
    applyFilter(filterInputNode.value)
  }
}
```

Let's go through this function step by step:

Luckily the first two events in our list require the exact same thing: the toggling of hidden and open states of the dialog. Therefore we check if the `event.target` is either `dialogStartNode` or the `dialogNode` itself. If this is the case we can simply toggle the `hidden` class and set the `open` attribute to the exact opposite of what it currently is (by means of a [logical not operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)). While the last attribute has no effect on what is shown to users it is helpful for search engines and accessibility devices.

Then, if our `target` is neither of the above, we check if our the `target` value contains the `remove` CSS class. Since we are using the `remove` class to style our deletion buttons we can assume that the event came from one of these buttons. However, how do we determine which from which pin it came? If you've been particularly attentive you'll remember that we added a `value` attribute to each of these buttons in our HTML. This `value` attribute contains the unique `id` of the object corresponding to a specific pin.

This means that we can once again use our friend the `.filter()` method and tell it to create a new array that only contains objects that do not match the supplied ID (by means of the `value` attribute). We then pass this new array directly to `updatePins` and the pin is removed from the HTML and our `pins` array. In addition, after updating the pins we also re-apply the current filter value (if there is one) so the HTML update that removed the pin does not break any current filtering condition.

Lastly, if our event is neither of these, then we can check if the target has a class of `tag`. If this is the case then we know that we are dealing with one of the tags buttons overlaid on top of a pin (when a user hovers over a pin). This means that we can use its inner text to determine the name of the tag that was clicked on and override the current filtering input with this value. However, since we are doing this programmatically (and it is not triggered by the user) we need to manually trigger the `input` event.

### Handling Submit Events

Lastly, we have the `submit` event function. This is fired whenever a form is submitted on our page. Given that we only have one form on our page we don't need to check where the event came from and simply execute the following logic:

```js
function handleSubmit (event) {
  event.preventDefault();
  const id = new Date()
    .getTime()
    .toString();
  const image = encodeURI(dialogImageNode.value.trim());
  const tags = dialogTagsNode.value
    .split(',')
    .map(tag => tag.trim())
    .map(tag => escape(tag));
  updatePins([ ...pins, { id, image, tags } ]);
  applyFilter(filterInputNode.value)
  dialogNode.classList.add("hidden");
	dialogNode.open = false;
  dialogImageNode.value = '';
  dialogTagsNode.value = '';
  dialogSubmitNode.disabled = true;
}
```

- By default when a form is submitted on a web page the page automatically refreshes (assuming that the data will be handled by the server).
- However, since we are using JavaScript to handle our logic (and not a server) we want to override this behaviour. Luckily the submit event object includes a method (`preventDefault`) that we can run on the event itself to prevent this from happening.
- After stopping the above from happening we need to create a unique `id` value to identify this new pin added to the `pins` array. We generate a unique `id` value by simply using the current date and time. We simply get the current date and time with `new Date()` and then run `getTime()` on it. The latter turns the created date object date into a number of milliseconds that have passed since midnight 1 January 1970 (called the [unix epoch](https://en.wikipedia.org/wiki/Unix_time) in programming).
- The implication here is that unless a user presses the submit button twice at the exact same millisecond that each of their pins will have a different unique value (based on when it was created).
- Yet, we should be mindful that although an amount of milliseconds is a number when we use it as a unique ID it is strictly speaking no longer a number. By definition, a number can not start with `0` and it is used to represents a countable amount of something. However, the `id` value we expect adheres to none of these, therefore to be technically correct, we should not save our ID as a number but instead a string.
- Luckily this can easily be done by running the `.toString()` method on our millisecond number.
- Then we retrieve the URL value provided and run `encodeURI()` on it. Not only does `encodeURI()` escape characters. For example, turning `;,/?:@&=+$#` into `%3B%2C%2F%3F%3A%40%26%3D%2B%24%23`, but it also does this in a manner that still makes it useable as a URL.
- After this we proceed to create the tags that were entered. You will notice that this very closely resembles the logic we use in our `applyFilter` function. However, with the exception that we afterwards loop over the items and manually run the native JavaScript `escape` function on each item.
- The we create a new array by destructuring the current `pins` array and adding an object to it that uses the values we created above.
- After this we manually trigger `applyFilter` to not break any filtering that is currently applied.
- Then lastly we close the dialog by making direct use of the `dialog` HTML element.
- And also reset all HTML elements inside the dialog to empty and disabled.

## Executing Code

That's it, we've created all the logic required by our pinboard!

Yet still, if we run our JavaScript up to this point nothing will still happen. This is because we essentially just created the required data structures and functions that will be used by JavaScript. However, they are standing there like lines of perfectly lined up dominos, waiting for the first one to be tipped over.

We do this by means of the following four lines of code:

```js
document.body.addEventListener('input', handleInput)
document.body.addEventListener('click', handleClick)
document.body.addEventListener('submit', handleSubmit)
updatePins();
```

You can think of each of these as each tipping over a starting dominoes for four different lines of dominoes as follows:

- We attach an event listener to the HTML body element and tell it to fire `handleInput` when users input values into any input field.
- We attach an event listener to the HTML body element and tell it to fire `handleClick` when a user clicks on anything in our HTML.
- We attach an event listener to the HTML body element and tell it to fire `handleSubmit` when a user submits a form created in our HTML.
- We manually trigger `updatePins` in order to create the HTML for the pins that have been loaded by JavaScript.

## Further Reading

We've touched on numerous concepts and native functionality of JavaScript itself. I've tried my best to explain each concept as we went. However, if I missed anything or you simply want a deeper understanding of what exactly something means then consult the phenomenal [Mozilla Developer Network Glossary](https://developer.mozilla.org/en-US/docs/Glossary) page. Alternatively, if you don't mind paying for it you can also have a look at the even more comprehensive [Web Development Glossary](https://leanpub.com/web-development-glossary) book created by [Jens Oliver Meiert](https://meiert.com/en/).

Alternatively if neither of the above is satisfactory you might be able to find additional material with a quick Google search.