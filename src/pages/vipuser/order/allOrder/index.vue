<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 20px;">挂号订单</span>
                </div>
            </template>
            <div>
                <!-- 筛选器 -->
                <el-form :inline="true" label-width="70px">
                    <el-form-item label="就诊人">
                        <el-select placeholder="选择所有患者" v-model="userId" @change="changeUser">
                            <el-option label="选择所有就诊人" value="" />
                            <el-option v-for="item in allUser" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select placeholder="选择所有订单状态" v-model="orderStatus" @change="changeStatus">
                            <el-option label="选择所有订单状态" value="" />
                            <el-option v-for="(items, index) in allStatus" :key="index" :label="items.comment"
                                :value="items.status" />
                        </el-select>
                    </el-form-item>
                    <!-- 表格详情 -->
                    <el-table :data="allOrderArr" style="width: 100%; margin: 0 0 30px 0;">
                        <el-table-column prop="reserveDate" label="就诊时间" width="120" align="center" />
                        <el-table-column prop="hosname" label="医院" width="140" align="center" />
                        <el-table-column prop="depname" label="科室" align="center" />
                        <el-table-column prop="title" label="医生" width="100" align="center" />
                        <el-table-column prop="amount" label="费用" width="60" align="center" />
                        <el-table-column prop="patientName" label="就诊人" width="80" align="center" />
                        <el-table-column prop="param.orderStatusString" label="订单状态" align="center" />
                        <el-table-column prop="123" label="操作" width="70" align="center">
                            <template #="{ row }">
                                <el-button link type="primary" @click="change(row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器-->
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                        layout="prev, pager, next, jumper,->,sizes,total" :total="Number(total)" :small="true"
                        :background="true" align="center" @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" />
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { reqUserInfo, reqGetAllUser, reqGetStatus } from '@/api/user/index'
import type { Records, UserOrderInfoResponseData, AllUser, AllOrderState, AllUserResponseData, AllOrderStateResponseData } from "@/api/user/type";

//初始化路由参数
let $router = useRouter();

//收集就诊人的ID
let userId = ref<string>("")

//订单状态
let orderStatus = ref<string>('')

//储存全部订单
let allOrderArr = ref<Records>([]);

//分页器 当前第几页
let pageNo = ref<number>(1);

//分页器 一页多少条数据
let pageSize = ref<number>(10);

//分页器订单总数
let total = ref<number>();

//存储全部就诊人的信息
let allUser = ref<AllUser>([])

//存储全部就诊人的信息
let allStatus = ref<AllOrderState>([])

//组件挂载完毕
onMounted(() => {
    getUserInfo();
    getData();
})
//加载用户列表
const getUserInfo = async () => {
    //@ts-ignore
    let result: UserOrderInfoResponseData = await reqUserInfo(pageNo.value, pageSize.value, userId.value, orderStatus.value);
    //@ts-ignore
    if (result.code == 200) {
        allOrderArr.value = result.data.records;
        total.value = result.data.total;
    }
}

//点击详情按钮的回调
const change = (row: any) => {
    $router.push({ path: "/vipuser/order", query: { orderId: row.id } });
}

//点击切换页码的回调
const handleCurrentChange = (pager: number) => {
    pageNo.value = pager;
    getUserInfo();
}

//点击切换每页展示的数量
const handleSizeChange = (pagesize: number) => {
    pageSize.value = pagesize;
    getUserInfo();
}

//获取就诊人信息与订单状态的回调
const getData = async () => {
    let result: AllUserResponseData = await reqGetAllUser();
    allUser.value = result.data;
    let results: AllOrderStateResponseData = await reqGetStatus();
    allStatus.value = results.data;
}

//下拉菜单选择就诊人回调
const changeUser = () => {
    //根据就诊人的ID，再次获取就诊人信息 
    getUserInfo();
}

//下拉菜单选择订单状态的回调
const changeStatus = () => {
    //根据订单状态，再次获取订单信息 
    getUserInfo();
}
</script>
<script lang="ts">
export default {
    name: 'AllOrder'
}
</script>
<style lang="scss" scoped></style>