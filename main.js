const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");


function createLoadingWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('loading.html');


  setTimeout(() => {
    win.loadFile('fourth.html');
  }, 5000);
}



try {
  require("electron-reloader")(module, {
    watchRenderer: true,
  });
} catch (_) {}

let mainWindow;

async function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      autoplayPolicy: "no-user-gesture-required",
    },
  });

  try {
    await mainWindow.loadFile(path.join(__dirname, "src/html/index.html"));
    console.log("Окно успешно загружено");


    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
    }
  } catch (err) {
    console.error("Ошибка загрузки файла:", err);
  }
}


ipcMain.on("navigate-to", (_, page) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow
      .loadFile(path.join(__dirname, "src/html", `${page}.html`))
      .catch((err) => console.error("Ошибка перехода:", err));
  }
});

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
