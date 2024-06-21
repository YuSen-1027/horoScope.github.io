<template>
  <div id="bingPicture">
    <a-button type="primary" @click="getBingImg">点我获取风景图片</a-button>
    <span v-if="bingUrl.url == ''">
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
          <div class="date">时间：{{ bingUrl.date }}</div>
          <div class="title">详情：{{ bingUrl.title }}</div>
          <div class="img">
            <a-image :width="1000" :src="bingUrl.url" />
          </div>
        </div>
      </a-spin>
    </span>
  </div>
</template>

<script setup lang="ts">
/* 引入 */
import { ref, reactive } from 'vue';
import axios from 'axios';

/* 定义 imgUrl 接口 */
interface imgUrl {
  date: number;
  title: string;
  url: string;
}

/* 数据 */
let bingUrl = reactive<imgUrl>({
  date: 10000000,
  title: '',
  url: '',
});
const loading = ref<boolean>(false);

/* 方法 */
const getBingImg = async () => {
  bingUrl.url = 'null';
  loading.value = true;
  try {
    const { data } = await axios.get('https://api.vvhan.com/api/wallpaper/views?type=json');
    console.log(data);
    if (data.success) {
      bingUrl = data.data;
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
#bingPicture {
  .cont {
    margin-top: 1%;
    // border: 1px solid red;
    background-color: black;
    height: 600px;
    position: relative;
    .date {
      position: absolute;
      font-size: 30px;
      top: 15%;
      left: 5%;
      color: white;
    }
    .title {
      position: absolute;
      top: 30%;
      left: 5%;
      font-size: 20px;
      width: 300px;
      color: white;
    }
    .img {
      position: absolute;
      // border: 1px solid white;
      top: 2.5%;
      right: -0.5%;
      width: 1100px;
    }
  }
}
</style>
