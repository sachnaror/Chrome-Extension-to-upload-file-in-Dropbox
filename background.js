chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'uploadFile') {
    const { file, folderName, fileName, dropboxToken } = request.data;

    // Create folder in Dropbox
    fetch('https://api.dropboxapi.com/2/files/create_folder_v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/${folderName}`,
        autorename: false
      })
    })
      .then(response => {
        console.log('Create folder response status:', response.status);
        console.log('Create folder response headers:', [...response.headers]);

        return response.text().then(text => {
          console.log('Create folder response text:', text);
          if (response.ok) {
            return JSON.parse(text);
          } else {
            throw new Error(`Error creating folder: ${text}`);
          }
        });
      })
      .then(folderData => {
        if (!folderData.metadata) {
          throw new Error('No metadata returned');
        }
        // Upload file to the created folder
        return fetch('https://content.dropboxapi.com/2/files/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${dropboxToken}`,
            'Dropbox-API-Arg': JSON.stringify({
              path: `/${folderName}/${fileName}`,
              mode: 'add',
              autorename: true,
              mute: false
            }),
            'Content-Type': 'application/octet-stream'
          },
          body: file
        });
      })
      .then(response => {
        console.log('Upload file response status:', response.status);
        console.log('Upload file response headers:', [...response.headers]);

        return response.text().then(text => {
          console.log('Upload file response text:', text);
          if (response.ok) {
            return JSON.parse(text);
          } else {
            throw new Error(`Error uploading file: ${text}`);
          }
        });
      })
      .then(uploadData => {
        if (!uploadData.path_lower) {
          throw new Error('No path_lower returned');
        }
        // Get shared link
        return fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${dropboxToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            path: uploadData.path_lower
          })
        });
      })
      .then(response => {
        console.log('Create shared link response status:', response.status);
        console.log('Create shared link response headers:', [...response.headers]);

        return response.text().then(text => {
          console.log('Create shared link response text:', text);
          if (response.ok) {
            return JSON.parse(text);
          } else {
            throw new Error(`Error creating shared link: ${text}`);
          }
        });
      })
      .then(sharedLinkData => {
        if (!sharedLinkData.url) {
          throw new Error('No URL returned');
        }
        sendResponse({ success: true, url: sharedLinkData.url });
      })
      .catch(error => {
        console.error('Unexpected error:', error);
        sendResponse({ success: false, message: error.message });
      });

    return true; // Will respond asynchronously.
  }
});
