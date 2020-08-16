
import { app, BrowserWindow } from "electron";
import * as glob from 'glob';
import * as path from 'path';

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('DJ Tools')

let mainWindow: BrowserWindow = null;


function initialize() {
    makeSingleInstance();

    loadFiles();

    function createWindow() {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, "preload.js"),
            }
        }

        mainWindow = new BrowserWindow(windowOptions)
        // and load the index.html of the app.
        mainWindow.loadFile(path.join(__dirname, "../index.html"));


        if (debug) {
            // Open the DevTools.
            mainWindow.webContents.openDevTools();
            mainWindow.maximize()
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })


    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })


}


// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.

function makeSingleInstance() {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    })

}

function loadFiles() {
    const files = glob.sync(path.join(__dirname, 'dist/main-process/**/.js'))
    files.forEach(require);
}

initialize();