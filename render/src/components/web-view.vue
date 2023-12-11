<script setup lang='ts'>
import { WebViewInjectKey } from '@/config/index';
import { inject } from 'vue'

const { webviewSrc } = inject(WebViewInjectKey, { webviewSrc: '' })


</script>
<template>
  <webview :src="webviewSrc" class="w-full h-full border-none"></webview>
</template>