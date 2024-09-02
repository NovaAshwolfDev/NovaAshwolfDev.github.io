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
const Type = ["VRChat Photos", "Renders", "2D Art"];
const Person = [
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

// Images array for different types of Images/Art
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

let currentTypeIndex = Math.floor(Math.random() * Type.length);
let currentPerson = Person[0]; // Default to the first person
let currentIndex = 0; // Default index value

// Function to check if an image exists
function checkImageExists(src, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = src;
}
// Function to update image based on index
function updateImage() {
  let imagePath;
  const possibleExtensions = [".png", ".gif", ".webp"]; // List of supported extensions
  const currentExtension =
    possibleExtensions[Math.floor(Math.random() * possibleExtensions.length)];

  if (Type[currentTypeIndex] === "2D Art") {
    currentPerson = Person[Math.floor(Math.random() * Person.length)];
    const imagesForPerson = Images["2D Art"][currentPerson];

    // Ensure the currentIndex is within the bounds of the person's images
    currentIndex = Math.floor(Math.random() * imagesForPerson.length);
    // TODO: Use the "GPTDirReader" For the "2D Art" Folder
    imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${currentPerson}/${imagesForPerson[currentIndex]}`;
  } else {
    currentIndex = Math.floor(
      Math.random() * Images[Type[currentTypeIndex]].length
    );
    imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${
      Images[Type[currentTypeIndex]][currentIndex]
    }`;
  }

  // Try each extension until an existing image is found
  async function tryExtensions(index) {
    if (index >= possibleExtensions.length) {
    //   console.error(
    //     "All possible image extensions checked, no valid image found."
    //   );
    //   console.info("Running Update Image Again...");
      return updateImage();
    }

    const fullPath = imagePath + possibleExtensions[index];
    // console.log("Attempting to load image at path: ", fullPath);  // Log image path for debugging

    checkImageExists(fullPath, function (exists) {
      if (exists) {
        document.getElementById("randomImage").src = fullPath;
      } else {
        // console.warn(fullPath + " Doesn't Exist. Trying next extension...");
        tryExtensions(index + 1); // Try the next extension
      }
    });
  }

  return tryExtensions(0); // Start checking with the first extension
}

// Event listeners for buttons
document.getElementById("prevButton").addEventListener("click", function () {
  currentIndex =
    (currentIndex - 1 + Images[Type[currentTypeIndex]].length) %
    Images[Type[currentTypeIndex]].length;
  updateImage();
});

document.getElementById("nextButton").addEventListener("click", function () {
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

