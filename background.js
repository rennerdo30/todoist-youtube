function convertSecondsToMinutes(seconds) {
    // Parse the input to ensure it's a float
    let floatSeconds = parseFloat(seconds);

    // Convert seconds to minutes
    let minutes = floatSeconds / 60;

    // Round up to the nearest integer
    let roundedMinutes = Math.ceil(minutes);

    return roundedMinutes;
}

function addMinutesToDate(date, minutes) {
    // Create a new Date object from the existing one to avoid mutating the original date
    let newDate = new Date(date.getTime());

    // Add the minutes
    newDate.setMinutes(newDate.getMinutes() + minutes);

    return newDate;
}




chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'addToTodoist',
      title: 'Add YouTube video to Todoist',
      contexts: ['page']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'addToTodoist') {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: getVideoDetails
        },
        (results) => {
          const videoDetails = results[0].result;
          chrome.storage.sync.get('todoistApiToken', (data) => {
            if (data.todoistApiToken) {
              addToTodoist(videoDetails, data.todoistApiToken);
            } else {
              console.error('Todoist API token not set.');
            }
          });
        }
      );
    }
  });
  
  function addToTodoist(videoDetails, apiToken) {


    let minutes = convertSecondsToMinutes(videoDetails.duration);
    let due = addMinutesToDate(new Date(), minutes);


    fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: videoDetails.title,
        due_datetime: due.toISOString(),
        duration: minutes,
        duration_unit: "minute"
      })
    }).then(response => response.json())
      .then(data => console.log('Task added:', data))
      .catch(error => console.error('Error:', error));
  }
  
  function getVideoDetails() {
    const videoTitle = document.querySelector('meta[name="title"]').content;
    
    const videoLength = document.querySelector('.ytp-time-duration').textContent;
    const duration = videoLength.match(/\d+:\d+/)[0]; // Extract duration
    const durationInSeconds = parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1]);
  
    return {
      title: videoTitle,
      duration: durationInSeconds
    };
  }
  