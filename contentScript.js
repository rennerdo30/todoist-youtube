const videoTitle = document.querySelector('meta[name="title"]').content;
const videoLength = document.querySelector('.ytp-time-duration').textContent;
const duration = videoLength.match(/\d+:\d+/)[0]; // Extract duration

const seconds = parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1]);

chrome.runtime.sendMessage({
  action: 'addVideo',
  videoTitle,
  videoLength: seconds
});