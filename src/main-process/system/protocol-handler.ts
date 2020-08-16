import { app, dialog } from 'electron';
import * as path from 'path';

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('dj-tools', process.execPath, [path.resolve(process.argv[1])])

    }
} else {
    app.setAsDefaultProtocolClient('dj-tools')
}

app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})