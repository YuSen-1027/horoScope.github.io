<template>
  <div id="starSignIndex">
    <!-- 最外层 -->
    <a-card title="您相信星座吗？来看看吧！" style="width: 98%; margin: 1%">
      <!-- 十二星座日期排序 -->
      <horoDescription></horoDescription>
      <!-- 星座运势查询 -->
      <fortuneQuery></fortuneQuery>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// 引入
import horoDescription from './horoDescription.vue';
import fortuneQuery from './fortuneQuery.vue';
</script>

<style lang="less">
#starSignIndex {
}
</style>
