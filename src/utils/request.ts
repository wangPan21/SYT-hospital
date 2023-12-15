import { ElMessage } from "element-plus";
//对于axios函数库进行二次封装？
//为什么对axios进项二次封装？  
//二次封装的目的是什么？
//利用axios请求、响应拦截器功能，
// 请求拦截器一般可以在请求头中携带公共的参数 eg:toKen，
// 响应拦截器可以简化服务器带来的参数，处理Http的网络错误
import axios from "axios";
//引入token
import useUserStore  from "@/store/modules/user";

//利用axios.create方法创建一个axios实例：可以设置基础路径、超时的时间设置
const request = axios.create({
    baseURL:'/api',//请求的基础路径
    timeout:5000,//超时的时间设置
});

//请求拦截器   config是请求拦截器回调注入的对象（配置对象）
request.interceptors.request.use((config)=>{
    //获取用户仓库
    let userStore = useUserStore();
    //已登录
    if (userStore.userInfo.token) {
        //在请求头携带本地的token
        config.headers.token =  userStore.userInfo.token;
    }
    //不返回，请求无法发送
    return config;
});

// 响应拦截器
request.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    let status = error.response.status;
    switch (status) {
        case 404:
            ElMessage({
                type:'error',
                message:'请求失败路径出现问题'
            })
            break;
        case 401:
                ElMessage({
                    type:'error',
                    message:'请求参数有误'
                })
            break;
        case 500|501|502|503|504|505:
            ElMessage({
                type:'error',
                message:'服务器开小差'
            })
            break;

    }
    // 处理http网络错误
    return Promise.reject(new Error(error.message))
});


// 必须暴漏axios
export default request;