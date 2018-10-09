
const { ipcRenderer } = require('electron')

document
  .querySelector('#newNotf')
  .addEventListener('click', () => {
    ipcRenderer.send('click')
  })


document
  .querySelector('#start')
  .addEventListener('click', () => {
    ipcRenderer.send('start', document.querySelector('#minutes').value)
  })


document
  .querySelector('#minutes')
  .addEventListener('input', () => {
    ipcRenderer.send('change', document.querySelector('#minutes').value)
  })

document
  .querySelector('#close')
  .addEventListener('click', () => {
    ipcRenderer.send('close')
  })
