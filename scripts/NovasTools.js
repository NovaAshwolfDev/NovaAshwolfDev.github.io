// NovasTools.js
import { parse } from "https://esm.sh/jsonc-parser";
/**
 * Used for setting credit's text div
 *
 * **Credits:**
 * [Nova (Made the Utils)](https://github.com/NovaTheFurryDev/)
 * **Web Software Used:**
 * [JavaScript](https://web.dev/javascript)
 * [HTML](https://web.dev/html)
 * [CSS](https://web.dev/css)
 */
export class setElementText {
  /**
   * This is pointless but also fuck you i like making classes and functions - Nova 2024
   * Used for setting credit's element text param
   * @function setElementText(); @param {Element} ElementID @param {String} ElementText @returns void
   */
  constructor(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }
}
/**
 * Image Metadata Grabber Class Using [PNG-Metadata](https://github.com/hometlt/png-metadata) and [ExifR](https://www.npmjs.com/package/exifr)
 * Used mainly for my [Credit System](./Gallery.js)
 *
 *                      Credits:
 *
 * [JavaScript](https://web.dev/javascript)
 * [HTML](https://web.dev/html)
 * [CSS](https://web.dev/css)
 * [PNG-Metadata](https://www.npmjs.com/package/png-metadata)
 * [Exif-R](https://www.npmjs.com/package/exifr)
 * @function getImageMetadata(file);
 * @returns {string} Metadata - Credit Data (Artist & Description)
 */
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
          resolve(metadata); // Resolve with the extracted metadata
          return metadata;
        } catch (error) {
          reject(new Error("Error extracting metadata: " + error));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file); // Read the image file as an ArrayBuffer
    });
  }
}

/**
 * Extended Functionality for Console that adds colorful console messages
 * Credits: **[Shane](https://stackoverflow.com/users/702664/shane) | [Milo](https://github.com/NovaAshwolfDev/)**
 * @class ConsoleEX
 * @constructor ConsoleEX(msg, color)
 * @param {String} msg The Message you want to log.
 * @param {String} color The Color you want the log to be.
 */
export class ConsoleEX {
  constructor(globalColor = false, curColor) {
    this._globalColor = globalColor;
    this.curColor = curColor;
  }
  log(msg, color, method = "log") {
    if (this._globalColor) color = this.curColor;
    if (Array.isArray(color) && color.length === 3)
      color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    else if (typeof color === "object" && color && "r" in color)
      color = `rgb(${color.r}, ${color.g}, ${color.b})`;
    else if (
      typeof color !== "string" ||
      (!color.startsWith("#") && !color.startsWith("rgb"))
    )
      color = "black";
    console[method](`%c${msg}`, `color: ${color}; font-weight: bold;`);
  }

  logColor(msg, color) {
    this.log(msg, color, "log");
  }
  infoColor(msg, color) {
    this.log(msg, color, "info");
  }
  warnColor(msg, color) {
    this.log(msg, color, "warn");
  }
  errorColor(msg, color) {
    this.log(msg, color, "error");
  }
}
export class JSONC {
  constructor() {
    this.cache = new Map();
  }

  async loadJsonc(url) {
    const cached = this.cache.get(url);
    const headers = cached?.etag ? { 'If-None-Match': cached.etag } : {};
    const res = await fetch(url, { headers });

    if (res.status === 304 && cached) return cached.data;

    const text = await res.text();
    const data = parse(text);
    this.cache.set(url, { etag: res.headers.get('ETag'), data });
    return data;
  }
}
export class Time {
  constructor() {
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
    }
  }
}