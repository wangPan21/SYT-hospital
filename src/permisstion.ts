//路由鉴权：路由能不能被访问到的权限设置 -->全局守卫
import router from "./router";
//@ts-ignore 引入进度条
import Nprogress  from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//引入用户仓库
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
let useUser = useUserStore(pinia);

//存储用户未登录可以访问的路由
let disLogin =['/home','/hospital/registered','/hospital/detail','/hospital/notify','/hospital/message','/hospital/message']

Nprogress.configure({ showSpinner: false });
//添加项目的全局守卫
//前置守卫
router.beforeEach((to,from,next)=>{
    // 访问路由组件前，启动进度条
    Nprogress.start();
    //动态设置左上角网页标题
    document.title=`尚医通-${to.meta.title}`;
    //判断用户是否登录 --token
    let token = useUser.userInfo.token;
    //登录
    if (token) {
        next();
    } else {
        //未登录
        if (disLogin.includes(to.path)) {
            next()
        }else{
            //跳转到首页，并显示登录组件
            useUser.dialogFormVisible = true;
            next({path:'/home',query:{redirect:to.fullPath}})
        }
    }

});

//后置路由守卫
router.afterEach((to,from)=>{
    //访问路由组件成功，进度条结束
    Nprogress.done();
})

