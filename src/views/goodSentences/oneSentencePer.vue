<template>
  <div id="oneSentencePer">
    <a-spin :spinning="loading">
      <a-card title="一言句子" :style="{ marginTop: '1px' }">
        <template #extra>
          请选择您查询的类型：
          <a-select
            ref="select"
            v-model:value="defaultType"
            style="width: 100px; margin-right: 16px"
            @change="typeChange">
            <a-select-option v-for="item in typeData" :key="item.content" :value="item.content">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <a-button type="primary" @click="queryWords">点我查看</a-button>
        </template>
        <span v-if="wordsData == ''" class="default_color">暂无数据</span>
        <span v-else class="font_color">
          <a-tooltip>
            <template #title>{{ wordsData }}</template
            >{{ wordsData }}
          </a-tooltip>
        </span>
      </a-card>
      <a-card title="情话大全" :style="{ marginTop: '10px' }">
        <template #extra>
          <a-button type="primary" @click="loveTalks">点我查看</a-button>
        </template>
        <span v-if="loveWords == ''" class="default_color">暂无数据</span>
        <span v-else class="font_color">
          <a-tooltip>
            <template #title>{{ loveWords }}</template
            >{{ loveWords }}
          </a-tooltip></span
        >
      </a-card>
      <a-card title="笑口常开" :style="{ marginTop: '10px' }">
        <template #extra>
          <a-button type="primary" @click="laughterOpen">点我查看</a-button>
        </template>
        <span v-if="laughterWords == ''" class="default_color">暂无数据</span>
        <span v-else class="font_color">
          <a-tooltip>
            <template #title>{{ laughterWords }}</template
            >{{ laughterWords }}
          </a-tooltip></span
        >
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
/* 定义类型 */
// 定义 TimeDataItem 接口
interface typeDataItem {
  label: string;
  content: string;
}

/* 定义数据 */
const defaultType = ref<string>('随机'); // 默认选项
const typer = ref<string>(''); // 一言句子选择类型
const loading = ref<boolean>(false); // 加载中
const wordsData = ref<string>(''); // 一言句子数据
const loveWords = ref<string>(''); // 情话大全数据
const laughterWords = ref<string>(''); // 笑口常开数据

// 使用接口类型来定义 timeData 数组
const typeData: typeDataItem[] = [
  { content: 'rand', label: '随机' },
  { content: 'dongman', label: '动漫' },
  { content: 'wenxue', label: '文学' },
  { content: 'shici', label: '诗词' },
];

/* 函数 */
// 选择时间
const typeChange = (value: string) => {
  //   console.log(`selected ${value}`);
  typer.value = value;
};

// 一言句子
const queryWords = async () => {
  loading.value = true;
  if (typer.value === '' || typer.value === null || typer.value === undefined) {
    typer.value = 'rand';
  }
  try {
    const { data } = await axios.get(`https://api.vvhan.com/api/ian/${typer.value}?type=json`);
    // console.log(data);
    if (data.success == true) {
      wordsData.value = data.data.content;
    } else {
      alert('获取数据失败，请重试');
    }
  } catch (error) {
    console.error('请求错误:', error);
  } finally {
    loading.value = false;
  }
};
// 情话大全
const loveTalks = async () => {
  try {
    const { data } = await axios.get(`https://api.vvhan.com/api/text/love?type=json`);
    if (data.success == true) {
      loveWords.value = data.data.content;
    } else {
      alert('获取数据失败，请重试');
    }
  } catch (error) {
    console.error('请求错误:', error);
  } finally {
    loading.value = false;
  }
};

// 笑口常开
const laughterOpen = async () => {
  try {
    const { data } = await axios.get(`https://api.vvhan.com/api/text/joke?type=json`);
    if (data.success == true) {
      laughterWords.value = data.data.content;
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
#oneSentencePer {
  .default_color {
    color: rgb(255, 115, 0);
    font-size: 18px;
    font-weight: 600;
  }
  .font_color {
    color: red;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
