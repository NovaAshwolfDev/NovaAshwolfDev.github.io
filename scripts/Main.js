// Main.js
import {
  NovasPointlessUtils,
  GayElement,
  NovaAudio,
  NovaSprite,
} from "./NovasPointlessUtils.js";
import { ConsoleEX, NovaKeys } from "./NovasTools.js";
// Import the Sprite type definition
// import { WebSprite } from './Testing.ts';

// /**
//  *                       The Main Website Script
//  *               idk what I will do with this just yet...
//  *
//  *                        **Credits:**
//  *                     **My Utils I Made:**
//  *                          Nova's Tools
//  *                     Nova's Pointless Utils
//  *                          Gallery
//  *                     These do not have links
//  *                            *YET*
//  *
//  *                 **Web Software Used:**
//  *                 [JavaScript](https://web.dev/javascript)
//  *                 [HTML](https://web.dev/html)
//  *                 [CSS](https://web.dev/css)
//  */
// export class Main {
//   constructor() {
//     // I don't know
//     return "Not Implemented Yet!!";
//   }
// }

// Initialize your canvas and sprite
let isRunning = true;
const canvas = document.getElementById("AboutCanvas");
// const context = canvas.getContext("2d");
let testSpr = new NovaSprite(
  100,
  100,
  100,
  100,
  "./assets/images/Gallery Images/Renders/Random2.png"
);
let audio = new NovaAudio(
  "/assets/music/Freaking Out Alone V2.mp3",
  0,
  false,
  true
);
let novaKeys = new NovaKeys(); // Instantiate NovaKeys
let consoleEX = new ConsoleEX(false, null);
// let spr = new WebSprite(0, 0, 32, 32, "/assets/images/Gallery Images/Renders/Random1.png");
// spr.
// spr.image.src = "/assets/images/Gallery Images/Renders/Random1.png";

// Load the sprite image
testSpr
  .loadImage("/assets/images/Gallery Images/Renders/Random1.png")
  .then(() => {
    consoleEX.logColor(`Sprite Source: ${testSpr.src}`, "yellow");
    // context.clearRect(0, 0, canvas.width, canvas.height);
    window.onload = () => {
      //   testSpr._canvas = context;
      //   testSpr.draw(context);
      //   testSpr.draw(context, 0, 0)
      //   canvas.style.position = "relative";
      //   canvas.style.left = "-300px";
      //   canvas.style.top = "-0px";
    };
    startLoop(); // Start the update loop after the image is loaded
  })
  .catch((err) => {
    console.error("Error loading the sprite image:", err);
  });

// The update loop function
function update() {
  if (isRunning) {
    let body = new GayElement("body", true);
    document.addEventListener("keydown", async function (event) {
      if (event.key.toLowerCase() === "p") {
        // Check if the 'P' key is pressed (case-insensitive)
        console.log("Loop started");
      }
      if (event.key.toLowerCase() === "b") {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // testSpr.drawImage(context)
        // testSpr.setPos(100, 100)
        // stopLoop();
        // console.log(`Loop stopped`);
      }
      if (event.key.toLowerCase() === "h") {
        audio.play(false, 1);
        console.log(`Audio Volume ${audio._audioElement.volume}`);
      } else if (event.key === "l") {
        audio._audioElement.volume = 0;
        console.log(`Audio Volume ${audio._audioElement.volume}`);
      } else if (event.key === "t") {
        audio._audioElement.volume = 1;
      }
    });
    // setTimeout(console.log(`Audio Volume ${audio.volume}`), 0.00001);
    // Request the next animation frame
    requestAnimationFrame(update);
    // console.log(`Audio Position ${Number(audio._audioElement.currentTime)}`);
    // setTimeout(stopLoop, 8);
    // console.log(`Current Audio Volume: ${audio.volume}`);
    // setTimeout(requestAnimationFrame(update), 0.001);
  }
}

// Start the update loop
function startLoop() {
  requestAnimationFrame(update);
}

// Stop the loop
function stopLoop() {
  isRunning = false;
  console.info("Loop stopped");
}
