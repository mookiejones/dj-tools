import * as path from 'path'
import { ipcMain, app, Menu, Tray } from 'electron';

let appIcon: Tray = null

ipcMain.on('put-in-tray', (event) => {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, iconName)
    appIcon = new Tray(iconPath)

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Remove',
        click: () => {
            event.sender.send('tray-removed')
        }
    }])

    appIcon.setToolTip('Electron Demo in the tray.')
    appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', () => {
    appIcon.destroy()
})

app.on('window-all-closed', () => {
    if (appIcon) appIcon.destroy()
})
