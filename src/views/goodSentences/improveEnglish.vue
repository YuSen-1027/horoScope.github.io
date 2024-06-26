<template>
  <div id="improveEnglish">
    <a-button type="primary" @click="getBingImg">点我获取每日励志英语</a-button>
    <span v-if="bingUrl.pic == ''">
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
          <div class="icon"><PictureOutlined></PictureOutlined></div>
          <div class="en">原文：{{ bingUrl.en }}</div>
          <div class="zh">汉译：{{ bingUrl.zh }}</div>
          <div class="img">
            <a-image :width="860" :src="bingUrl.pic" />
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
import { PictureOutlined } from '@ant-design/icons-vue';

/* 定义 imgUrl 接口 */
interface improveVal {
  en: string;
  pic: string;
  zh: string;
}

/* 数据 */
let bingUrl = reactive<improveVal>({
  en: 'every',
  pic: '',
  zh: 'string',
});
const loading = ref<boolean>(false);

/* 方法 */
const getBingImg = async () => {
  bingUrl.pic = 'null';
  loading.value = true;
  try {
    const { data } = await axios.get('https://api.vvhan.com/api/dailyEnglish?type=sj');
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
#improveEnglish {
  .cont {
    margin-top: 1%;
    // border: 1px solid red;
    background-color: black;
    height: 600px;
    position: relative;
    .icon {
      font-size: 100px;
      color: white;
      margin: 0 0 0 5%;
    }
    .en {
      font-size: 30px;
      width: 500px;
      color: white;
      margin: 0 0 0 5%;
    }
    .zh {
      font-size: 20px;
      width: 500px;
      color: white;
      margin: 2% 0 0 5%;
    }
    .img {
      float: left;
      width: 1000px;
      position: absolute;
      top: 6%;
      right: -2%;
    }
  }
}
</style>
