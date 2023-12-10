import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron'


let mainBrowserWindow: BrowserWindow | null = null
app.whenReady().then(() => {

  const __IS_DEV = !!process.argv[2]

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
    // frame: false, // 状态栏
  })

  if (__IS_DEV) {
    mainBrowserWindow.webContents.openDevTools({ mode: 'undocked' })
  }

  const url = __IS_DEV ? process.argv[2] : 'app://index.html'
  mainBrowserWindow.loadURL(url)

  mainBrowserWindow.setAlwaysOnTop(true, 'floating')

})


app.on('activate', () => {
  mainBrowserWindow?.show()
})