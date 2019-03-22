const electron = require('electron');  
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

// Keep reference of main window because of GC
let mainWindow;

// Quit when all windows are closed
app.on('window-all-closed', function() {  
    app.quit();
});

// When application is ready, create application window
app.on('ready', function() {

    // Create main window
    // Other options available at:
    // http://electron.atom.io/docs/latest/api/browser-window/#new-browserwindow-options
    mainWindow = new BrowserWindow({
        name: "S3 Sync Tool",
        width: 1000,
        height: 680,
        toolbar: false,
        minHeight: 300,
        minWidth: 560
    });
    
    // For debugging
    // mainWindow.webContents.openDevTools();
    
    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
    
    // Target HTML file which will be opened in window
    mainWindow.loadURL(startUrl);

    // Uncomment to use Chrome developer tools
    // mainWindow.webContents.openDevTools({detach:true});

    // Cleanup when window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
		});

});