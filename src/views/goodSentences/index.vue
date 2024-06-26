<template>
  <div id="goodSentences">
    <a-card title="胡说八道大全" style="width: 98%; margin: 1%">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="您想要的美言这里都有">
          <onSentencePer></onSentencePer>
        </a-tab-pane>
        <a-tab-pane key="2" tab="每日一句励志英语">
          <improveEnglish></improveEnglish>
        </a-tab-pane>
        <a-tab-pane key="3" tab="每日60秒读懂世界">
          <dailyNews></dailyNews>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import onSentencePer from './oneSentencePer.vue';
import improveEnglish from './improveEnglish.vue';
import dailyNews from './dailyNews.vue';
import { ref } from 'vue';
const activeKey = ref<string>('1');
</script>

<style scoped lang="less">
#goodSentences {
}
</style>
