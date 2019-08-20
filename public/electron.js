const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

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
// HANDLE SUBWINDOWS
//
const { ipcMain } = require('electron');

// ipcMain.on('addShiftButton:clicked', () => {
//   const addShiftWindow = new BrowserWindow({
//     width: 900,
//     height: 680,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });
//   addShiftWindow.loadURL(
//     isDev
//       ? 'http://localhost:3000'
//       : `file://${path.join(__dirname, '../build/addShift.html')}`
//   );
// });

//
// HANDLE DATABASE COMMUNICATIONS
//
const Sequelize = require('sequelize');
require('../src/config/database.js');
require('datejs');
const Op = Sequelize.Op;

// Import models
const Shifts = require('../src/models/Shifts');
const Agents = require('../src/models/Agents');

// SHIFTS
// get all shifts
ipcMain.on('shifts:get-all', e => {
  Shifts.findAll()
    .map(el => el.get({ plain: true }))
    .then(rows => {
      e.sender.send('shifts:sent-all', rows);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// get weekly shifts
ipcMain.on('shifts:get-week', (e, date) => {
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
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// add shift
ipcMain.on('shifts:add', (e, shift) => {
  Shifts.create({
    shift_date: shift.date,
    shift_start: shift.start,
    shift_end: shift.end,
    needed: shift.needed,
    shift_notes: shift.notes,
  })
    .then(console.log('done'))
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// delete shift
ipcMain.on('shifts:delete', (e, id) => {
  Shifts.destroy({
    where: {
      shift_id: id,
    },
  })
    .then(console.log('done'))
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// AGENTS
// get all agents
ipcMain.on('agents:get-all', e => {
  Agents.findAll()
    .map(el => el.get({ plain: true }))
    .then(rows => {
      e.sender.send('agents:sent-all', rows);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// add agent
ipcMain.on('agents:add', (e, agent) => {
  Agents.create({
    name: agent.name,
    surname: agent.surname,
    visa_expiration: agent.visaExpiration,
    never_on: agent.neverOn,
    agent_notes: agent.notes,
  })
    .then(console.log('done'))
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// delete agent
ipcMain.on('agents:delete', (e, id) => {
  Agents.destroy({
    where: {
      agent_id: id,
    },
  })
    .then(console.log('done'))
    .catch(err => {
      console.log(err);
      throw err;
    });
});
