const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
    })
    win.maximize();
  
    win.loadFile('dist/cdnindex.html')
  }

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })