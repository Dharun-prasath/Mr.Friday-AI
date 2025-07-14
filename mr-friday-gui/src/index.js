const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Mr. Friday",
    icon: path.join(__dirname, 'assets/icon.png'), // optional icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false, // good for security
    }
  });

  win.loadFile(path.join(__dirname, '/index.html'));

  // Optional: Open DevTools on launch
  // win.webContents.openDevTools();
}

app.commandLine.appendSwitch('enable-speech-dispatcher');
app.commandLine.appendSwitch('enable-speech-recognition');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.whenReady().then(() => {
  createWindow();

  // macOS specific: reopen window if dock icon is clicked and no windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
