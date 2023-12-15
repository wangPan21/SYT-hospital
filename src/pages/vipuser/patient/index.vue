<template>
    <div class="body">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>就诊人信息管理</span>
                    <el-button type="success" @click="addUser">
                        <svg t="1701666257859" style="margin: 0 5px 0 0;" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2699" width="16" height="16">
                            <path
                                d="M 634.061 483.328 c 58.1632 -37.0688 97.0752 -102.195 97.0752 -176.128 c 0 -115.098 -93.7984 -208.896 -208.896 -208.896 S 313.344 192.102 313.344 307.2 c 0 74.1376 38.912 139.059 97.0752 176.128 C 248.013 531.661 129.024 682.189 129.024 860.16 c 0 13.5168 11.0592 24.576 24.576 24.576 s 24.576 -11.0592 24.576 -24.576 c 0 -189.645 154.419 -344.064 344.064 -344.064 S 866.304 670.515 866.304 860.16 c 0 13.5168 11.0592 24.576 24.576 24.576 s 24.576 -11.0592 24.576 -24.576 c 0 -177.971 -118.989 -328.499 -281.395 -376.832 Z M 362.496 307.2 c 0 -88.064 71.68 -159.744 159.744 -159.744 s 159.744 71.68 159.744 159.744 s -71.68 159.744 -159.744 159.744 s -159.744 -71.68 -159.744 -159.744 Z"
                                p-id="2700" fill="#fcfcfc"></path>
                        </svg>
                        添加就诊人</el-button>
                </div>
            </template>
            <div class="box-cards">
                <div class="box" style="padding: 0;" v-for="(item, index) in userArr" :key="item.id" :index="index">
                    <div class="box-top">
                        <div style="width: 100px; height: 40px; display: flex; align-items: center;">
                            <span
                                style="margin: 0 10px 0 0px; font-size: 14px; width: 40px; height: 20px; background-color: #fff; text-align: center; line-height: 20px;">{{
                                    item.isInsure
                                    == 1 ? "医保" : "自费" }}</span>
                            <span style="color: #aaa; font-size: 20px;">{{ item.name }}</span>
                        </div>
                        <div>
                            <!-- 修改按钮 -->
                            <el-button type="primary" circle @click="editButton(item)">
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
                            <!-- 删除按钮 -->
                            <el-popconfirm :title="`删除就诊人${item.name}吗？`" @confirm="delButton(item.id)">
                                <template #reference>
                                    <el-button type="danger" circle>
                                        <svg t="1702030911258" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="2351" width="16" height="16">
                                            <path
                                                d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
                                                fill="#ffffff" p-id="2352"></path>
                                            <path
                                                d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
                                                fill="#ffffff" p-id="2353"></path>
                                            <path
                                                d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
                                                fill="#ffffff" p-id="2354"></path>
                                            <path
                                                d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
                                                fill="#ffffff" p-id="2355"></path>
                                        </svg>
                                    </el-button>
                                </template>
                            </el-popconfirm>

                        </div>
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
                            <span style="color: #bbb;">{{ item.sex == 0 ? '女' : '男' }}</span>
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
                            <span style="color: #bbb;">{{ item.isMarry == 0 ? '未婚' : '已婚' }}</span>
                        </div>
                        <div style="width: 100%; font-size: 15px;">
                            <span>当前住址: </span>
                            <span style="color: #bbb;">{{ item.param.cityString }}</span>
                        </div>
                        <div style="width: 100%; font-size: 15px;">
                            <span>详细住址: </span>
                            <span style="color: #bbb;">{{ item.param.fullAddress }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref} from 'vue'
import { reqGetUser, deleteUser } from "@/api/hospital";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import useVipUser from "@/store/modules/vipUser";

//引用仓库 
const useVip = useVipUser();

//创建路由
let $router = useRouter();

//初始化就诊信息
let userArr = ref<any>([]);

//组件挂载
onMounted(() => {
    //获取就诊人信息
    getGetUsers();
})

//获取就诊人信息
const getGetUsers = async () => {
    //获取就诊人信息
    let result = await reqGetUser();
    //@ts-ignore
    if (result.code == 200) {
        userArr.value = result.data;
    }
}

// 添加按钮回调
const addUser = () => {
    $router.push({ path: '/hospital/registered_step2' })
}

//修改按钮的回调
const editButton = (item: any) => {
    useVip.userParams = item;
    $router.push({ path: '/hospital/registered_step2', query: { id:item.id } })
}

//删除按钮的回调
const delButton = async (id: any) => {
    try {
        await deleteUser(id);
        getGetUsers();
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
</script>
<script lang="ts">
export default {
    name: 'patient'
}
</script>
<style lang="scss" scoped>
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
</style>