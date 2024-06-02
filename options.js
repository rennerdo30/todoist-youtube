document.addEventListener('DOMContentLoaded', () => {
    const apiTokenInput = document.getElementById('apiToken');
    const saveButton = document.getElementById('saveButton');
  
    // Load the API token from storage
    chrome.storage.sync.get('todoistApiToken', (data) => {
      if (data.todoistApiToken) {
        apiTokenInput.value = data.todoistApiToken;
      }
    });
  
    // Save the API token to storage
    saveButton.addEventListener('click', () => {
      const apiToken = apiTokenInput.value;
      chrome.storage.sync.set({ todoistApiToken: apiToken }, () => {
        alert('API token saved!');
      });
    });
  });
  