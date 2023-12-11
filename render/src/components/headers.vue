<script setup lang='ts'>
import TopBar from './top-bar.vue';


</script>
<template>
  <div class="h-8 w-full flex">
    <TopBar />
    <div class="flex-1 app-drag inline-flex justify-center items-center">
      <slot />
    </div>
  </div>
</template>
<style lang='scss'></style>