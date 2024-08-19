<template>
  <div id="checkAndOut">
    <div class="checkInAndOut">
      <span>
        <label for="check-in-date">入住日期：</label>
        <input type="date" class="check-in-date" v-model="checkInDate" />
      </span>
      <p class="night">住 {{ nights }} 晚</p>
      <span>
        <label for="check-out-date">退房日期：</label>
        <input type="date" class="check-out-date" v-model="checkOutDate" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入
import { ref, computed } from 'vue';
// 定义入住时间
let checkInDate = ref<string>('');
// 定义离店时间
let checkOutDate = ref<string>('');
// 通过计算属性计算出住了几天
const nights = computed(() => {
  if (checkInDate.value && checkOutDate.value) {
    const checkIn = new Date(checkInDate.value);
    const checkOut = new Date(checkOutDate.value);
    // Math.abs() 方法可返回一个数的绝对值
    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    // Math.ceil() 方法可对一个数进行上舍入。
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  } else {
    return 0;
  }
});
</script>

<style lang="less" scoped>
#checkAndOut {
  .checkInAndOut {
    display: flex;
    justify-content: center;
    align-items: baseline;
    background-color: #f8f9fa;
    width: 600px;
    margin: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 5px 2px 10px rgb(105, 221, 241);
    border: 1px solid black;
    .night {
      font-size: 16px;
      color: lightseagreen;
      font-weight: 700;
      margin: 0 30px;
    }
  }
}
</style>
