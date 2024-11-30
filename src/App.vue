<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView/>
</template>

<style>
/* ... existing code ... */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: url('@/assets/image/background.png') no-repeat center center fixed;
  background-size: cover;
}

/* 为需要虚化效果的路由页面创建一个通用类 */
.blur-background {
  position: relative;
  backdrop-filter: blur(11px);
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 100vh;
}
/* ... existing code ... */
</style>