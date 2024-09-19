// NovasTools.js

export class setElementText {
// This is pointless but also fuck you i like making classes and functions - Nova 2024
    constructor(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
}
// test
import exifr from './node_modules/exifr/dist/full.esm.js';

export class ImageMetaGrabber {
    constructor() {
        // Initialize any properties if needed
    }

    // Method to read metadata from an image file
    async getImageMetadata(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result;

                try {
                    // Use exifr to parse metadata regardless of file type
                    const metadata = await exifr.parse(arrayBuffer);
                    resolve(metadata);  // Resolve with the extracted metadata
                } catch (error) {
                    reject(new Error("Error extracting metadata: " + error));
                }
            };

            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsArrayBuffer(file);  // Read the image file as an ArrayBuffer
        });
    }
}


export class GPTDirReader {
    constructor(inputElementId, outputElementId) {
        this.inputElement = document.getElementById(inputElementId);
        this.outputElement = document.getElementById(outputElementId);

        if (this.inputElement) {
            this.inputElement.addEventListener('change', this.handleFileSelect.bind(this));
        }
    }

    handleFileSelect(event) {
        const files = event.target.files;
        const folderNames = new Set();

        for (const file of files) {
            const folderPath = file.webkitRelativePath.split('/').slice(0, -1).join('/');
            folderNames.add(folderPath);
        }

        this.displayFolders(folderNames);
    }

    displayFolders(folderNames) {
        if (this.outputElement) {
            this.outputElement.innerHTML = ''; // Clear previous list

            folderNames.forEach(folder => {
                const listItem = document.createElement('li');
                listItem.textContent = folder;
                this.outputElement.appendChild(listItem);
            });
        }
    }
}