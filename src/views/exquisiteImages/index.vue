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
        <a-tab-pane key="3" tab="二次元图片">
          <acgPicture></acgPicture>
        </a-tab-pane>
        <a-tab-pane key="4" tab="精选头像">
          <avatarPicture></avatarPicture>
        </a-tab-pane>
        <a-tab-pane key="5" tab="动漫头像">
          <dmPicture></dmPicture>
        </a-tab-pane>
        <a-tab-pane key="6" tab="男生头像">
          <boyPicture></boyPicture>
        </a-tab-pane>
        <a-tab-pane key="7" tab="女生头像">
          <girlPicture></girlPicture>
        </a-tab-pane>
        <a-tab-pane key="8" tab="小众头像">
          <nichePicture></nichePicture>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import bingPicture from './bingPicture.vue';
import viewsPicture from './viewsPicture.vue';
import acgPicture from './acgPicture.vue';
import avatarPicture from './avatarPicture.vue';
import dmPicture from './dmPicture.vue';
import boyPicture from './boyPicture.vue';
import girlPicture from './girlPicture.vue';
import nichePicture from './nichePicture.vue';

const activeKey = ref('1');
</script>

<style scoped lang="less">
#exquisiteImages {
}
</style>
