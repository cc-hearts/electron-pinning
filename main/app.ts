import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron'
import { registerEvent } from './event';


let mainBrowserWindow: BrowserWindow | null = null
app.whenReady().then(() => {

  const __IS_DEV__ = !!process.argv[2]

  console.log(process.argv);

  const webPreferences: BrowserWindowConstructorOptions['webPreferences'] = {
    nodeIntegration: true,
    webSecurity: false,
    allowRunningInsecureContent: true,
    contextIsolation: false,
    webviewTag: true,
    spellcheck: false,
    disableHtmlFullscreenWindowResize: true,
    // preload: `${__dirname}/preload.js`,
  }

  mainBrowserWindow = new BrowserWindow({
    webPreferences,
    show: false,
    frame: false, // default top bar
  })

  if (__IS_DEV__) {
    mainBrowserWindow.webContents.openDevTools({ mode: 'undocked' })
  }

  registerEvent()
  const url = __IS_DEV__ ? process.argv[2] : 'app://index.html'
  mainBrowserWindow.loadURL(url)

})

app.on('activate', () => {
  mainBrowserWindow?.show()
})