const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;

const Tray = electron.Tray;
const Menu = electron.Menu;

const app = electron.app;
const globalShortcut = electron.globalShortcut;
const path = require("path"); // node.js API 的 path 套件

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 350,
        height: 350,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
       frame: false,           // 標題列不顯示
       transparent: true,      // 背景透明
       autoHideMenuBar: true,  // 工具列不顯示
       show: false,
    });
    mainWindow.loadFile("index.html")

    return mainWindow
}

function createTray(win){
    const iconPath = path.join(__dirname, "./img/tray_cat.png");
    const tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "cat 4", click: () => {
                win.show();
                win.webContents.send("switch-cat", 4)
            }
        },
        {
            label: "cat 5", click: () => {
                win.show();
                win.webContents.send("switch-cat", 5)
            }
        },
        {
            label: "cat 6", click: () => {
                win.show();
                win.webContents.send("switch-cat", 6)
            }

        },
        {
            label: "cat 7", click: () => {
                win.show();
                win.webContents.send("switch-cat", 7)
            }
        },
        {
            label: '縮小', click: () => win.hide()
        },
        {
            label: '結束', click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ])

    tray.setToolTip("shrink cat");
    tray.setContextMenu(contextMenu);
    tray.on("click", () => win.show());

    return tray;
}

app.on("ready", () => {
    const win = createWindow();
    createTray(win);

    [1, 2, 3].map(number => {    
        globalShortcut.register(`CommandOrControl+${number}`, () => {
            win.webContents.send('switch-cat', number); // 觸發  preload.js 中的 ipcRenderer.on('switch-cat' 事件
            win.show();  // Shows and gives focus to the window.
        })
    })
})
    
