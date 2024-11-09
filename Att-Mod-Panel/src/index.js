const { BrowserWindow, app, ipcMain } = require("electron");
const { updateElectronApp } = require('update-electron-app');

updateElectronApp();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1020,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("src/index.html").catch(err => {
    console.error("Failed to load index.html:", err);
  });

  win.setMenuBarVisibility(false);

  win.on("closed", () => {
    win = null;
  });
}

let maximizeToggle = false;

ipcMain.on("manualMinimize", () => {
  if (win) {
    win.minimize();
  }
});

ipcMain.on("manualMaximize", () => {
  if (win) {
    if (maximizeToggle) {
      win.unmaximize();
    } else {
      win.maximize();
    }
    maximizeToggle = !maximizeToggle;
  }
});

ipcMain.on("manualClose", () => {
  app.quit();
});

app.whenReady().then(createWindow);