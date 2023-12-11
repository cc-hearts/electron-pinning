<script setup lang="ts">
import { useCssNamespace } from '@/hooks/use-css-namespace'
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { classnames } from '@/utils/classnames'
// @ts-ignore
const { ipcRenderer } = require('electron')

const cssNs = useCssNamespace('top-bar')

const handleHiddenWindow = () => {
  ipcRenderer.invoke('hidden-window')
}

const handleChangeWindowSize = () => {
  ipcRenderer.invoke('change-window-size')
}

</script>

<template>
  <div :class="classnames(cssNs.cls, 'flex items-center p-l-4 gap-1.5')">
    <span @click="handleHiddenWindow" class="app-no-drag">
      <CloseOutlined />
    </span>
    <span @click="handleHiddenWindow" class="app-no-drag">
      <MinusOutlined />
    </span>
    <span @click="handleChangeWindowSize" class="app-no-drag">
      <PlusOutlined />
    </span>
    <div class="flex-1 app-drag"></div>
  </div>
</template>
<style lang="scss">
@use '@/assets/scss/var/variable.scss' as *;
@use '@/assets/scss/common/mixins.scss' as *;
@use '@/assets/scss/common/function.scss' as *;

@include b('top-bar') {
  &:hover {
    svg {
      opacity: 1;
    }
  }

  &>span {
    width: 12px;
    height: 12px;
    font-size: 8px;
    color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      opacity: 0;
    }

    &:nth-child(1) {
      background-color: #e65f52;
    }

    &:nth-child(2) {
      background-color: #f5bc42;
    }

    &:nth-child(3) {
      background-color: #5cb85c;
    }
  }
}
</style>
@/utils/class-names