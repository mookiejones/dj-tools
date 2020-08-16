import { app, ipcMain } from 'electron';

ipcMain.on('get-app-path', event => {
    event.sender.send('got-app-path', app.getAppPath())
})