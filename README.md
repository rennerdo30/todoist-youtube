# YouTube to Todoist Chrome Extension

This Chrome extension allows you to add the current YouTube video to your Todoist to-do list with the video title and duration. The extension uses a context menu for easy access.

## Features

- Adds the current YouTube video to your Todoist to-do list.
- Sets the task title to the video title.
- Sets the task duration to the length of the video.
- Allows you to configure your Todoist API token through an options page.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top-right corner.
4. Click "Load unpacked" and select the directory where you downloaded or cloned this repository.

## Usage

1. Navigate to a YouTube video page.
2. Right-click on the page and select "Add YouTube video to Todoist" from the context menu.
3. The video title and duration will be added to your Todoist to-do list.

## Configuration

1. Click on the extension icon in the Chrome toolbar and select "Options" to open the options page.
2. Enter your Todoist API token and click "Save".

## Files

- `manifest.json`: Defines the extension's configuration and permissions.
- `background.js`: Contains the background script to handle context menu interactions and Todoist API requests.
- `options.html`: Provides the UI for the options page where you can set your Todoist API token.
- `options.js`: Handles saving and retrieving the Todoist API token.
- `README.md`: This readme file.

## Code

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "YouTube to Todoist",
  "version": "1.0",
  "description": "Add the current YouTube video to Todoist as a task.",
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "contextMenus",
    "identity",
    "identity.email"
  ],
  "host_permissions": [
    "https://api.todoist.com/"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "options_page": "options.html"
}
