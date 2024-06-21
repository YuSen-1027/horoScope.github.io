<template>
  <div id="bingPicture">
    <a-button type="primary" @click="getBingImg">点我获取精选头像</a-button>
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
          <div class="icon"><PictureOutlined></PictureOutlined></div>
          <div class="img">
            <a-image :width="520" :src="bingUrl.url" />
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
interface imgUrl {
  url: string;
}

/* 数据 */
let bingUrl = reactive<imgUrl>({
  url: '',
});
const loading = ref<boolean>(false);

/* 方法 */
const getBingImg = async () => {
  bingUrl.url = 'null';
  loading.value = true;
  try {
    const { data } = await axios.get('https://api.vvhan.com/api/avatar/rand?type=json');
    if (data.success) {
      bingUrl = data;
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
    .icon {
      position: absolute;
      font-size: 200px;
      top: -2%;
      left: 5%;
      color: white;
    }
    .img {
      position: absolute;
      // border: 1px solid white;
      top: 7%;
      right: 10%;
      width: 550px;
    }
  }
}
</style>
