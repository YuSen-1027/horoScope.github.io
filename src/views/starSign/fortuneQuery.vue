<template>
  <div id="fortuneQuery">
    <a-card title="根据星座来看看您最近的运势吧！" style="width: 100%">
      <!-- 查询时间 -->
      <a-space>
        请选择您查询的时间：
        <a-select ref="select" v-model:value="defaultSelectTime" style="width: 200px" @change="timeChange">
          <a-select-option v-for="item in timeData" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-space>

      <!-- 查询星座 -->
      <a-space class="spaceTwo">
        请选择您查询的星座：
        <a-select ref="select" v-model:value="defaultSelectHoro" style="width: 220px" @change="horoChange">
          <a-select-option v-for="item in horoData" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-space>

      <!-- 查询按钮 -->
      <a-button type="primary" class="btnQuery" @click="queryHoroFortune">
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>

      <!-- 查询结果 -->
      <a-spin :spinning="loading">
        <a-modal
          v-model:open="horoVisible"
          width="45%"
          style="margin-top: -4%"
          title="星座运势结果"
          @ok="handleOk"
          cancelText="关闭"
          okText="朕已阅！">
          <div
            v-if="horoList.title !== ''"
            style="border-radius: 20px; position: relative; padding: 2%; background-color: #faf561">
            <div style="font-size: 80px; letter-spacing: 16px; font-weight: 600">
              <span style="margin: 0% 0% 5% 1%; color: #07a1de; text-shadow: 2px 3px 1px rgba(1, 132, 184, 0.5)">{{
                horoList.title
              }}</span>
              <span
                style="
                  font-size: 60px;
                  position: absolute;
                  bottom: 2.5%;
                  right: 22%;
                  letter-spacing: 5px;
                  color: #07a1de;
                  text-shadow: 2px 3px 1px rgba(1, 132, 184, 0.5);
                "
                >{{ horoList.time }}</span
              >
            </div>
            <div style="margin: -2% 0% -1% 0%">
              <span
                style="
                  font-size: 40px;
                  font-weight: 600;
                  position: absolute;
                  top: 6%;
                  right: 0.5%;
                  writing-mode: vertical-rl;
                  letter-spacing: 3px;
                  color: rgb(170, 5, 130);
                  text-shadow: 2px 3px 1px rgba(55, 0, 61, 0.3);
                "
                >易：{{ horoList.todo.yi }}</span
              >
              <span
                style="
                  font-size: 30px;
                  letter-spacing: 3px;
                  font-weight: 600;
                  position: absolute;
                  top: 6%;
                  right: 7.5%;
                  writing-mode: vertical-rl;
                  color: rgb(170, 5, 130);
                  text-shadow: 2px 3px 1px rgba(55, 0, 61, 0.3);
                "
                >忌：{{ horoList.todo.ji }}</span
              >
            </div>
            <div
              style="
                font-size: 70px;
                font-weight: 600;
                position: absolute;
                bottom: 1%;
                left: -0.5%;
                writing-mode: vertical-rl;
                z-index: 100;
                letter-spacing: 16px;
                color: #07a1de;
                text-shadow: 2px 3px 1px rgba(1, 132, 184, 0.5);
              ">
              {{ horoList.type }}
            </div>
            <div style="font-size: 14px; position: relative; left: 10%; width: 80%; padding: 4%">
              <div style="margin: -5% 0 10% -10%; width: 80%; position: relative; font-weight: 600">
                <span style="font-size: 16px; font-weight: 600; color: red">整体运势：</span
                ><span>{{ horoList.fortunetext.all }}</span>
              </div>
              <div
                style="margin: -30% -1% -0% 0%; width: 100%; height: 60%; writing-mode: vertical-rl; font-weight: 600">
                <span style="font-size: 16px; font-weight: 600; color: red">爱情运势：</span>
                <span>{{ horoList.fortunetext.love }}</span>
              </div>
              <div
                style="
                  margin: 10% 0 0% 2%;
                  position: absolute;
                  top: 20%;
                  left: 0;
                  height: 60%;
                  writing-mode: vertical-lr;
                  font-weight: 600;
                ">
                <span style="font-size: 16px; font-weight: 600; color: red">事业运势：</span>
                <span>{{ horoList.fortunetext.work }}</span>
              </div>
              <div style="margin: 0% 0 0% -2%; position: absolute; top: 24%; left: 30%; width: 50%; font-weight: 600">
                <span style="font-size: 16px; font-weight: 600; color: red">财富运势：</span>
                <span>{{ horoList.fortunetext.money }}</span>
              </div>
              <div style="margin: 0% 0 0% 4%; position: absolute; bottom: 20%; left: 25%; width: 50%; font-weight: 600">
                <span style="font-size: 16px; font-weight: 600; color: red">健康运势：</span>
                <span>{{ horoList.fortunetext.health }}</span>
              </div>
            </div>
            <div style="font-size: 30px; font-weight: 600; margin: 0 0 0 0.5%; width: 90%; font-weight: 600">
              <span v-if="horoList.type == '今日运势' || horoList.type == '明日运势'">
                <span style="position: absolute; top: 33%; left: 8%">
                  <span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">幸运色： </span>
                  <span>{{ horoList.luckycolor }}</span>
                </span>
                <span style="position: absolute; top: 48%; left: 32%"
                  ><span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">幸运数字：</span>
                  <span style="font-size: 50px">{{ horoList.luckynumber }}</span>
                </span>
                <span style="position: absolute; top: 62%; left: 42%"
                  ><span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">配对星座：</span>
                  {{ horoList.luckyconstellation }}</span
                >
              </span>
              <span v-if="horoList.type == '本周运势'">
                <span style="position: absolute; top: 55%; left: 35%"
                  ><span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">向上指数：</span
                  >{{ horoList.uptype }}</span
                >
              </span>
              <span v-if="horoList.type == '本月运势'">
                <span style="position: absolute; top: 57%; left: 35%"
                  ><span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">向上指数：</span
                  >{{ horoList.uptype }}</span
                >
                <span style="position: absolute; bottom: 2%; right: 1%; writing-mode: vertical-rl"
                  ><span style="color: rgb(232, 22, 22); text-shadow: 2px 3px 1px rgba(19, 0, 0, 0.2)">幸运活动：</span
                  >{{ horoList.fortunetext.openluck }}</span
                >
              </span>
            </div>
          </div>
        </a-modal>
      </a-spin>
      <!-- 其它 -->
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
// 引入搜索icon
import { SearchOutlined, DribbbleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
/* 定义 TS 类型 */
// 定义 TimeDataItem 接口
interface TimeDataItem {
  value: string;
  label: string;
}
// 定义 TimeDataItem 接口
interface HoroDataItem {
  value: string;
  label: string;
}
// 定义 horoList 接口
interface HoroData {
  title: string;
  time: string;
  type: string;
  index: { all: number; love: number; work: number; money: number; health: number };
  fortunetext: { all: string; love: string; work: string; money: string; health: string; openluck: string };
  luckycolor: string;
  luckynumber: string;
  luckyconstellation: string;
  todo: { yi: string; ji: string };
  uptype: string;
}

/* 需要用的到数据 */
const defaultSelectTime = ref<string>('今日'); // 默认今日
const defaultSelectHoro = ref<string>('白羊座'); // 默认星座
const timer = ref<string>('');
const horo = ref<string>('');
let horoList = reactive<HoroData>({
  title: '',
  time: '',
  type: '',
  index: { all: 0, love: 0, work: 0, money: 0, health: 0 },
  fortunetext: { all: '', love: '', work: '', money: '', health: '', openluck: '' },
  luckycolor: '',
  luckynumber: '',
  luckyconstellation: '',
  todo: { yi: '', ji: '' },
  uptype: '',
});
const loading = ref<boolean>(false);
const horoVisible = ref<boolean>(false);

/* 时间数据 */
// 使用接口类型来定义 timeData 数组
const timeData: TimeDataItem[] = [
  { value: 'today', label: '今日' },
  { value: 'nextday', label: '明日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
];
// 选择时间
const timeChange = (value: string) => {
  // console.log(`selected ${value}`);
  timer.value = value;
};

/* 星座数据 */
// 使用接口类型来定义 horoData 数组
const horoData: HoroDataItem[] = [
  { value: 'aquarius', label: '水瓶座' },
  { value: 'pisces', label: '双鱼座' },
  { value: 'aries', label: '白羊座' },
  { value: 'taurus', label: '金牛座' },
  { value: 'gemini', label: '双子座' },
  { value: 'cancer', label: '巨蟹座' },
  { value: 'leo', label: '狮子座' },
  { value: 'virgo', label: '处女座' },
  { value: 'libra', label: '天秤座' },
  { value: 'scorpio', label: '天蝎座' },
  { value: 'sagittarius', label: '射手座' },
  { value: 'capricorn', label: '摩羯座' },
];
// 选择星座
const horoChange = (value: string) => {
  // console.log(`selected ${value}`);
  horo.value = value;
};

/* 去掉百分号并转换为数字的函数 */
const convertToNumber = (data: { [key: string]: string }): { [key: string]: number } => {
  const result: { [key: string]: number } = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = parseFloat(data[key].replace('%', ''));
    }
  }
  return result;
};

/* 获取数据 */
// 定义获取星座数据的异步函数
const queryHoroFortune = async () => {
  horoVisible.value = true;
  if (horo.value === '' || horo.value === null || horo.value === undefined) {
    horo.value = 'aries';
  }
  if (timer.value === '' || timer.value === null || timer.value === undefined) {
    timer.value = 'today';
  }
  // console.log(horo.value, timer.value);
  loading.value = true;
  try {
    const { data } = await axios.get(`https://api.vvhan.com/api/horoscope?type=${horo.value}&time=${timer.value}`);
    if (data.success == true) {
      data.data.index = convertToNumber(data.data.index);
      horoList = data.data; // 存储返回的数据
      // console.log(horoList);
    } else {
      alert('获取数据失败，请重试');
    }
  } catch (error) {
    console.error('请求错误:', error);
  } finally {
    loading.value = false;
  }
};

const handleOk = (e: MouseEvent) => {
  horoVisible.value = false;
  message.success({
    content: () => '先成为自己的山,再去找心中的海!',
    class: 'custom-class',
    style: {
      marginTop: '2vh',
    },
  });
};
onMounted(() => {
  // console.log(horoList);
  // horoVisible.value = true;
});
</script>

<style lang="less" scoped>
#fortuneQuery {
  margin-top: 10px;
  .spaceTwo {
    margin-left: 50px;
  }
  .btnQuery {
    margin-left: 50px;
    width: 120px;
  }
}
</style>
