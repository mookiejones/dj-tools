import { ipcMain } from 'electron';

ipcMain.on('asynchronous-message', (event, arg) => {
    event.sender.send('asynchronous-reply', 'pong')
})
