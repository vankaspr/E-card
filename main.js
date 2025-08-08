const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

try {
    require('electron-reloader')(module, {
        watchRenderer: true
    })
} catch {}

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            autoplayPolicy: "no-user-gesture-required"
        }
    })

    try {

        await win.loadFile(path.join(__dirname, 'src', 'html','index.html'))
        console.log('Окно успешно загружено')
    } catch (err) {
        console.error('Ошибка загрузки файла:', err)
    }
}

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})