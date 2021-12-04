import { app, BrowserWindow, ipcMain } from 'electron';
import { CHANGE_CONFIG } from './types/ipcTypes';
import { GitService } from './service/Service';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on('ready', async () => {
  try {
    await installExtension(REDUX_DEVTOOLS)
    console.log('Installed redux devtools.');
  } catch (err) {
    console.error('Error installing redux devtools: ', err);
  }
  try {
    await installExtension(REACT_DEVELOPER_TOOLS)
    console.log('Installed react devtools.');
  } catch (err) {
    console.error('Error installing redux devtools: ', err);
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(CHANGE_CONFIG.REQUEST, GitService.setGlobalGitCredentials)
