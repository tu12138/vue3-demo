import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import api from './api';
import 'ant-design-vue/dist/antd.css';
// 手动加载Ant非组件模块
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
// 按需引入Antv Icon
import * as Icons from "@ant-design/icons-vue";
import 'element-plus/dist/index.css';
import "./style/index.scss";
import scTable from '@/components/customComponents/c-table.vue';
// import Mockjs
import './mock';
import loadingDirective from '@/directives/loading.js'

const app = createApp(App);

// 按需引入Antv Icon
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})

// 全局注册
app.config.globalProperties.$Icons = Icons
app.config.globalProperties.$API = api

app.use(router);
app.use(store);
app.use(Antd);
app.directive('myLoading', loadingDirective)
app.component('scTable', scTable)
app.mount("#app");
