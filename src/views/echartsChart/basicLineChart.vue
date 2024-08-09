<template>
  <div>
    <h3>基础折线图</h3>
    <div id="basicLine" style="width: 80%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
// 引入echarts
import * as echarts from 'echarts';
// 引入
import { onMounted, nextTick, reactive } from 'vue';

// 一进来就调用
onMounted(() => {
  drawChart(newPrArr, newTimArr, endSameArr);
});

// 造原数据
const dataList = reactive([
  { timer: '2024-08-09 10:42:33', price: 514.9 },
  { timer: '2024-08-09 09:49:02', price: 495.9 }, // 写两个相同的数据
  { timer: '2024-08-09 09:49:02', price: 495.9 }, // 写两个相同的数据
  { timer: '2024-08-10 18:40:51', price: 479.0 },
  { timer: '2024-07-20 14:36:52', price: 559.0 }, // 写三个相同的数据
  { timer: '2024-07-20 14:36:52', price: 559.0 }, // 写三个相同的数据
  { timer: '2024-07-20 14:36:52', price: 559.0 }, // 写三个相同的数据
  { timer: '2024-08-08 10:56:12', price: 569.0 },
  { timer: '2024-08-10 15:10:02', price: 489.0 },
]);

// 设置空数组存放重置好的原数据
let newLineArr = reactive([]);
// 遍历原数据把定好的数据存放到 newLineArr 中
dataList.forEach((item) => {
  let date = new Date(item.timer).getTime() / 1000 + ':' + item.price * 100;
  newLineArr.push(date);
});
// console.log(newLineArr);
/* 
打印如下：转换时间戳和价格的格式通过 ： 分隔开
0: "1723171353:51490"
1: "1723168142:49590"
2: "1723168142:49590"
3: "1723286451:47900"
4: "1721457412:55900"
5: "1721457412:55900"
6: "1721457412:55900"
7: "1723085772:56900"
8: "1723273802:48900"
*/

// JS统计重复元素
function addSameElement(arr) {
  let count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i]]) {
      count[arr[i]]++;
    } else {
      count[arr[i]] = 1;
    }
  }
  return count;
}

// 统计重置好的原数据中有多少个相同的数据
const sameElement = addSameElement(newLineArr);
// console.log(sameElement);

/* 
打印如下所示：后面的数字代表有多少个相同的
1721457412:55900: 3
1723085772:56900: 1
1723168142:49590: 2
1723171353:51490: 1
1723273802:48900: 1
1723286451:47900: 1
*/

// 时间戳转日期格式
function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  // 格式化日期和时间
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  // 返回格式化后的字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 创造新数组存放最终相同的数据元素
const endSameArr = reactive([]);
// 创造新数组存放最终的时间数据
const newTimArr = reactive([]);
// 创造新数组存放最终的价格数据
const newPrArr = reactive([]);

// 循环遍历 sameElement，取出需要的数据并存放到 newTimArr, newPrArr, endSameArr中
for (let key in sameElement) {
  // 通过 ： 分隔开
  let splitArr = key.split(':');
  // 通过时间戳再次转换成日期格式并使用 slice() 方法去掉年
  let newTime = timestampToDate(splitArr[0] * 1000).slice(5);
  // 转换价格
  let newPrice = splitArr[1] / 100;
  // 这里是后期 echarts 中 markPoint 所用到的数据格式
  let rose = { name: key, value: sameElement[key], xAxis: newTime, yAxis: splitArr[1] / 100 };
  if (sameElement[key] > 1) {
    // 如果 相同数据大于 1 的说明重复，需要利用起来再存到最终使用的新数组中
    endSameArr.push(rose);
  }
  // 其它数据存到需要使用到的数组中
  newTimArr.push(newTime);
  newPrArr.push(newPrice);
}
// console.log(endSameArr);
/* 
[
    0: {
      name: "1723168142:49590"
      value: 2
      xAxis: "08-09 09:49:02"
      yAxis: 495.9
    },
    1:{
      name: "1721457412:55900"
      value: 3
      xAxis: "07-20 14:36:52"
      yAxis: 559
    }
]
*/

// console.log(newTimArr);
/* 
[
    0: "08-09 10:42:33"
    1: "08-09 09:49:02"
    2: "08-10 18:40:51"
    3: "07-20 14:36:52"
    4: "08-08 10:56:12"
    5: "08-10 15:10:02"
]
*/
// console.log(newPrArr);
/* 
[
    0: 514.9
    1: 495.9
    2: 479
    3: 559
    4: 569
    5: 489
]
*/

function drawChart(newPrArr, newTimArr, endSameArr) {
  var myChart = echarts.init(document.getElementById('basicLine'));
  // 指定图表的配置项和数据
  // 该处就是图表内容，在官网的示例里面，要复制过来到项目里面的也是这一块内容
  var option = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {
      trigger: 'axis', // 悬浮时显示数据
    },
    xAxis: {
      name: '日期',
      data: newTimArr, // 时间数据
      type: 'category',
    },
    yAxis: {
      name: '价格',
      type: 'value',
    },
    series: [
      {
        name: '详情',
        type: 'line',
        data: newPrArr, // 价格数据
        markPoint: {
          data: endSameArr, // 传入相同需要的数据
        },
        label: {
          show: true,
          position: 'bottom',
          fontSize: 16,
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>

<style lang="less" scoped></style>
