//vue3框架提供的方法createApp方法，可以用来创造应用实例方法
import { createApp } from 'vue'

//引入清除默认样式
import '@/style/reset.scss'

//引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue';
import HospitalBottom from '@/components/hospital_bottom/index.vue';
import Login from '@/components/login/index.vue'
// import HospitalBottom from '../src/'

//引入vue-router
import router from '@/router';

//引入pinia仓库
import pinia from "@/store";

//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


//引入跟组件App
import App from '@/App.vue'

//引入路由鉴权文件
import './permisstion';

//利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App);

app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom);
app.component('Login',Login);

//安装vue-router
app.use(router);

//安装element-plus
app.use(ElementPlus,{
    locale:zhCn,
});

//安装pinia仓库
app.use(pinia);



// createApp(App).mount('#app')
app.mount("#app");
