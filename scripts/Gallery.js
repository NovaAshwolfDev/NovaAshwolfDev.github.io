// Arrays for type of image to display and actual image to display
const Type = ['VRChat Photos', 'Renders', '2D Art'];
const Person = ['504Brandon', 'Bam', 'Function Silly', 'ItsLJcool', 'Nova', 'Haven'];

// Images array for different types
const Images = {
    'VRChat Photos': [
        'Random1.png',
        'Random2.png',
        'Random3.png',
        'Random4.png',
        'Random5.png',
        'Random6.png',
        'Random7.png',
        'Random8.png',
        'Random9.png',
    ],
    'Renders': [
        'Rare1.png',
        'Rare2.png',
        'Rare3.png',
        'Rare4.png',
        'Rare5.png',
        'Rare6.png',
        'Rare7.png',
        'Rare8.png',
        'Rare9.png',
    ],
    '2D Art': Person.reduce((acc, person) => {
        acc[person] = [
            'Art1.png',  // Example images, adjust as needed
            'Art2.png',
            'Art3.png'
        ];
        return acc;
    }, {})
};

let currentIndex = Math.floor(Math.random() * Images[Type[0]].length);
let currentTypeIndex = Math.floor(Math.random() * Type.length);
let currentPerson = Person[0];  // Default to the first person

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

    if (Type[currentTypeIndex] === '2D Art') {
        imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${currentPerson}/${Images[Type[currentTypeIndex]][currentIndex]}`;
    } else {
        imagePath = `./images/Gallery Images/${Type[currentTypeIndex]}/${Images[Type[currentTypeIndex]][currentIndex]}`;
    }

    checkImageExists(imagePath, function(exists) {
        if (exists) {
            document.getElementById('randomImage').src = imagePath;
        } else {
            // Pick another image if the current one doesn't exist
            console.error(imagePath + " Doesn't Exist Selecting Another Image!! - Nova 2024");
            currentIndex = Math.floor(Math.random() * Images[Type[currentTypeIndex]].length);
            currentTypeIndex = Math.floor(Math.random() * Type.length);
            if (Type[currentTypeIndex] === '2D Art') {
                currentPerson = Person[Math.floor(Math.random() * Person.length)];
            }
            updateImage();
        }
    });
}

// Event listeners for buttons
document.getElementById('prevButton').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + Images[Type[currentTypeIndex]].length) % Images[Type[currentTypeIndex]].length;
    updateImage();
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % Images[Type[currentTypeIndex]].length;
    updateImage();
});

// Set the initial random image on page load
document.addEventListener("DOMContentLoaded", function() {
    updateImage();
});
