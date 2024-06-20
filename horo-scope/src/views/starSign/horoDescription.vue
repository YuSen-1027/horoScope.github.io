<template>
  <div id="horoDescription">
    <a-card title="十二星座匹配(日期排序)" :bordered="false" style="width: 100%">
      <!-- 标题 -->
      <template #extra>
        <a-button type="primary" @click="updateBgColor">
          <template #icon>
            <BgColorsOutlined />
          </template>
          随机星座背景色
        </a-button>
      </template>

      <!-- 内容 -->
      <div style="background-color: #ececec; padding: 10px">
        <a-row :gutter="16">
          <a-col :span="4" v-for="item in horoscope" :key="item.id" style="margin-top: 1%">
            <a-tooltip>
              <template #title>{{ item.horo }}</template>
              <a-card :title="item.horo" class="contTitle" :bordered="false" :style="bgColorStyle">
                <template #extra>
                  <a :href="item.info" target="_blank">详情</a>
                </template>
                <span>{{ item.date }}</span>
              </a-card>
            </a-tooltip>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BgColorsOutlined } from '@ant-design/icons-vue';

// 星座数据
import { nanoid } from 'nanoid';
import HoroScopeData from './horoScope.json';
interface JsonItem {
  id: string;
  horo: string;
  date: string;
  info: string;
}
const horoscope: JsonItem[] = HoroScopeData.map((item: Omit<JsonItem, 'id'>) => ({
  ...item,
  id: nanoid(),
}));

// 随意颜色背景
interface BgColorItem {
  deg: number;
  colorOne: string;
  colorTwo: string;

  colorThree: string;
}
const generateRandomColor = (): BgColorItem => {
  const randomColor = (): string =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.random().toFixed(2)})`;
  let deg = Math.floor(Math.random() * 360);
  let colorOne = randomColor();
  let colorTwo = randomColor();
  let colorThree = randomColor();
  return { deg, colorOne, colorTwo, colorThree };
};
// 背景色
let randomColors = ref<BgColorItem>(generateRandomColor());
const bgColorStyle = computed(() => {
  return {
    background: `linear-gradient(${randomColors.value.deg}deg, ${randomColors.value.colorOne}, ${randomColors.value.colorTwo}, ${randomColors.value.colorThree})`,
  };
});

// 点击更换星座背景色
let updateBgColor = () => {
  randomColors.value = generateRandomColor();
};
</script>

<style lang="less" scoped>
#horoDescription {
  > div > div.ant-card-body > div {
    background-color: white !important;
    padding: 0px !important;
  }
}
</style>
