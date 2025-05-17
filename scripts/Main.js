// Main.js
import {
  NovasPointlessUtils,
  GayElement,
  NovaAudio,
  NovaSprite,
} from "./NovasPointlessUtils.js";
import { ConsoleEX, NovaKeys, JSONC } from "./NovasTools.js";
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

let isRunning = true;
let consoleEX = new ConsoleEX(false, null);
let jsonc = new JSONC();
const cacheKey = "profileData";
const cached = localStorage.getItem(cacheKey);

  let randNum = Math.floor(Math.random() * 10) + 1; 
  let secret = "false";
  consoleEX.log(randNum, "green", "log");
  if (randNum == 1 && secret != "false") {
    document.getElementById("profile-pic").src = "https://raw.githubusercontent.com/NovaAshwolfDev/NovaAshwolfDev.github.io/refs/heads/main/assets/images/Gallery%20Images/2D%20Art/ItsLJcool/Rare1.png"
    document.getElementById("DisplayName").textContent = "ItsLJcool";
    document.getElementById("Description").textContent = `👋 I’m ItsLJcool!
I want to be a game designer / programmer.

Officially in College!!
I will no longer take DM questions about flixel.

AD(h)D person, so my brain goes amen break sometimes`
    document.body.style.backgroundImage = "https://raw.githubusercontent.com/NovaAshwolfDev/NovaAshwolfDev.github.io/refs/heads/main/assets/images/Gallery%20Images/2D%20Art/ItsLJcool/Rare1.png"
    document.body.style.backgroundRepeat = "repeat"
  }else{
  jsonc.loadJsonc("https://raw.githubusercontent.com/NovaAshwolfDev/Secret-Repo/refs/heads/main/image-config.jsonc")
  .then((data) => {
      document.getElementById("profile-pic").src = data.profile_picture })
  }
let audio = new NovaAudio(
  "/assets/music/Freaking Out Alone V2.mp3",
  0,
  false,
  true
);

function update() {
  if (isRunning) {
    document.addEventListener("keydown", async function (event) {
      if (event.key.toLowerCase() === "h") {
        audio.play(false, 1);
        console.log(`Audio Volume ${audio._audioElement.volume}`);
      } else if (event.key === "l") {
        consoleEX.log("Testing Logging", "255, 128, 0", "log");
        audio._audioElement.volume = 0;
        console.log(`Audio Volume ${audio._audioElement.volume}`);
      } else if (event.key === "t") {
        audio._audioElement.volume = 1;
      }
    });
    requestAnimationFrame(update);
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
