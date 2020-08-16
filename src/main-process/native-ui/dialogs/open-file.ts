import * as electron from 'electron';


const { ipcMain, dialog, remote: { BrowserWindow } } = electron;

const options: electron.OpenDialogOptions = {
    properties: ['openFile', 'openDirectory']
};


ipcMain.on('open-file-dialog', (event) => {
    const browserWindow = BrowserWindow.getFocusedWindow();


    dialog.showOpenDialog(browserWindow, options)
        .then(files => {
            if (files) {
                event.sender.send('selected-directory', files)
            }
        });
});


