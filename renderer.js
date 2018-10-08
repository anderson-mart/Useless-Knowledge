// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');
const { ipcStartRenderer } = require('electron');

document
  .querySelector('#newNotf')
  .addEventListener('click', () => {
    ipcRenderer.send('click');
  });


document
  .querySelector('#start')
  .addEventListener('click', () => {
    ipcRenderer.send('start');
  });


document
  .querySelector('#minutes')
  .addEventListener('input', () => {
    ipcRenderer.send('change', document.querySelector('#minutes').value);
  });