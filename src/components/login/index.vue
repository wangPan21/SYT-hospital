<template>
    <div class="login_container">
        <el-dialog v-model="userStore.dialogFormVisible" title="用户登陆" :close-on-click-modal="false" :show-close="false"
            style="cursor:default;">
            <div class="content">
                <!-- 左侧结构：收集数据 -->
                <div class="left">
                    <div v-show="show" class="aaa">
                        <el-form class="from" :model="loginParam" :rules="rules" ref="from" :inline="true">
                            <el-form-item label="" prop="phone" style="width: 100%; ">
                                <el-input placeholder="请输入电话号码" v-model="loginParam.phone" :prefix-icon="User"></el-input>
                            </el-form-item>

                            <el-form-item label="" prop="code" style="width: 50%;">
                                <el-input placeholder="请输入验证码" v-model="loginParam.code" :prefix-icon="Lock"></el-input>
                            </el-form-item>

                            <el-form-item label="">
                                <el-button :disabled="isPhone ? false : true" type="success" @click="getCode">获取验证码

                                    <span v-show="reveal">({{ timer }})s</span>
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 登陆按钮 -->
                        <el-button type="primary" style="width: 90%;" size="default" @click="login">登陆</el-button>
                        <div style="margin: 10px 0 10px 0; width: 100%; cursor:pointer; text-align:center; color: #aaa;"
                            @click="showimg">
                            微信扫码登陆</div>
                        <svg t="1701070408002" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2333" width="32" height="32" @click="showimg"
                            style="cursor:pointer;">
                            <path
                                d="M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z"
                                fill="#50B674" p-id="2334"></path>
                            <path
                                d="M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z"
                                fill="#50B674" p-id="2335"></path>
                            <path
                                d="M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z"
                                fill="#50B674" p-id="2336"></path>
                            <path
                                d="M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z"
                                fill="#50B674" p-id="2337"></path>
                            <path
                                d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z"
                                fill="#50B674" p-id="2338"></path>
                        </svg>
                    </div>
                    <div v-show="!show">
                        <div class="main">
                            <div class="main-body">
                                <!-- 存放微信二维码的地方 -->
                                <div id="login_container"></div>
                            </div>
                            <div class="main-bottom" @click="unShowimg"
                                style="display: flex;flex-wrap: wrap; justify-content: center;">
                                <div class="text" style="width: 95%; text-align: center; margin-bottom: 10px;">手机短信验证码登录
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右侧结构 -->
                <div class="right">
                    <div class="box">
                        <div v-show="!show" style="height: 100px; width: 100%;"></div>
                        <div class="box-top">
                            <div class="box-left" style="width: 40%; height: 80%;">
                                <img style="width: 100%; height: 60%; margin:0 0 10px;" src="@/assets/images/code_app.png"
                                    alt="">
                                <svg t="1701071879153" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2519" width="16" height="16">
                                    <path
                                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                        fill="#5D5D5D" p-id="2520"></path>
                                </svg>
                                <div class="text">微信扫一扫关注</div>
                                <div class="text">“快速预约挂号”</div>
                            </div>
                            <div class="box-right" style="width: 40%; height: 80%;">
                                <img style="width: 100%; height: 60%; margin:0 0 10px;"
                                    src="@/assets/images/code_login_wechat.png" alt="">
                                <svg t="1701071940324" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3601" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="3602"></path>
                                </svg>
                                <div class="text">扫一扫下载</div>
                                <div class="text">“预约挂号App”</div>
                            </div>
                        </div>
                        <div class="box-bottom">
                            <div class="title">好医生官方指定平台</div>
                            <div class="title">快速挂号 安全放心</div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <el-button @click="close">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reqWxLogin } from "@/api/hospital/index";
import type { WXLoginResponseData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";
//引入仓库数据，控制dialog显示与隐藏
import useUserStore from "@/store/modules/user";

let $route = useRoute();
let $router = useRouter();

let userStore = useUserStore();

//控制账号还是扫码登陆
let show = ref<boolean>(true); //true:账号登录 false:扫码登录

//控制倒计时显示与隐藏
let reveal = ref<boolean>(false);

//初始化倒计时
let timer = ref<number>(60)

//收集表单的数据
let loginParam = reactive({
    phone: '',
    code: ''
})

//获取from组件实例
let from = ref<any>()

//登陆按钮回调
const login = async () => {
    //表单校验
    await from.value.validate();
    //通过，发起登陆请求，反之
    try {
        //登陆请求成功：顶部组件需要展示用户名字、对话框关闭
        await userStore.userLogin(loginParam);
        ElMessage({
            type: 'success',
            message: "登陆成功"
        })
        userStore.dialogFormVisible = false;
        //获取url的query参数
        let redirect = $route.query.redirect;
        if (redirect) {
            $router.push(redirect as string)
            location.reload();
        } else {
            $router.push('/home');
            location.reload();
        }
    } catch (error) {
        //登陆请求失败：弹出对应登陆失败的错误信息
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}

//点击切换微信扫码
const showimg = async () => {
    //切换为扫码登陆
    show.value = false;
    //向后端发送请求，获取扫码登陆页面的参数，扫码成功后重定向到项目的某一个页面，前端会生成一个微信二维码
    let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin');
    //@ts-ignore
    let result: WXLoginResponseData = await reqWxLogin(redirect_URL);
    //@ts-ignore
    new WxLogin({
        self_redirect: true, //true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，
        id: "login_container", //第三方页面显示二维码的容器id
        appid: result.data.appid, //应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope: result.data.scope, //当前微信扫码界面已经授权了
        redirect_uri: result.data.redirectUri, //重定向地址，用户授权成功后，微信服务器向公司后台推送code的地址
        state: result.data.state, //服务器重定向的地址，需要携带用户信息
        href: ""
    });
}

//点击切换账号登录
const unShowimg = () => {
    show.value = true;
}

//点击获取验证码的回调
const getCode = async () => {
    //通知pinia仓库存储验证码
    try {
        //获取验证码成功
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
        //调用倒计时方法
        startCountdown();
        reveal.value = isPhone.value;
    } catch (error) {
        //获取验证码失败
        ElMessage({
            type: 'error',
            message: ((error as Error).message)
        })
    }

}
//倒计时方法回调
const startCountdown = () => {
    const item = setInterval(() => {
        timer.value--;
        if (timer.value <= 0) {
            clearInterval(item);
            timer.value = 60
            reveal.value = false;
        }
    }, 1000);
}

//判断输入的手机号码格式是否正确
let isPhone = computed(() => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return reg.test(loginParam.phone) && !reveal.value
})

//关闭登陆｜注册按钮 ，清除数据
const close = () => {
    userStore.dialogFormVisible = false;
    //清理数据
    Object.assign(loginParam, { phone: '', code: '' })
    //清理校验规则
    from.value.resetFields();
    //默认账号登陆
    show.value = true;
    timer.value = 60;
}

//监听场景的数值
watch(() => show.value, (val: boolean) => {
    if (!val) {
        userStore.queryState();
    }
})

//表单校验规则
// required:当前字段务必进行校验
//message：错误的提示信息
//trigger：表单校验何时触发，change:文本发生变化的时候进行校验， blur:失去焦点时触发
//min/max:最大/最小的数据长度
//自定义校验规则：手机号码  rule:表单校验规则对象   value:当前文本内容   callback:触发的回调函数
const validatorPhone = (rule: any, value: any, callback: any) => {
    const res = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (res.test(value)) {
        callback()
    } else {
        callback(new Error('请输入合法的11位号码'));
    }
}
//自定义校验规则：验证码 
const validatorCode = (rule: any, value: any, callback: any) => {
    if (/^\d{6}$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入6位验证码'));
    }
}

const rules = {
    phone: [
        { required: true, trigger: 'change', validator: validatorPhone },
    ],

    code: [
        { required: true, trigger: 'change', validator: validatorCode },
    ],
}
</script>
<script lang="ts" >
export default {
    name: 'login'
}
</script>
<style lang="scss" scoped>
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
    }

    ::v-deep(.el-dialog__footer) {
        border-top: 1px solid #eee;
    }

    .content {
        display: flex;
        width: 100%;

        .left {
            width: 50%;
            border-right: 1.5px solid #ccc;

            .aaa {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                margin-top: 30px;

                .from {
                    width: 90%;
                }
            }

            .main-body {
                display: flex;
                justify-content: center;
                // margin: 0 0 0 -15px;
            }

            .el-form--inline .el-form-item {
                margin-right: 5px;
            }

            .impowerBox .qrcode {
                width: 100px;
            }

            .main-bottom {
                .text:hover {
                    color: #000;
                }
            }
        }

        .right {
            width: 50%;

            .box {
                .box-top {
                    display: flex;
                    justify-content: space-evenly;

                    .box-left {
                        display: flex;
                        align-items: center;
                        flex-direction: column;

                        .text {
                            margin-bottom: 5px;
                        }
                    }

                    .box-right {
                        display: flex;
                        align-items: center;
                        flex-direction: column;

                        .text {
                            margin-bottom: 5px;
                        }
                    }
                }

                .box-bottom {
                    font-size: 20px;
                    text-align: center;
                    margin: 20px 0 0 0;

                    .title {
                        color: #aaa;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}</style>