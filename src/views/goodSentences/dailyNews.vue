<template>
  <div id="dailyNews">
    <a-card title="每日60S读懂世界" :style="{ marginTop: '1px' }">
      <template #extra>
        <a-button type="primary" @click="queryNews">点我获取每日新闻</a-button>
      </template>
      <span v-if="newsVal.time == '' || newsVal.time == null || newsVal.time == undefined">
        <a-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          :image-style="{
            height: '60px',
          }">
        </a-empty>
      </span>
      <span v-else>
        <a-spin :spinning="loading">
          <div class="cont">
            <h2>时间：{{ newsVal.time }}</h2>
            <!-- <div class="img">
              <img :src="newsVal.banner" alt="" />
            </div> -->
            <div>
              <ul v-for="(item, index) in newsVal.data" :key="index" class="ulLi">
                <li>{{ index }}.~{{ item }}</li>
              </ul>
            </div>
          </div>
        </a-spin>
      </span>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';
interface newData {
  banner: string;
  time: string;
  data: string[];
}
const loading = ref<boolean>(false); // 加载中
let newsVal = reactive<newData>({
  banner: '',
  time: '',
  data: [],
});
// 获取新闻
const queryNews = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(`https://api.vvhan.com/api/60s`);
    if (data.success == true) {
      newsVal.banner = data.banner;
      newsVal.time = data.time;
      newsVal.data = data.data;
    } else {
      alert('获取数据失败，请重试');
    }
  } catch (error) {
    console.error('请求错误:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
#dailyNews {
  .cont {
    // border: 1px solid red;
    h2 {
      margin-top: -1%;
    }
  }
}
</style>
