import { BrowserWindow, dialog, ipcMain } from 'electron'

function getCurrentInstance(e: Electron.IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(e.sender)
}


export function handleShowWindowEvent() {
  ipcMain.handle('show-window', (e) => {
    const ctx = getCurrentInstance(e)
    ctx && ctx.show()
  })
}



export function handleHiddenWindowEvent() {
  ipcMain.handle('hidden-window', (e) => {
    const ctx = getCurrentInstance(e)
    ctx && ctx.hide()
  })
}

export function handleChangeWindowSizeEvent() {
  let isMaximized = false
  ipcMain.handle('change-window-size', (e) => {
    const ctx = getCurrentInstance(e)
    if (isMaximized) {
      ctx && ctx.unmaximize()
    } else {
      ctx && ctx.maximize()
    }
    isMaximized = !isMaximized
  })
}


export function handlePinningWindowEvent() {
  ipcMain.handle('pin-window', (e, isPinWindow: boolean) => {
    const ctx = getCurrentInstance(e)
    ctx && ctx.setAlwaysOnTop(isPinWindow, 'floating')
  })
}


export function registerEvent() {
  ;[
    handlePinningWindowEvent,
    handleShowWindowEvent,
    handleHiddenWindowEvent,
    handleChangeWindowSizeEvent,
  ].forEach((fn) => fn())
}
