// NovasPointlessUtils.js
import { NovaKeys, ConsoleEX } from "./NovasTools.js";
const consoleEx = new ConsoleEX(false, null);
/**
 * My Script for Stuff that i make when i'm bored
 * Made by [Me](https://github.com/NovaTheFurryDev/)
 * who else would make this...
 * @param {*} text
 * @returns
 */
export class NovasPointlessUtils {
  /**
   * Gay Text... >:3
   * @param {*} text
   * @returns
   */
  constructor(text) {
    return console.info(text + "Your Text is now **GAY >:3**");
    console.log("Your Text is now **GAY >:3**");
  }
}
export class GayElement {
  constructor(elementID, BodyGay = false) {
    if (BodyGay) {
      const body = document.getElementById("body");
      console.log("The Body & HTML Is now **GAY >:3**");
    } else {
      const element = document.getElementById(elementID); // Get the target element by ID
    }
    if (element) {
      element.classList.add("animated-div"); // Add the animation class
      body.classList.add("animated-body"); // Add the
    }
    return elementID;
    console.log(elementID + "Is now **GAY :3**");
  }
}
/**
 * --------------------------------------------
 * ### @extends Audio
 * ### NovaAudio is a Class to extend and improve the functionality of the [Audio Class](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio) in [JavaScript](https://web.dev/javascript).
 * -------------------------------------------
 * ### Credits:
 * - [Nova](https://github.com/NovaTheFurryDev/)
 * - **Software Used:**
 *   - [JavaScript](https://web.dev/javascript)
 *   - [HTML](https://web.dev/html)
 *   - [CSS](https://web.dev/css)
 * --------------------------------------------
 * ### Variables:
 * ----------------------------------------------
 * @var {Number} volume The current volume of the active Audio Player.
 * @var {Boolean} loop Checks if the current song should loop or not.
 * @var {Boolean} autoLoad Indicates whether the audio should automatically play when loaded.
 * @var {String} src The source URL of the audio file.
 * @var {HTMLAudioElement} audioElement The audio element that plays the sound.
 * @var {Boolean} isPlaying Returns true if the audio is currently playing
 *
 * ## Functions:
 * ----------------------------------------------------------------
 * ### loadAudio:
 * @function loadAudio(src, audioElement)
 * @param {String} src The source URL of the audio file to be loaded.
 * @param {Audio} audioElement The Audio element that will play the audio.
 * @returns {Promise<HTMLAudioElement>} Returns the audio element after loading the audio file.
 *
 * ### playAudio:
 * @function playAudio(loop, volume)
 * @param {Boolean} loop Indicates whether to loop the audio playback.
 * @param {Number} volume The volume level to set for playback (between 0.0 and 1.0).
 * @returns {Promise<HTMLAudioElement>} Returns the audio element being played.
 *
 * ### checkLoadState:
 * @function #checkLoadState() Checks the loading state of the audio and logs it to the console.
 * @returns {String} Returns the loading state of the audio (either "On" or "Off").
 *
 * ### checkAudioState:
 * @function #checkAudioState() Placeholder function to check the audio state.
 */
export class NovaAudio extends Audio {
  constructor(src = "", volume = 1, loop = true, autoLoad = false) {
    super("NovaAudio");
    this.volume = volume;
    this.loop = null;
    this.autoLoad = autoLoad; // Initialize autoLoad
    this.src = src; // Set the audio source URL
    this._isPlaying = false; // Track if the audio is playing
    this._enabled = true; // Track if the audio is enabled
    this._audioElement = new Audio(); // Initialize the audio element

    if (src != null) {
      this.volume = volume;
      this.#checkLoadState(); // Check load state
      this._audioElement.loop = loop; // Set looping

      if (this.autoLoad) {
        this.loadAudio(src); // Load audio automatically if autoLoad is true
      }
    } else {
      console.error("Audio Source Is Null!");
    }
  }

  async loadAudio(src, audioElement = new Audio()) {
    try {
      audioElement.src = src;
      await audioElement.load();
      this._audioElement = audioElement;
      this._audioElement.volume = 0;
      return audioElement;
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }

  async play(loop = false, volume) {
    this.volume = volume; // Store the volume value
    this._audioElement.volume = this.volume; // Adjust the audio element's volume

    if (this._audioElement.paused) {
      await this._audioElement.play(); // Play the audio
      this._isPlaying = true; // Update isPlaying status
      consoleEx.infoColor("Audio Playing!", "green");
    } else {
      this._isPlaying = false; // Update isPlaying status
    }

    this._audioElement.loop = loop; // Set looping
    this._isPlaying = true; // Update isPlaying status
    return this._audioElement; // Return the audio element
  }

  pause() {
    this._isPlaying = false; // Update isPlaying status
    this._audioElement.pause(); // Pause the audio
    consoleEx.infoColor("Audio Paused!", "red");
  }

  togglePlayPause() {
    if (this._isPlaying) {
      this.pause(); // If currently playing, pause
    } else {
      this.play(this.loop, this.volume); // If not playing, play
    }
  }

  #checkLoadState() {
    this._color = this.autoLoad ? "green" : "red";
    const loadState = this.autoLoad ? "On" : "Off";

    // Load the audio when checking the load state
    this.loadAudio(this.src); // Load audio here

    consoleEx.logColor(`Auto Load Is Currently: ${loadState}`, this._color);

    return loadState;
  }
  addVolume(volume) {
    this.volume = volume;
    // Ensure the volume stays within the range of 0.0 to 1.0
    // this.volume = Math.min(Math.max(this.volume, 0.0), 1.0);
    return this.volume;
  }
  /* 
  NovasPointlessUtils.js:154
  Uncaught (in promise) DOMException: Index or size is negative or greater than the allowed amount
      addVolume http://localhost:621/scripts/NovasPointlessUtils.js:154
      update http://localhost:621/scripts/Main.js:96
      update http://localhost:621/scripts/Main.js:80
      update http://localhost:621/scripts/Main.js:102
  */
}

/**
 * @extends Image
 * NovaSprite is a Class to extend and improve the Functionality
 * of the [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) Class in [JavaScript](https://web.dev/javascript)
 * Credits:
 * [Nova](https://github.com/NovaTheFurryDev/)
 * [Image Class](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
 *
 * @var {Array} _clipRect Stores the Rect data for the ClipRect used for Animation's
 * @var {Number} _frameRate Stores the current Animation Frame Rate (Defaults to 24 FPS)
 * @var {String} _sprAnim Stores the Animation Name
 * @var {Boolean} visible Stores the current visiblity option
 * @var {Number} zAxis Stores the current Z Axis of the Sprite on the Canvas
 */
export class NovaSprite extends Image {
  constructor(x, y, imgWidth, imgHeight, imgBitmap, autoLoad = false) {
    super("New Nova Sprite Created"); // Call the parent constructor
    // Setting Variables
    this._clipRect =
      this._sprAnim =
      this.visible =
      this.zAxis =
      this._canvas =
      this._frameRate =
      this._imageData =
        null;
    this._width = imgWidth;
    this._height = imgHeight;
    this._clipRect = [{ x: 0, y: 0, w: 0, h: 0 }];
    this._frameRate = 24;
    this.image = imgBitmap;
    console.log(`NovaSprite is Real Chat \nCurrent Element:`, this);
    console.log(this._clipRect.x);
    // this.loadImage(imgBitmap);
  }
  /**
   * Loads the Given Image File and Renders it on the current [Canvas](https://www.w3schools.com/html/html5_canvas.asp)
   * @function loadImage();
   * @param {*} imageSrc
   * @returns this
   */
  async loadImage(imageSrc) {
    console.log("Loading image from:", imageSrc); // Log the source
    return new Promise((resolve, reject) => {
      this.onload = () => {
        console.log("Image loaded successfully:", this); // Log the image object

        // Check if the image has valid dimensions
        if (this._width > 0 && this._height > 0) {
          console.log("Valid image dimensions:", this._width, this._height);
          resolve(this); // Resolve only if dimensions are valid
        } else {
          console.error(
            "Loaded image has invalid dimensions:",
            this._width,
            this._height
          );
          reject("Image has invalid dimensions.");
        }
      };

      this.onerror = (error) => {
        console.error("Error loading image:", error);
        reject(error);
      };

      if (imageSrc == null) {
        console.error("Image Source Is Null Check Path Or Usage!!");
        reject("Image source is null.");
      } else {
        this.src = imageSrc; // Load the image
        console.log("Image source set to:", this.src); // Log the source set
      }
    });
  }

  async drawImage(context, x, y) {
    // this._canvas = context;
    if (this._clipRect) {
      const [x, y, w, h] = this._clipRect; // Destructure clipRect
      context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      context.drawImage(this, x, y, w, h); // Draw the image on the canvas
    } else {
      context.drawImage(this, x, y); // Draw the whole image if no clipping
    }
  }
  async setClipRect(x, y, w, h) {
    this._clipRect = [x, y, w, h]; // Store values in an array
    console.log(this._clipRect);
    return this._clipRect; // Return the updated value
  }
  async getClipRect() {
    return this._clipRect; // Return the current value
  }
  /**
   * Loads the Given Animation
   * @param {String} animationName
   * @param {Number} frameRate
   * @returns NovaSprite
   */
  async loadAnim(animationName, frameRate) {
    console.log("Test:", animationName);
    console.log("Loading:", this.load);
    // Gotta find a way to do this...
    this._frameRate = frameRate;
    // Current Image Element ??
    return (this._sprAnim = animationName);
  }
  async getAnim() {
    return this._sprAnim;
  }
  /**
   * Draws the current NovaSprite instance on the canvas at the specified position.
   * @param {CanvasRenderingContext2D} context - The drawing context of the canvas
   * @param {number} x - The x-coordinate where the image should be drawn
   * @param {number} y - The y-coordinate where the image should be drawn
   * @returns {Promise<void>} - A promise that resolves when the image is drawn
   */
  async draw(parentSelector, x, y) {
    return new Promise((resolve, reject) => {
      if (!this.src) {
        console.error("No image source set.");
        reject("No image source set.");
        return;
      }

      const imgElement = document.createElement("img");
      this._imageData = imgElement;
      imgElement.src = this.src; // Set the image source

      imgElement.onload = () => {
        console.log("Image added to DOM successfully:", imgElement);
        // document.getElementById(parentSelector).appendChild(imgElement);
        // document.querySelector(parentSelector).appendChild(imgElement); // Append to the specified parent
        parentSelector.drawImage(imgElement, x, y)
        resolve(imgElement);
      };

      imgElement.onerror = (error) => {
        console.error("Error adding image to DOM:", error);
        reject(error);
      };

      if (this.complete) {
        // If the image is already loaded
        parentSelector.drawImage(imgElement, x, y)
        resolve(imgElement);
      }
    });
  }

    // Getter for x
    get x() {
        return this._x;
    }

    // Setter for x
    set x(value) {
        this._x = value;
    }

    // Getter for y
    get y() {
        return this._y;
    }

    // Setter for y
    set y(value) {
        this._y = value;
    }

    // Method to set position
    setPos(x, y) {
        this.x = x; // This will now work
        this.y = y; // This will now work
    }

  setScale(w, h) {
    this._w = w;
    this._h = h;
  }
}
