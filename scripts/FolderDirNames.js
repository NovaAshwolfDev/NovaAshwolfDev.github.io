// FolderDirNames.js
// Scrapped
// export default class FolderDirNames {
//     constructor() {
//         // Initialization, if needed
//     }

//     async listDirectories() {
//         try {
//             // Open a directory picker
//             const directoryHandle = await window.showDirectoryPicker();
//             const directories = [];

//             // Iterate through the directory's entries
//             for await (const [name, handle] of directoryHandle.entries()) {
//                 if (handle.kind === 'directory') {
//                     directories.push(name);
//                 }
//             }

//             return directories;
//         } catch (error) {
//             console.error('Error reading directories:', error);
//             throw error;
//         }
//     }
// }