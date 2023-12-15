<template>
    <div class="main">
        <!-- 展示医院标题 -->
        <div class="top">
            <div class="title">{{ hospitalDetail.hospitalInfo.hospital?.hosname }}</div>
            <svg t="1700708277280" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2326" width="18" height="18">
                <path
                    d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                    p-id="2327" fill="#bfbfbf"></path>
            </svg>
            <div class="level">{{ hospitalDetail.hospitalInfo.hospital?.param.hostypeString }}</div>
        </div>

        <!-- 展示医院内容 -->
        <div class="content">
            <el-row :gutter="10">
                <el-col :span="6">
                    <div class="left">
                        <img :src="`data:image/jpea;base64,` + hospitalDetail.hospitalInfo.hospital?.logoData" alt="">
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right">
                        <div class="rule1">挂号规则</div>
                        <div class="box">
                            <div class="rule2">预约周期:</div>
                            <div class="rule">{{ hospitalDetail.hospitalInfo.bookingRule?.cycle }}天</div>
                            <div class="rule">放号时间:</div>
                            <div class="rule">{{ hospitalDetail.hospitalInfo.bookingRule?.releaseTime }}</div>
                            <div class="rule">停挂时间:</div>
                            <div class="rule">{{ hospitalDetail.hospitalInfo.bookingRule?.stopTime }}</div>
                        </div>
                        <div class="box">
                            <div class="rule2">具体地址:</div>
                            <div class="rule">{{ hospitalDetail.hospitalInfo.hospital?.param.fullAddress }}</div>
                        </div>
                        <div class="box">
                            <div class="rule2">具体路线:</div>
                            <div class="rule3">{{ hospitalDetail.hospitalInfo.hospital?.route }}</div>
                        </div>
                        <div class="box">
                            <div class="rule2">退号时间:</div>
                            <div class="rule">就诊前一工作日{{ hospitalDetail.hospitalInfo.bookingRule?.quitTime }}取消</div>
                        </div>
                        <div class="rule1" style="margin-top: 30px;">医院预约规则</div>
                        <div class="rule" v-for="(item, index) in hospitalDetail.hospitalInfo.bookingRule?.rule"
                            :key="index">{{ item }}</div>
                    </div>
                </el-col>
            </el-row>


        </div>

        <!-- 放置每一个医院科室的数据 -->
        <div class="Department">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="left">
                        <ul>
                            <li @click="showIndex(index)" :class="{ active: index == chengeIndex }"
                                v-for="(item, index) in hospitalDetail.hospitalDepartment" :key="index">{{ item.depname }}
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="right">
                        <!-- 右侧代表大科室与小科室 -->
                        <div class="showDepartment" v-for="(item, index) in hospitalDetail.hospitalDepartment" :key="index"
                            style="cursor: default;">
                            <div class="title">{{ item.depname }}</div>
                            <ul>
                                <li @click="showLogin(son)" v-for="(son, index) in item.children" :key="index"
                                    style="cursor:grab;">
                                    {{ son.depname }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
//引入仓库医院详情的数据
import useDetailStore from "@/store/modules/hospitalDetail";
//引入路由
import { useRouter,useRoute} from "vue-router";
//引入仓库数据，控制dialog显示与隐藏
// import useUserStore  from "@/store/modules/user";

//初始化路由及对象
let $router = useRouter();
let $route = useRoute();

//控制科室高亮的响应式数据
let chengeIndex = ref<number>(0);

//存储医院详情的数据
let hospitalDetail = useDetailStore();

// let userStore = useUserStore();

//左侧
const showIndex = (index: number) => {
    chengeIndex.value = index;
    //点击导航获取右侧大科室标题
    let title = document.querySelectorAll('.title');
    //滚动到对应的科室标题上
    title[chengeIndex.value].scrollIntoView({
        behavior: "smooth", //过渡动画效果
        block: "start", //滚动到位置 默认起始位置
    });
}

//点击科室按钮的回调，显示登陆注册
const showLogin = (son:any) => {
    //若未登录
    // userStore.dialogFormVisible = true;
    //点击某一个科室进入相应的预约挂号详情页面  /hospital/registered_step1
    $router.push({path:'/hospital/registered_step',query:{hoscode:$route.query.hoscode,depcode:son.depcode}})
}
</script>
<script lang="ts">
export default {
    name: 'Registered'
}
</script>
<style lang="scss" scoped>
.main {
    margin-left: -40px;

    .top {
        display: flex;
        align-items: center;

        .title {
            font-size: 22px;
            margin-right: 10px;
            color: #494444;
        }

        .level {
            color: #aca9a9;
            font-size: 15px;
            margin-left: 10px;
        }
    }

    .content {
        margin: 50px 0 0 -20px;

        .left img {
            width: 100%;
            border-radius: 50%;
        }

        .rule1 {
            font-size: 18px;
            margin: 0 0 20px 0;
        }

        .rule {
            color: #a29e9e;
        }

        .rule2 {
            color: #a29e9e;
            width: 15%;
            font-size: 17px;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0;
        }

        .rule3 {
            width: 85%;
            color: #a29e9e;
        }
    }

    .Department {
        margin-top: 60px;
        height: 730px;
        // background-color: pink;

        .left ul {
            display: flex;
            flex-direction: column;
            height: 730px;
            background-color: #afaeae52;

            li {
                text-align: center;
                color: #7c7777;
                font-size: 14px;
                margin: 5px 0;
                line-height: 50px;

                &.active {
                    border-left: 5px solid #ff0000;
                    background-color: #fff;
                }
            }
        }

        .right {
            height: 730px;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            background-color: #f8f8f8;

            .showDepartment {
                .title {
                    width: 100%;
                    font-size: 18px;
                    margin: 0px 0 20px;
                    padding-left: 10px;
                    line-height: 40px;
                    background-color: #514f4f29;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 20px;

                    li {
                        width: 33%;
                        color: #7f7f7f;
                        line-height: 30px;
                    }

                    li:hover {
                        color: rgb(7, 92, 176);
                        background-color: #fff;
                    }
                }
            }
        }
    }
}</style>