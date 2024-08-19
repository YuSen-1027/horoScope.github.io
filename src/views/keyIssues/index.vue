<template>
  <div id="keyIssues">
    <!-- 最外层 -->
    <a-card title="重点问题解决" style="width: 98%; margin: 1%">
      <!-- 基础折线图 -->
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="住几天">
          <checkAndOut></checkAndOut>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// 引入
import checkAndOut from './checkAndOut.vue';
import { ref } from 'vue';
const activeKey = ref('1');
</script>

<style lang="less">
#keyIssues {
}
</style>
