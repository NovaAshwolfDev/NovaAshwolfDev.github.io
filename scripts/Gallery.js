// Gallery.js
import {
  setElementText,
  ImageMetaGrabber,
  GPTDirReader,
} from "./NovasTools.js";

// import ImageInfo from "./ImageInfo.js";
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
  "404 Galaxy",
  "504Brandon",
  "Bam",
  "Crimson",
  "Function Silly",
  "Haven",
  "ItsLJcool",
  "MTFuture",
  "Nova",
  "Srt",
  "VS Good",
];

// This is really hard to implement so i won't bother for now
const creditMeta = "Test";

const Images = {
  "VRChat Photos": [
    "Random1", "Random2", "Random3", "Random4", "Random5",
    "Rare1", "Rare2", "Rare3", "Rare4", "Rare5"
  ],
  Renders: [
    "Random1", "Random2", "Random3", "Random4", "Random5",
    "Rare1", "Rare2", "Rare3", "Rare4", "Rare5"
  ],
  "2D Art": Person.reduce((acc, person) => {
    acc[person] = [
      "Random1", "Random2", "Random3", "Random4",
      "Rare1", "Rare2", "Rare3", "Rare4"
    ];
    return acc;
  }, {}),
};

// Cache DOM elements
const randomImageElement = document.getElementById("randomImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Precompute random values
let currentTypeIndex = Math.floor(Math.random() * Type.length);
let currentPerson = Person[0];
let currentIndex = 0;

// Function to update the image
async function updateImage() {
  let imagePath;
  const possibleExtensions = [".png"];
  
  if (Type[currentTypeIndex] === "2D Art") {
    currentPerson = Person[Math.floor(Math.random() * Person.length)];
    const imagesForPerson = Images["2D Art"][currentPerson];
    currentIndex = Math.floor(Math.random() * imagesForPerson.length);
    imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${currentPerson}/${imagesForPerson[currentIndex]}`;
  } else {
    currentIndex = Math.floor(Math.random() * Images[Type[currentTypeIndex]].length);
    imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${Images[Type[currentTypeIndex]][currentIndex]}`;
  }

  // Try to load multiple extensions in parallel
  const imagePromises = possibleExtensions.map(ext => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(imagePath + ext);
    img.onerror = () => resolve(null);
    img.src = imagePath + ext;
  }));

  const loadedImagePath = (await Promise.all(imagePromises)).find(path => path);
  if (loadedImagePath) {
    randomImageElement.src = loadedImagePath;
  } else {
    console.info("No valid image found, updating again...");
    updateImage();
  }
}

// Event listeners for buttons
prevButton.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + Images[Type[currentTypeIndex]].length) % Images[Type[currentTypeIndex]].length;
  updateImage();
});

nextButton.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % Images[Type[currentTypeIndex]].length;
  updateImage();
});

// Set the initial random image on page load
document.addEventListener("DOMContentLoaded", function () {
  updateImage();
});

// Image Meta Credit Shit
// document.getElementById("randomImage").addEventListener("load", async (event) => {
//         var imageinfo = require('imageinfo'),
//     	fs = require('fs');

//     fs.readFile('testimage', function(err, data) {
//     	if (err) throw err;

//     	info = imageinfo(data);
//     	console.log("Data is type:", info.mimeType);
//     	console.log("  Size:", data.length, "bytes");
//     	console.log("  Dimensions:", info.width, "x", info.height);
//     });
// });

