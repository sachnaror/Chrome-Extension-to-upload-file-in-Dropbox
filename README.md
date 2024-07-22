# Chrome Extension to upload file in Dropbox and get sharable link



## Overview

This guide explains how to set up and use a Chrome extension to upload files to Dropbox, create folders, and generate shareable links. The extension uses Dropbox's API and requires proper configuration and permissions to work.

## Prerequisites

1. **Dropbox Account:** Ensure you have a Dropbox account.
2. **Dropbox App:** Create a Dropbox app to get an access token.

## Setting Up the Dropbox App

1. **Create a Dropbox App:**
   - Go to the [Dropbox App Console](https://www.dropbox.com/developers/apps).
   - Click "Create App."
   - Select "Scoped Access."
   - Choose "Full access" and name your app.
   - Click "Create App."

2. **Configure App Permissions:**
   - In the app settings, go to the "Permissions" section.
   - Ensure the following scopes are checked:
     - `files.content.write`
     - `files.metadata.write`
     - `sharing.write`

3. **Generate Access Token:**
   - In the "OAuth 2" section of the app settings, click "Generate" to create a new access token.
   - Note down the generated token.

## Code Setup

### `popup.js`

This script handles the user interface, file selection, and sending messages to the background script.

### `background.js`

This script handles the communication with Dropbox API for creating folders, uploading files, and generating shared links. It includes error handling for debugging.


## Testing

1. **Load the Extension:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode."
   - Click "Load unpacked" and select the directory containing your extension files.

2. **Test the Functionality:**
   - Click on the extension icon.
   - Select a file and click "Upload."
   - Check the console for error messages if the folder creation or file upload fails.

## Troubleshooting

- **Missing Scopes:** If you encounter a `missing_scope` error, ensure that the token has the correct scopes in the Dropbox App Console and generate a new one.
- **Invalid JSON:** Check the API response in the console logs to ensure that the response is properly formatted.

## Conclusion

This guide helps you set up a Chrome extension for Dropbox file uploads. Ensure the access token has the necessary scopes and debug using the provided error handling and logging techniques.
