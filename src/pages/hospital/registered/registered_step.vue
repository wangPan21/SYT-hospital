<template>
    <div class="body">
        <!-- 顶部 -->
        <div class="body-top">
            <span>{{ workData.baseMap?.hosname }}</span>｜
            <span>{{ workData.baseMap?.bigname }}</span> ·
            <span>{{ workData.baseMap?.depname }}</span>
        </div>
        <!-- 中间 -->
        <div class="body-center">
            <div class="body-center-title">{{ workData.baseMap?.workDateString }}</div>
            <div class="body-center-box"
                :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate == workTime.workDate }"
                v-for="item in workData.bookingScheduleList" :key="item" @click="workTimes(item)">
                <div class="body-center-boxTop">
                    {{ item.workDate }} {{ item.dayOfWeek }}
                </div>
                <div class="body-center-boxBottom">
                    <div v-if="item.status == -1">停止挂号</div>
                    <div v-if="item.status == 0">
                        {{ item.availableNumber == -1 ? '无号' : `有号(${item.availableNumber})个` }}
                    </div>
                    <div v-if="item.status == 1">即将放号</div>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="body-pagination">
            <el-pagination layout="prev, pager, next" :total="Number(workData.total)" v-model:current-page="pageNo"
                @current-change="getHospitalWork" />
        </div>
        <!-- 底部:展示医生的结构 -->
        <div class="body-bottom">

            <!-- 即将放号展示信息 -->
            <div class="will" v-if="workTime.status == 1">
                <span>2023年12月2号放号</span>
            </div>

            <!-- 有号展示信息 -->
            <div class="register" v-else>
                <!-- 上午号源 -->
                <div class="body-bottoms">
                    <div class="body-bottoms-top">
                        <svg t="1701586449561" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3740" width="18" height="18">
                            <path
                                d="M512.000213 733.353497c-122.06857 0-221.353283-99.284713-221.353283-221.353284S389.931643 290.64693 512.000213 290.64693 733.353497 389.931643 733.353497 512.000213 634.026117 733.353497 512.000213 733.353497z m0-357.373767A136.148482 136.148482 0 0 0 375.97973 512.000213 136.148482 136.148482 0 0 0 512.000213 648.020697 136.148482 136.148482 0 0 0 648.020697 512.000213 136.148482 136.148482 0 0 0 512.000213 375.97973zM554.666613 171.735673A42.154403 42.154403 0 0 1 512.000213 213.335413c-23.551853 0-42.6664-18.645217-42.6664-41.59974V41.603153A42.154403 42.154403 0 0 1 512.000213 0.003413c23.551853 0 42.6664 18.645217 42.6664 41.59974v130.13252zM554.666613 982.397273A42.154403 42.154403 0 0 1 512.000213 1023.997013c-23.594519 0-42.6664-18.687883-42.6664-41.59974v-130.175186A42.111737 42.111737 0 0 1 512.000213 810.665013c23.551853 0 42.6664 18.60255 42.6664 41.59974v130.13252zM171.735673 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.645217 42.6664-41.59974 42.6664H41.603153A42.154403 42.154403 0 0 1 0.003413 512.000213c0-23.551853 18.645217-42.6664 41.59974-42.6664h130.13252zM982.397273 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.687883 42.6664-41.59974 42.6664h-130.175186A42.111737 42.111737 0 0 1 810.665013 512.000213c0-23.551853 18.60255-42.6664 41.59974-42.6664h130.13252zM241.239239 722.430898a42.06907 42.06907 0 0 1 59.562294 0.767995 42.111737 42.111737 0 0 1 0.767996 59.562295l-92.031425 92.074091a42.154403 42.154403 0 0 1-59.562295-0.853328 42.154403 42.154403 0 0 1-0.767995-59.562294l92.031425-91.988759zM814.462323 149.207814a42.154403 42.154403 0 0 1 59.562294 0.767995 42.154403 42.154403 0 0 1 0.767996 59.562295l-92.031425 92.031425a42.06907 42.06907 0 0 1-59.562295-0.767996 42.111737 42.111737 0 0 1-0.810661-59.562294l92.074091-92.031425zM241.239239 301.526862a42.19707 42.19707 0 0 0 59.604961-0.725329 42.111737 42.111737 0 0 0 0.767995-59.562294L209.538104 149.122481a42.154403 42.154403 0 0 0-59.562295 0.853328 42.111737 42.111737 0 0 0-0.767995 59.562295l92.031425 91.988758zM814.462323 874.792613a42.111737 42.111737 0 0 0 59.562294-0.810662 42.154403 42.154403 0 0 0 0.767996-59.562294l-92.031425-92.031425a42.06907 42.06907 0 0 0-59.562295 0.767995 42.111737 42.111737 0 0 0-0.810661 59.562294l92.074091 92.074092z"
                                fill="#1296db" p-id="3741"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <div class="body-bottoms-center" v-for="doc in moringArr" :key="doc.id">
                        <div class="body-bottoms-center-left">
                            <span style="color:#31c4fd;">{{ doc.title }} ｜  {{ doc?.docname }}</span>
                            <span style="font-size: 14px;color: #bbb;">{{ doc.skill }}</span>
                        </div>
                        <div class="body-bottoms-center-right">
                            <span style="color:#bbb;">¥{{ doc.amount }}</span>
                            <el-button size="large" type="primary" @click="goDetails(doc)">剩余{{ doc.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <!-- 下午号源 -->
                <div class="body-bottoms">
                    <div class="body-bottoms-top" style="margin-top: 30px;">
                        <svg t="1701586599536" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6905" width="18" height="18">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#17abe3" p-id="6906"></path>
                        </svg>
                        <span>下午号源</span>
                    </div>

                    <div class="body-bottoms-center" v-for="docs in afterArr" :key="docs.id">
                        <div class="body-bottoms-center-left">
                            <span style="color:#31c4fd;">{{ docs.title }} ｜</span>
                            <span style="font-size: 14px;color: #bbb;">{{ docs.skill }}</span>
                        </div>
                        <div class="body-bottoms-center-right">
                            <span style="color:#bbb;">¥{{ docs.amount }}</span>
                            <el-button size="large" type="primary" @click="goDetails(doc)">剩余{{ docs.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital/index";
import { useRoute,useRouter } from "vue-router";

//初始化分页器当前页码
let pageNo = ref<number>(1);

//初始化每页展示数据的数量
let limit = ref<number>(6);

//初始化医院科室数据
let workData = ref<any>({})

//初始化医生排班日期
let workTime = ref<any>({});

//初始化医生排班的数据
let docArr = ref<any>([]);

//获取路由传参的数据
let $route = useRoute();

//创建一个路由
let $router = useRouter();

//组件挂在完毕，发送请求
onMounted(() => {
    getHospitalWork();
})

//发送请求，获取挂号详情数据
const getHospitalWork = async () => {
    let result = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    //@ts-ignore
    if (result.code == 200) {
        workData.value = result.data;
        //存储第一天的日期数据
        workTime.value = workData.value.bookingScheduleList[0];
        getDoctor();
    } else {
        Promise.reject(new Error('faile'))
    }
}

//获取医生某一天排班的数据
const getDoctor = async () => {
    let hoscode: string = $route.query.hoscode as string;
    let depcode: string = $route.query.depcode as string;
    let workDate: string = workTime.value.workDate;
    let result = await reqHospitalDoctor(hoscode, depcode, workDate)
    //@ts-ignore
    if (result.code == 200) {
        //存储医生排班的数据
        docArr.value = result.data;
    }
}

//选择某一天的回调
const workTimes = (item: any) => {
    // 用户选择哪一天
    workTime.value = item;
    // 再次发送请求
    getDoctor();

}

//计算出上午医生排班的数据
let moringArr = computed(() => {
    return docArr.value.filter((doc: any) => {
        return doc.workTime == 0;
    })
})

//点击底部按钮回调
const goDetails=(doc:any)=>{
    $router.push({path:'/hospital/registered_step1',query:{docid:doc.id}})
}

//计算出下午医生排班的数据
let afterArr = computed(() => {
    return docArr.value.filter((doc: any) => {
        return doc.workTime == 1;
    })
})
</script>
<script lang="ts">
export default {
    name: 'registered_step'
}
</script>
<style lang="scss" scoped>
.body {
    display: flex;
    flex-direction: column;

    .body-top {
        height: 20px;
        color: #aaa;
        margin: 20px 0 0 0;
    }

    .body-center {
        display: flex;
        height: 300px;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .body-center-title {
            width: 100%;
            // height: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .body-center-box {
            width: 15%;
            height: 45%;
            text-align: center;
            border: 2px solid #8dcbdf4d;
            background-color: #fff;
            transition: all .1s linear;
            cursor: pointer;

            &.active {
                border: 2px solid #aaa;

                .body-center-boxTop {
                    color: #eee;
                    background-color: #aaa;

                }

                .body-center-boxBottom {
                    color: #eee;
                    background-color: #bbb;
                }
            }

            &.cur {
                border: 2px solid greenyellow;

            }

            .body-center-boxTop {
                display: flex;
                height: 40%;
                font-size: 13px;
                align-items: center;
                justify-content: center;
                background-color: #8dcbdf4d;
            }

            .body-center-boxBottom {
                display: flex;
                height: 60%;
                font-size: 14px;
                align-items: center;
                justify-content: center;

            }
        }

        .body-center-box:hover {
            margin-top: -3px;
            border: 2px solid #f0f0f0;
            box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
        }

    }

    .body-pagination {
        display: flex;
        justify-content: center;
    }

    .body-bottom {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;

        .will {
            text-align: center;
            margin-top: 30px;
            font-size: 20px;
            font-weight: bolder;
        }

        .register {

            .body-bottoms {
                .body-bottoms-top {
                    display: flex;
                    align-items: center;
                }

                .body-bottoms-center {
                    display: flex;
                    height: 70px;
                    margin: 20px 0 0px 0;
                    border-bottom: 1px solid #ccc;

                    .body-bottoms-center-left {
                        width: 78%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                    }

                    .body-bottoms-center-right {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 25%;
                        padding: 0 15px;
                    }
                }
            }
        }
    }
}</style>