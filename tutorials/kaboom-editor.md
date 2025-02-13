# Kaboom editor

[Kaboom.js](https://kaboomjs.com) is a game development library that makes it fun and easy to build games! 

This doc explains the tools provided by the Kaboom editor on Replit. To learn more about the Kaboom.js library, check out the docs, guides and examples on the [Kaboom website](https://kaboomjs.com/).


## Scene Manager

Kaboom ["scenes"](https://kaboomjs.com/#scene) allow us to group logic and levels together. In Kaboom.js, you write each scene's content inside a scene block:

```js
scene("start", () => {
	add(...);
	action(...);
	keyPress(...);
});

scene("game", () => {
	// ...
});
```

## Sprite Manager & Editor

There are several ways to add sprites to a Kaboom repl:

1. Using the upload icon.

<img src="/images/tutorials/kaboom/upload-icon.png"
alt="Upload icon"
style="width: 40% !important;"/>

2. Clicking on the files icon and then dragging and dropping the sprites onto the "sprites" folder.

<img src="/images/tutorials/kaboom/upload-sprites.gif"
alt="Drag to upload"
style="width: 50% !important;"/>

3. Choosing a sprite from the Kaboom assets library.

<img src="/images/tutorials/kaboom/assets-lib.png"
alt="Choose from assets library"
style="width: 40% !important;"/>

4. Clicking the '+' icon to create a new sprite using the sprite editor.

<img src="/images/tutorials/kaboom/addsprite.png"
alt="Create assets"
style="width: 40% !important;"/>

Once you have created a sprite you can load it into your game by opening your main code file, placing your cursor at the point in your file where you want the sprite to be loaded, and then selecting "Insert load code."

![Insert load code](/images/tutorials/kaboom/insert-load-code.gif)

This should insert a line of code that looks like this:

```javascript
loadPedit("Sample", "sprites/Sample.pedit");
```

Notice the use of `loadPedit` instead of `loadSprite`. With this call in place you should be able to use the component `sprite("Sample")` in your game.

<img src="/images/tutorials/kaboom/loadpedit.png"
alt="Load created assets"
style="width: 80% !important;"/>

(Right now, the sprite editor is not optimized for big sized sprites.)

## Sound Manager

Sound manager is currently just a place similar to sprite manager that lists your sounds. You can drag your sound files here or import them from the asset library and then load them into the game with `loadSound`. A built-in sound/music editor is in the works. 

<img src="/images/tutorials/kaboom/sounds.png"
alt="Load sounds"
style="width: 40% !important;"/>

## Debug

Pressing F1 in the game turns on Kaboom debugging.


## Settings

To configure the game environment such as the size of the game canvas you initialise the [Kaboom context](https://kaboomjs.com/#kaboom) with a configuration object as below:

```javascript
kaboom({
    background: [0, 0, 0],
    width: 320,
    height: 240,
  });
```

As an example this creates a new Kaboom canvas with a black background and also sets the size of the view to 320x240 pixels.

New Kaboom repls default to the latest version. If a newer version comes out after you created the repl, you need to manually select it, unless if you're on the `dev` version, in which case you'll always be on the latest version and breaking changes are possible.

