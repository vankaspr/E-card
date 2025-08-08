const { app, BrowserWindow, ipcMain } = require('electron') // Изменен импорт
const path = require('path') // Убрано node: для совместимости

// Hot reload для разработки
try {
    require('electron-reloader')(module, {
        watchRenderer: true
    })
} catch (_) {}

let mainWindow // Глобальная переменная для хранения окна

async function createWindow() {
    // Убираем const, используем глобальную переменную
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            autoplayPolicy: "no-user-gesture-required"
        }
    })

    try {
        await mainWindow.loadFile(path.join(__dirname, 'src/html/index.html'))
        console.log('Окно успешно загружено')

        // Открываем DevTools для разработки
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools()
        }
    } catch (err) {
        console.error('Ошибка загрузки файла:', err)
    }
}

// Исправленный обработчик перехода
ipcMain.on('navigate-to', (_, page) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.loadFile(path.join(__dirname, 'src/html', `${page}.html`))
            .catch(err => console.error('Ошибка перехода:', err))
    }
})

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

