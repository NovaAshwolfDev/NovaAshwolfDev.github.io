// NovasTools.js
import exifr from "./node_modules/exifr/dist/full.esm.js";

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
 * Scrapped Directory Reader by ChatGPT (eww stinky)...
 * I will probably reuse this at some point... - Nova 2024
 * @function new() @param {Object} idIn  @param {Object} idOut
 */
export class GPTDirReader {
  constructor(inputElementId, outputElementId) {
    this.inputElement = document.getElementById(inputElementId);
    this.outputElement = document.getElementById(outputElementId);

    if (this.inputElement) {
      this.inputElement.addEventListener(
        "change",
        this.handleFileSelect.bind(this)
      );
    }
  }

  handleFileSelect(event) {
    const files = event.target.files;
    const folderNames = new Set();

    for (const file of files) {
      const folderPath = file.webkitRelativePath
        .split("/")
        .slice(0, -1)
        .join("/");
      folderNames.add(folderPath);
    }

    this.displayFolders(folderNames);
  }

  displayFolders(folderNames) {
    if (this.outputElement) {
      this.outputElement.innerHTML = ""; // Clear previous list

      folderNames.forEach((folder) => {
        const listItem = document.createElement("li");
        listItem.textContent = folder;
        this.outputElement.appendChild(listItem);
      });
    }
  }
}
// Scrapped / Unused since it doesn't work??
export default class FolderDirNames {
  constructor() {
    // Initialization, if needed
  }

  async listDirectories() {
    try {
      // Open a directory picker
      const directoryHandle = await window.showDirectoryPicker();
      const directories = [];

      // Iterate through the directory's entries
      for await (const [name, handle] of directoryHandle.entries()) {
        if (handle.kind === "directory") {
          directories.push(name);
        }
      }

      return directories;
    } catch (error) {
      console.error("Error reading directories:", error);
      throw error;
    }
  }
}
export class NovaKeys {
  async checkKey(e) {
    var keynum;

    if (window.event) {
      // IE
      keynum = e.keyCode;
    } else if (e.which) {
      // Netscape/Firefox/Opera
      keynum = e.which;
    }
    let key = String.fromCharCode(keynum);
    console.log(`Key ${key} Has Been Pressed!`);
    return key;
  }
}

export class DiscordPFP {
  constructor(clientId, redirectUri, scope = "identify") {
    this.clientId = clientId; // Your Discord application's client ID
    this.redirectUri = redirectUri; // The URI where users will be redirected after authentication
    this.scope = scope; // Scopes for the data you want to access (e.g., "identify" for basic profile info)
  }

  // Step 1: Redirect to Discord's OAuth2 authorization URL
  redirectToDiscordAuth() {
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=${this.scope}`;
    window.location.href = authUrl; // Redirect the user to Discord for authorization
  }

  // Step 2: Handle the callback after user authorization
  async handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Get the authorization code from the URL

    if (code) {
      const token = await this.exchangeCodeForToken(code); // Exchange code for token
      if (token) {
        await this.fetchAvatar(token); // Fetch the avatar with the access token
      }
    }
  }

  // Step 3: Exchange authorization code for an access token
  async exchangeCodeForToken(code) {
    const tokenUrl = "https://discord.com/api/v10/oauth2/token";
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: "YOUR_CLIENT_SECRET", // Replace with your client secret
      code: code,
      grant_type: "authorization_code",
      redirect_uri: this.redirectUri,
      scope: this.scope,
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }

      const data = await response.json();
      return data.access_token; // Return the access token
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      alert("Failed to authenticate with Discord.");
    }
  }

  // Step 4: Fetch user data (including avatar) using the access token
  async fetchAvatar(token) {
    try {
      const response = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=256`;

      // Apply it to the image element (make sure there's an element with id="avatar" in your HTML)
      document.getElementById('avatar').src = avatarUrl;
    } catch (error) {
      console.error("Error fetching avatar:", error);
      alert("Failed to fetch avatar.");
    }
  }
}

/**
 * Extended Functionality for Console that adds colorful console messages
 * Credits: **[Shane](https://stackoverflow.com/users/702664/shane) | [Nova](https://github.com/NovaTheFurryDev/)**
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

    log(msg, color, method) {
        if (this._globalColor) color = this.curColor;
        console[method](`%c${msg}`, `color: ${color}; font-weight: bold;`);
    }

    logColor(msg, color) { this.log(msg, color, 'log'); }
    infoColor(msg, color) { this.log(msg, color, 'info'); }
    warnColor(msg, color) { this.log(msg, color, 'warn'); }
    errorColor(msg, color) { this.log(msg, color, 'error'); }
}
