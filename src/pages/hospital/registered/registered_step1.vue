<template>
    <div class="container">
        <!-- 头部 -->
        <div class="head">
            <div class="head-title">确认挂号信息</div>
            <el-button type="primary" size="large" style="width: 100px;" :disabled="userIndex == -1" @click="Ensure">确认挂号</el-button>
        </div>
        <!-- 身体：展示就诊人信息-->
        <div class="body"> 
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>请点击选择就诊人</span>
                        <el-button type="success" @click="addUser">
                            <svg t="1701666257859" style="margin: 0 5px 0 0;" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2699" width="16" height="16">
                                <path
                                    d="M 634.061 483.328 c 58.1632 -37.0688 97.0752 -102.195 97.0752 -176.128 c 0 -115.098 -93.7984 -208.896 -208.896 -208.896 S 313.344 192.102 313.344 307.2 c 0 74.1376 38.912 139.059 97.0752 176.128 C 248.013 531.661 129.024 682.189 129.024 860.16 c 0 13.5168 11.0592 24.576 24.576 24.576 s 24.576 -11.0592 24.576 -24.576 c 0 -189.645 154.419 -344.064 344.064 -344.064 S 866.304 670.515 866.304 860.16 c 0 13.5168 11.0592 24.576 24.576 24.576 s 24.576 -11.0592 24.576 -24.576 c 0 -177.971 -118.989 -328.499 -281.395 -376.832 Z M 362.496 307.2 c 0 -88.064 71.68 -159.744 159.744 -159.744 s 159.744 71.68 159.744 159.744 s -71.68 159.744 -159.744 159.744 s -159.744 -71.68 -159.744 -159.744 Z"
                                    p-id="2700" fill="#fcfcfc"></path>
                            </svg>
                            添加就诊人</el-button>
                    </div>
                </template>
                <div class="box-cards">
                    <div class="box" style="padding: 0;" @click="changeIndex(index)" v-for="(item,index) in userArr" :key="item.id" :index="index" :userIndex="userIndex">
                        <div class="box-top">
                            <div style="width: 100px; height: 40px; display: flex; align-items: center;">
                                <span
                                    style="margin: 0 10px 0 0px; font-size: 14px; width: 40px; height: 20px; background-color: #fff; text-align: center; line-height: 20px;">{{item.isInsure == 1?"医保":"自费"}}</span>
                                <span style="color: #aaa; font-size: 20px;">{{ item.name }}</span>
                            </div>
                            <el-button type="primary" circle @click="editButton(item.id)">
                                <svg t="1701667513889" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4753" width="16" height="16">
                                    <path
                                        d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"
                                        p-id="4754" fill="#ffffff"></path>
                                    <path
                                        d="M355.9 534.9L354 653.8c-0.1 8.9 7.1 16.2 16 16.2h0.4l118-2.9c2-0.1 4-0.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-415.8 415c-1.4 1.5-2.3 3.5-2.3 5.6z m63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1 0.7-46.4z"
                                        p-id="4755" fill="#ffffff"></path>
                                </svg>
                            </el-button>
                        </div>
                        <div class="box-bottom">
                            <div style="width:     100%; font-size: 15px;">
                                <span>证件类型: </span>
                                <span style="color: #bbb;">{{ item.param.certificatesTypeString }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>证件号码: </span>
                                <span style="color: #bbb;">{{ item.certificatesNo }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>用户性别: </span>
                                <span style="color: #bbb;">{{ item.sex == 0?'女':'男' }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>出生日期: </span>
                                <span style="color: #bbb;">{{ item.birthdate }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>手机号码: </span>
                                <span style="color: #bbb;">{{ item.phone }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>婚姻状况: </span>
                                <span style="color: #bbb;">{{ item.isMarry == 0?'未婚':'已婚' }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>当前住址: </span>
                                <span style="color: #bbb;">{{ item.param.cityString }}</span>
                            </div>
                            <div style="width: 100%; font-size: 15px;">
                                <span>详细住址: </span>
                                <span style="color: #bbb;">{{ item.param.fullAddress }}</span>
                            </div>
                            <div class="Select" v-show="index === userIndex">已选择</div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!-- 底部：展示医生的信息 -->
        <div class="foot">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>
                    </div>
                </template>
                <div class="text item">
                    <el-descriptions direction="horizontal" :column="2" border>
                        <el-descriptions-item label="就诊日期">{{ docinfo.workDate }}</el-descriptions-item>
                        <el-descriptions-item label="就诊医院">{{ docinfo.param?.hosname }}</el-descriptions-item>
                        <el-descriptions-item label="就诊科室">{{ docinfo.param?.depname }}</el-descriptions-item>
                        <el-descriptions-item label="医生姓名">{{ docinfo.docname }}</el-descriptions-item>
                        <el-descriptions-item label="医生职称">{{ docinfo.title }}</el-descriptions-item>
                        <el-descriptions-item label="医生专长">{{ docinfo.skill }}</el-descriptions-item>
                        <el-descriptions-item label="医生服务费"> {{ docinfo.amount }} 元</el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqGetUser, reqGetDoctor } from "@/api/hospital";
import { reqSubmitOrder } from "@/api/user/index";
import { useRoute,useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

//初始化就诊信息
let userArr = ref<any>([]);

//初始化就诊医生信息
let docinfo = ref<any>({});

//初始化路由传参
let $route = useRoute();

//存储用户确诊人的索引值
let userIndex = ref<number>(-1);
let oldValue=ref<number>(-2);

//创建路由
let $router = useRouter();

//组件挂载
onMounted(() => {
    //获取就诊人信息
    reqGetUsers();
    //获取医生信息
    getDoctorInfo();
})

const reqGetUsers = async () => {
    //获取就诊人信息
    let result = await reqGetUser();
    //@ts-ignore
    if (result.code == 200) {
        userArr.value = result.data;
    }
}

const getDoctorInfo = async () => {
    let result = await reqGetDoctor($route.query.docid as string);
    //@ts-ignore
    if (result.code == 200) {
        docinfo.value = result.data;
    }


}

//用户点击那个病人信息，显示已选择，双击取消选择
const changeIndex = (index: number) => {
    //存储当前用户点击选中就诊人信息索引值
    if (oldValue.value == index) {
        userIndex.value = -1;
        oldValue.value = -2 ;
    } else {
        userIndex.value = index;
        oldValue.value = index;
    }
}

// 添加就诊人回调
const addUser = ()=>{
    $router.push({path:'/hospital/registered_step2'})
}

//修改按钮的回调
const editButton = (id: any) => {
    ElMessage({
        type: 'success',
        message: '我是修改按钮'
    })
    $router.push({ path: '/hospital/registered_step2', query: { id: id } })
}

//确定挂号回调
const Ensure =async()=>{
    // 医生编号
    let hoscode = docinfo.value.hoscode;
    // //医生名称
    let scheduleId = docinfo.value.id;
    // //就诊人ID
    let patientId = userArr.value[userIndex.value].id;
    // //发送请求
    let result = await reqSubmitOrder(hoscode,scheduleId,patientId)
    //@ts-ignore
    if (result.code == 200) {
        $router.push({path:'/vipuser/order',query:{orderId:result.data as any}});
        ElMessage({
            type:'success',
            message:'请确认信息',
        })
    }
}

</script>
<script lang="ts">
export default {
    name: 'registered_step1'
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    // background-color: rgba(255, 192, 203, 0.412);

    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 40px 0;
        padding: 0 20px 0 0;

        .head-title {
            font-size: 20px;
            font-weight: bolder;
        }
    }

    .body {
        .box-card {
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .box-cards {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;

                .box {
                    width: 40%;
                    margin: 30px 0;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                    transition: all .1s linear;
                    cursor: pointer;

                    .box-top {
                        width: 100%;
                        height: 12vh;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 25px;
                        background-color: #eee;
                    }

                    .box-bottom {
                        position: relative;
                        height: 340px;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        padding: 20px;

                        .Select {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            color: red;
                            width: 150px;
                            height: 150px;
                            border-radius: 50%;
                            border: 4px solid red;
                            text-align: center;
                            line-height: 150px;
                            opacity: 0.3;
                            font-size: 25px;
                            font-weight: bolder;
                            transform: rotate(-35deg);
                        }
                    }
                }

                .box:hover {
                    margin-top: 29px;
                    box-shadow: rgba(50, 50, 93, 0.636) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

                }
            }

        }
    }

    .foot {
        margin: 30px 0;
    }


}
</style>