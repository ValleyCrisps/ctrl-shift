const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const { ipcMain } = require('electron');
const Sequelize = require('sequelize');
require('../src/config/database.js');
require('datejs');
const Op = Sequelize.Op;
const Shifts = require('../src/models/Shifts');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//
// API
//
ipcMain.on('shifts:get-week', (e, date) => {
  console.log('got it');
  let monday = new Date(date);
  monday.prev().monday();
  // get list of shifts for the week
  Shifts.findAll({
    where: {
      shift_date: {
        [Op.between]: [
          monday.toString('yyyy-MM-dd'),
          monday
            .add(7)
            .day()
            .toString('yyyy-MM-dd'),
        ],
      },
    },
  })
    .map(el => el.get({ plain: true }))
    .then(rows => {
      e.sender.send('shifts:sent-week', rows);
      console.log('sent back', rows);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});
