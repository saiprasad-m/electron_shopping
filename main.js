const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;


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
        height: 400,
        title: 'Add Item to Shopping'
    });
    addWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
}

const mainMainTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Item'
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