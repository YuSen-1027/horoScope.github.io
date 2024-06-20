<template>
  <div id="exquisiteImages">
    <a-card title="您想要的图片这里都有！" style="width: 98%; margin: 1%">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Bing每日图片">
          <bingPicture></bingPicture>
        </a-tab-pane>
        <a-tab-pane key="2" tab="风景图片">
          <viewsPicture></viewsPicture>
        </a-tab-pane>
        <a-tab-pane key="3" tab="二次元图片">二次元图片</a-tab-pane>
        <a-tab-pane key="4" tab="电脑分辨率美图">电脑分辨率美图</a-tab-pane>
        <a-tab-pane key="5" tab="手机分辨率美图">手机分辨率美图</a-tab-pane>
        <a-tab-pane key="6" tab="精选头像">精选头像</a-tab-pane>
        <a-tab-pane key="7" tab="动漫头像">动漫头像</a-tab-pane>
        <a-tab-pane key="8" tab="男生头像">男生头像</a-tab-pane>
        <a-tab-pane key="9" tab="女生头像">女生头像</a-tab-pane>
        <a-tab-pane key="10" tab="小众头像">小众头像</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import bingPicture from './bingPicture.vue';
import viewsPicture from './viewsPicture.vue';
const activeKey = ref('1');
</script>

<style scoped lang="less">
#exquisiteImages {
}
</style>
