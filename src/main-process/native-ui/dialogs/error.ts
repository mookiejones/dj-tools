import { ipcMain, dialog } from 'electron'

ipcMain.on('open-error-dialog', (event) => {
    dialog.showErrorBox('An Error Message', 'Demonstrating an error message.')
})
