// Gallery.js
import {
  setElementText,
  ImageMetaGrabber,
  GPTDirReader,
} from "./NovasTools.js";
import {
  NovasPointlessUtils,
  GayElement,
  NovaAudio,
  NovaSprite,
} from "./NovasPointlessUtils.js";
// import "./Main.js";
// Hey it's me Nova! -Nova 2/08/2024 6:10PM
// This is my Gallery Script :3
// Arrays for types and images -ChatGPT 2/08/2024 6:10PM
// I want this to select a random type for the image
// which can be either "VRChat Photos" or "Renders" and probably in the future 2D Art!!
// So now i gotta figure out how to do this...
// Edit: It Works fuck yeahhhhhh!!! :3333
// Edit 2: I added 2D Art and added my friends too

// Arrays for types and images
const Type = ["VRChat Photos", "Renders", "2D Art"];
const Person = [
  "KittySleeper",
  "Amicus",
  "Bam",
  "Crimson",
  "Death Wolf",
  "Haven",
  "ItsLJcool",
  "MTFuture",
  "Nova",
  "Srt",
  "Sword", // Sword ✦ 💠
  "VS Good",
];

// This is really hard to implement so i won't bother for now
// Edit 1: I implemented it - Nova 19/09/2024 5:33PM
const imageMetaGrabber = new ImageMetaGrabber();

// I had an idea that i could just make a new class that let's you select an image type
// and then a character type and then load the images?? - Nova 2024
const Images = {
  "VRChat Photos": [
    "Random1",
    "Random2",
    "Random3",
    "Random4",
    "Random5",
    "Rare1",
    "Rare2",
    "Rare3",
    "Rare4",
    "Rare5",
  ],
  Renders: [
    "Random1",
    "Random2",
    "Random3",
    "Random4",
    "Random5",
    "Rare1",
    "Rare2",
    "Rare3",
    "Rare4",
    "Rare5",
  ],
  "2D Art": Person.reduce((acc, person) => {
    acc[person] = [
      "Random1",
      "Random2",
      "Random3",
      "Random4",
      "Rare1",
      "Rare2",
      "Rare3",
      "Rare4",
    ];
    return acc;
  }, {}),
};

const randomImageElement = document.getElementById("randomImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Precompute random values
let currentTypeIndex = Math.floor(Math.random() * Type.length);
let currentPerson = Person[0];
let currentIndex = 0;

new GayElement(randomImageElement, true);

// Function to update the image
async function updateImage() {
  let imagePath;
  const possibleExtensions = [".png"];
  if (Type[currentTypeIndex] === "2D Art") {
    currentPerson = Person[Math.floor(Math.random() * Person.length)];
    const imagesForPerson = Images["2D Art"][currentPerson];
    currentIndex = Math.floor(Math.random() * imagesForPerson.length);
    imagePath = `./assets/images/Gallery Images/${Type[currentTypeIndex]}/${currentPerson}/${imagesForPerson[currentIndex]}`;
  } else {
    currentIndex = Math.floor(
      Math.random() * Images[Type[currentTypeIndex]].length
    );
    imagePath = `./assets/images/Gallery Images/${Type[currentTypeIndex]}/${
      Images[Type[currentTypeIndex]][currentIndex]
    }`;
  }

  // Try to load multiple extensions in parallel
  const imagePromises = possibleExtensions.map(
    (ext) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(imagePath + ext);
        img.onerror = () => resolve(null);
        img.src = imagePath + ext;
        // Image Meta Credit Shit
        getMeta(img);
      })
  );

  const loadedImagePath = (await Promise.all(imagePromises)).find(
    (path) => path
  );
  if (loadedImagePath) {
    randomImageElement.src = loadedImagePath;
  } else {
    console.info("No valid image found, updating again...");
    updateImage();
  }
}

// Event listeners for buttons
prevButton.addEventListener("click", function () {
  currentIndex =
    (currentIndex - 1 + Images[Type[currentTypeIndex]].length) %
    Images[Type[currentTypeIndex]].length;
  updateImage();
});

nextButton.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % Images[Type[currentTypeIndex]].length;
  updateImage();
});

// Set the initial random image on page load
document.addEventListener("DOMContentLoaded", async function () {
  updateImage();
});
/**
 * **Nova's Image Meta Tool**
 * Used For The Credits System:
 *
 *
 * **Credits:**
 * Utils I Used:
 * [PNG-Metadata](https://github.com/hometlt/png-metadata)
 * [ExifR](https://www.npmjs.com/package/exifr)
 * **My Utils I Made:**
 *      Nova's Tools
 * Nova's Pointless Utils
 *      Gallery
 * These Utils do not have links...
 *        *YET*
 * [JavaScript](https://web.dev/javascript)
 * [HTML](https://web.dev/html)
 * [CSS](https://web.dev/css)
 */
async function getMeta(image) {
  const imageUrl = image.src;
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }
    const blob = await response.blob();
    console.log("Image blob fetched successfully.");

    // Extract metadata using ImageMetaGrabber
    const metadata = await imageMetaGrabber.getImageMetadata(blob);
    const Artist = metadata.Artist;
    const Description = metadata.Description;
    if (Object.keys(metadata).length === 0) {
      console.warn("No metadata found or metadata extraction failed.");
    } else {
      // Example of handling metadata
      const creditText = document.getElementById("creditTxt");
      if (creditText) {
        creditText.textContent = `Artist: ${Artist}\nDescription: ${Description}`;
      }
    }
  } catch (error) {
    console.error("Error processing image:", error);
  }
}
