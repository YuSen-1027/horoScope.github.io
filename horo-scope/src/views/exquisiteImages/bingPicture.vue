<template>
  <div>
    <a-image :width="200" :height="200" src="https://www.antdv.com/#error" :fallback="defaultImages" />
  </div>
</template>

<script setup lang="ts">
import fallback from '@/views/exquisiteImages/fallBack.js';
let defaultImages = fallback
</script>

<style lang="less" scoped></style>
