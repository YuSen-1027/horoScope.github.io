<template>
  <div id="app">
    <index></index>
  </div>
</template>
<script lang="ts" setup>
import index from '@/views/index.vue';
import axios from 'axios';
import { onMounted } from 'vue';
onMounted(async () => {
  let { data } = await axios.get('https://api.vvhan.com/api/script/snow');
});
</script>
<style>
#app {
  /* background: linear-gradient(115deg, #f878ff, #ffda9e, #ffffff); */
  width: 100%;
  height: 100%;
}
</style>
