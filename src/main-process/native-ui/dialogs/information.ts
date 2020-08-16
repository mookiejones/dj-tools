import * as electron from 'electron';

const { ipcMain, dialog, remote: { BrowserWindow } } = electron;

ipcMain.on('open-information-dialog', (event) => {
    const options = {
        type: 'info',
        title: 'Information',
        message: "This is an information dialog. Isn't it nice?",
        buttons: ['Yes', 'No']
    }

    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options)
        .then(index => {
            event.sender.send('information-dialog-selection', index)

        })
})
