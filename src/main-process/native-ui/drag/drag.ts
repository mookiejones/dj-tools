import { ipcMain } from 'electron'
import * as path from 'path'

ipcMain.on('ondragstart', (event, filepath) => {
    const iconName = 'codeIcon.png'
    event.sender.startDrag({
        file: filepath,
        icon: path.join(__dirname, iconName)
    })
})
