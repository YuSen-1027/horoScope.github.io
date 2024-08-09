import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import 'default-passive-events'

const app = createApp(App);

app.use(Antd).mount('#app');