<script setup lang='ts'>
import Headers from '@/components/headers.vue'
import WebView from '@/components/web-view.vue'
import { WebViewInjectKey } from '@/config/index'
import Pinning from '@/icons/pinning.vue'
import { classnames } from '@/utils/classnames'
import { isUrl } from '@/utils/valid'
import { provide, ref, onMounted } from 'vue'

// @ts-ignore
const { ipcRenderer } = require('electron')

const inputVal = ref('')
const webviewSrc = ref('')

interface UrlStorage {
  id: number
  url: string
}

const storage = ref<UrlStorage[]>([])
const threshold = 50

const isPinWindow = ref(false)

function setUrlStorage(url: string) {
  const isExistUrl = storage.value.find(target => target.url === url)
  if (isExistUrl || isUrl(url)) return
  storage.value.push({ id: Date.now(), url })
  storage.value = storage.value.slice(-threshold)
  localStorage.setItem('url-storage', JSON.stringify(storage.value))
}

const options = ref<{ value: string }[]>([])

const setWebviewSrc = () => {
  webviewSrc.value = inputVal.value
  setUrlStorage(inputVal.value)
}

provide(WebViewInjectKey, {
  webviewSrc
})

onMounted(() => {
  ipcRenderer.invoke('show-window')
})

const pinningWindow = () => {
  isPinWindow.value = !isPinWindow.value
  ipcRenderer.invoke('pin-window', isPinWindow.value)
}

const onSearch = (val: string) => {
  options.value = storage.value.filter(target => target.url.includes(val)).map(target => ({ value: target.url }))
}
onMounted(() => {
  const storageStr = localStorage.getItem('url-storage') || '[]'
  storage.value = JSON.parse(storageStr)
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <Headers>
      <template #default>
        <div class="app-no-drag w-60%">
          <a-auto-complete class="webview-url text-center w-100%" v-model:value="inputVal" @blur="setWebviewSrc"
            :options="options" @search="onSearch" />
        </div>
        <div class="m-l-4 app-no-drag">
          <Pinning :class="classnames('cursor-pointer', isPinWindow ? 'pin-window__active' : '', 'pin-window')"
            @click="pinningWindow" />
        </div>
      </template>
    </Headers>
    <div class="flex-1 select-none app-no-drag">
      <WebView />
    </div>

  </div>
</template>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

.webview-url {
  .ant-select-selector {
    height: 1.8rem !important;

    input  {
      text-align: center;
    }
  }
}

.pin-window {
  transition: all 0.3s;

  &__active {
    transform: rotate(-45deg);
  }
}
</style>