const path = require('path')
const axios = require('axios')
const notifier = require('node-notifier')
const icon = path.join(__dirname, 'icon.png')
const { ipcMain } = require('electron')
const { ipcStart } = require('electron')
let { app, BrowserWindow, Tray, Menu } = require('electron')
let url = require('url')
let mainWindow
let timer
let http = require('http')
let Stream = require('stream').Transform
let fs = require('fs');
let notfTimer = minuteToMil(5)

function createWindow() {
    mainWindow = new BrowserWindow({ width: 500, height:300 , icon: icon })
    mainWindow.setMenu(null)
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
    }))
    mainWindow.webContents.executeJavaScript(`
        var button = document.querySelector("#start");
        button.addEventListener("click", function onclick(event) {start()
        });
    `)

    let appIcon = new Tray(icon)
    let contextMenu = Menu.buildFromTemplate([
        {label: 'Control', click: function () {  mainWindow.show()  }},
        {label: 'Quit', click: function () {  app.quit()  }}
    ])

    appIcon.setContextMenu(contextMenu)

    mainWindow.on('close', function (event) {
        event.preventDefault()
        mainWindow.hide()
    })

    mainWindow.on('minimize', function (event) {
        event.preventDefault()
        mainWindow.hide()
    })

    mainWindow.on('show', function () {
        appIcon.setHighlightMode('always')
    })

}

function loadNewFact(){
  axios.get('http://mentalfloss.com/api/facts')
  .then(function (response) {

    let rawArr = response.data
    let fact = rawArr[Math.floor(Math.random()*rawArr.length)]
    
    notifier.notify(
      {
        title: 'Hey, did you know...',
        message: fact.shortHeadline,
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
      },
    );

  })
}

function minuteToMil(minutes){
    return minutes  * 60 * 1000 
}

function startTimer(){
    console.log("This started")
    timer = setInterval(loadNewFact, notfTimer);
}

function clearTimer(newVal){
    clearInterval(timer);
    notfTimer = minuteToMil(newVal)
    startTimer()
}

app.on('ready', createWindow)

ipcMain.on('click', ()              => loadNewFact())
ipcMain.on('start', ()              => startTimer())
ipcMain.on('change', (data, newVal) => clearTimer(newVal))