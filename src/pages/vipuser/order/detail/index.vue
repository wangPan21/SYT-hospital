<template>
    <div class="content">
        <el-card  class="box-card">
                <!-- 上 -->
                <template #header>
                    <div>
                        <span style="font-size: 22px;">挂号详情</span>
                    </div>
                </template>
                <!-- 中 -->
                <div class="card-headers">
                    <el-tag class="ml-2" type="success">
                        <el-icon>
                            <Check />
                        </el-icon>
                        {{ orderInfo.param?.orderStatusString }}</el-tag>
                    <div class="right">
                        <img src="../../../../assets/images/code_login_wechat.png" alt="" style="width: 40px;height: 40px;">
                        <span>
                            微信
                            <svg t="1701759301337" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2368" width="16" height="16">
                                <path
                                    d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
                                    fill="#0e932e" p-id="2369"></path>
                                <path
                                    d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                                    fill="#0e932e" p-id="2370"></path>
                            </svg>
                            关注“北京114预约挂号“快速预约挂号”
                        </span>
                    </div>
                </div>
                <!-- 下 -->
                <div class="bottom">
                    <div class="bottom-left">
                        <el-descriptions class="margin-top" :column="1" border style="margin-bottom: 20px; ">

                            <el-descriptions-item align="center" width="100px">
                                <template #label>
                                    <div class="cell-item">
                                        就诊人信息
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.patientName }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        就诊日期
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.reserveDate }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        就诊医院
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.hosname }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        就诊科室
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.depname }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        医生职称
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.title }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        医师服务费
                                    </div>
                                </template>
                                <span style="color: red;">{{ orderInfo.amount }}元</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        挂号单号
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.outTradeNo }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item align="center">
                                <template #label>
                                    <div class="cell-item">
                                        挂号时间
                                    </div>
                                </template>
                                <span style="color: #aaa;">{{ orderInfo.createTime }}</span>
                            </el-descriptions-item>
                        </el-descriptions>
                        <div v-if="orderInfo.orderStatus != -1">
                            <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="Pay">支付</el-button>
                            <el-popconfirm title="您确定要取消预约吗?" @confirm="cancel">
                                <template #reference>
                                    <el-button>取消预约</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                    <div class="bottom-right">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>注意事项</span>
                                </div>
                            </template>
                            <div class="Title">
                                <div class="title">
                                    1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;
                                </div>
                                <div class="title" style="color: red;">
                                    2.【取号】就诊当天需在{{ orderInfo.createTime }}在医院取号，未取号视为爽约，该号不退不换；
                                </div>
                                <div class="title">
                                    3.【退号】在{{ orderInfo.quitTime }}可在线退号，逾期将不可办理退号退费
                                </div>
                                <div class="title">
                                    4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患
                                    者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用
                                    的有效身份证件到院取号；
                                </div>
                                <div class="title">
                                    5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-card>
            <!-- 支付二维码-->
            <el-dialog @close="close" v-model="dialogTableVisible" title="微信支付" width="25%" class="pay">
                <!-- 支付需要的二维码 -->
                <img :src="imgUrl" alt="" style="width: 90%; height: 90%;">
                <div>请使用微信扫一扫</div>
                <div style="margin-top: 5px;">扫描上方二维码</div>
                <template #footer>
                    <el-button @click="closes">关闭</el-button>
                </template>
            </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {reqGetIndent,reqCancelOrder, reqWxCreateImg, reqPayStatus  } from '@/api/user/index';
import { useRoute } from "vue-router";
import type { OrderInfo } from "@/api/user/type";
import { ElMessage } from "element-plus";
import { Check } from '@element-plus/icons-vue';
//@ts-ignore
import QRCode from 'qrcode'

let $route = useRoute();

//初始化微信支付二维码
let imgUrl = ref<string>()

//控制支付界面显示与隐藏
let dialogTableVisible = ref<boolean>(false);

//定时器的引用
let timer = ref<any>()

//初始化挂号详情数据
let orderInfo = ref<OrderInfo>({} as OrderInfo)

//组件挂载完毕
onMounted(() => {
    getIndent();
})

//获取挂号详情的数据
const getIndent = async () => {
    let result = await reqGetIndent($route.query.orderId as any)
    //@ts-ignore
    if (result.code == 200) {
        //@ts-ignore
        orderInfo.value = result.data;
    } 
}

//取消预约的回调
const cancel = async () => {
    try {
        await reqCancelOrder($route.query.orderId as string)
        getIndent()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消预约失败'
        })
    }
}

//支付按钮回调
const Pay = async () => {
    // 展示对话框
    dialogTableVisible.value = true;
    //发送请求
    let result = await reqWxCreateImg($route.query.orderId as string)
    //@ts-ignore
    imgUrl.value = await QRCode.toDataURL(result.data.codeUrl);
    //长轮询，每隔几秒查看支付状态
    timer.value = setInterval(async () => {
        let results = await reqPayStatus($route.query.orderId as string)
        //@ts-ignore
        if (results.data) {
            // 关闭对话框
            dialogTableVisible.value = false;
            ElMessage({
                type: 'success',
                message: '支付成功'
            })
            // 关闭定时器
            clearInterval(timer.value)
            //再次渲染页面
            getIndent();
        }
    }, 2000)
}

//支付关闭按钮
const closes = () => {
    dialogTableVisible.value = false;
    clearInterval(timer.value)
}

//支付右上角X按钮
const close = () => {
    clearInterval(timer.value)
}
</script>
<script lang="ts">
export default {
    name:'Detail'
}
</script>
<style lang="scss" scoped>
.content {
    .box-card {
        .card-headers {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 20px;
            border-bottom: 1.5px solid #e4e7ed;

            .right {
                display: flex;
                font-size: 14px;
                width: 240px;

                span {
                    width: 200px;
                    line-height: 20px;
                }
            }

        }

        .bottom {
            display: flex;
            margin-top: 20px;

            .bottom-left {
                width: 48%;
                margin-right: 4%;
            }

            .bottom-right {
                width: 48%;

                .box-card {
                    .Title {
                        .title {
                            line-height: 25px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    ::v-deep(.el-dialog__body) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #aaa;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
    }
}
</style>