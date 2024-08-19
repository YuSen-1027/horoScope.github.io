<template>
  <div id="echartsChart">
    <!-- 最外层 -->
    <a-card title="关于Echarts" style="width: 98%; margin: 1%">
      <!-- 基础折线图 -->
      <basicLineChart></basicLineChart>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// 引入
import basicLineChart from './basicLineChart.vue';
</script>

<style lang="less">
#echartsChart {
}
</style>
