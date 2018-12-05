const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;
let mainMainTemplate = [];

process.env.NODE_ENV = 'production'


app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(mainMainTemplate);
    Menu.setApplicationMenu(mainMenu);
});


function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 500,
        height: 250,
        title: 'Add Item to Shopping',
        frame: false
    });
    addWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    //addWindow.setMenu(null);
}

ipcMain.on('item:add', (e,item) => {
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})

mainMainTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Item',
                accelerator: process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
                click() {
                    mainWindow.webContents.send('item:clear');
                }
            },
            {   
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

if(process.platform == 'darwin') {
    mainMainTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production') {
    mainMainTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role : 'reload'
            }
        ]
    })

}