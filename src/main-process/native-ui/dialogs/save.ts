import * as electron from 'electron';

const { ipcMain, dialog, remote: { BrowserWindow } } = electron;


ipcMain.on('save-dialog', (event) => {
    const options = {
        title: 'Save an Image',
        filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
    }

    dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), options)
        .then(filename => {
            event.sender.send('saved-file', filename)

        })

})
