<template>
  <div id="index">
    <a-layout class="layout">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <h1 class="title">冷静</h1>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <StarOutlined />
            <span>星座运势</span>
          </a-menu-item>
          <a-menu-item key="2">
            <PictureOutlined />
            <span>精美头像</span>
          </a-menu-item>
          <a-menu-item key="3">
            <SoundOutlined/>
            <span>胡说八道</span>
          </a-menu-item>
          <a-menu-item key="4">
            <DotChartOutlined/>
            <span>Echarts图表</span>
          </a-menu-item>
          <a-menu-item key="5">
            <ExclamationOutlined/>
            <span>CSDN问题</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <span v-if="selectedKeys[0] == '1'">
          <a-layout-content>
            <!-- 星座运势 -->
            <starSignIndex></starSignIndex>
          </a-layout-content>
        </span>
        <span v-if="selectedKeys[0] == '2'">
          <a-layout-content>
            <!-- 精美头像 -->
            <avatarIndex></avatarIndex>
          </a-layout-content>
        </span>
        <span v-if="selectedKeys[0] == '3'">
          <a-layout-content>
            <!-- 胡说八道 -->
            <sentencesIndex></sentencesIndex>
          </a-layout-content>
        </span>
        <span v-if="selectedKeys[0] == '4'">
          <a-layout-content>
            <!-- Echarts -->
            <echartsChart></echartsChart>
          </a-layout-content>
        </span>
        <span v-if="selectedKeys[0] == '5'">
          <a-layout-content>
            <!-- 重点问题解决 -->
            <keyIssues></keyIssues>
          </a-layout-content>
        </span>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import starSignIndex from '@/views/starSign/index.vue';
import avatarIndex from '@/views/exquisiteImages/index.vue';
import sentencesIndex from '@/views/goodSentences/index.vue';
import echartsChart from '@/views/echartsChart/index.vue';
import keyIssues from '@/views/keyIssues/index.vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  StarOutlined,
  PictureOutlined,
  SoundOutlined,
  DotChartOutlined,
  ExclamationOutlined
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const selectedKeys = ref<string[]>(['5']);
const collapsed = ref<boolean>(false);
</script>
<style scoped lang="less">
#index {
  .title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    margin-top: 16px;
  }
  .ant-layout.ant-layout-has-sider {
    height: 100vh;
  }
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
}
</style>
