<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 20px;">{{ $route.query.id ? '更新' : '新增' }}就诊人</span>
                </div>
            </template>
            <div>
                <el-form :model="userParams" label-width="120px">
                    <!-- 就诊人信息 -->
                    <div style="font-size: 16px;color: #aaa;margin: 0 0 20px 0;">就诊人信息</div>
                    <el-form-item label="用户姓名">
                        <el-input v-model="userParams.name" placeholder="请输入您的姓名" />
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请选择您的证件类型" v-model="userParams.certificatesType">
                            <el-option :label="item.name" :value="item.value" v-for="(item, index) in certationType"
                                :key="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="请输入您的证件号码" v-model="userParams.certificatesNo" />
                    </el-form-item>
                    <el-form-item label="用户性别">
                        <el-radio-group v-model="userParams.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="请选择您的出生日期" value-format="YYYY-MM-DD"
                                v-model="userParams.birthdate" style="width: 100%" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="电话号码">
                        <el-input placeholder="请输入您的电话号码" v-model="userParams.phone" />
                    </el-form-item>

                    <div style="font-size: 16px;color: #aaa;margin: 0 0 20px 0;">建档信息（完善后部分医院首次就诊不排队建档）</div>

                    <el-form-item label="婚姻状况">
                        <el-radio-group v-model="userParams.isMarry">
                            <el-radio :label="1">未婚</el-radio>
                            <el-radio :label="0">已婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="自费/医保">
                        <el-radio-group v-model="userParams.isInsure">
                            <el-radio :label="1">自费</el-radio>
                            <el-radio :label="0">医保</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="当前住址">
                        <el-cascader :props="props" v-model="userParams.addressSelected" />
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input placeholder="请输入您的详细地址" v-model="userParams.address" />
                    </el-form-item>
                    <div style="font-size: 16px;color: #aaa;margin: 0 0 20px 0;">联系人信息（选填）</div>
                    <el-form-item label="联系人姓名">
                        <el-input placeholder="请输入您的姓名" v-model="userParams.contactsName" />
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请选择您的证件类型" v-model="userParams.contactsCertificatesType">
                            <el-option :label="item.name" :value="item.value" v-for="(item, index) in certationType"
                                :key="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="请输入您的证件号码" v-model="userParams.contactsCertificatesNo" />
                    </el-form-item>
                    <el-form-item label="电话号码">
                        <el-input placeholder="请输入您的电话号码" v-model="userParams.contactsPhone" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onsubmit">保存</el-button>
                        <el-button type="info" @click="resetData">重置</el-button>
                        <el-button @click="Cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { AddOrUpdateUser } from "@/api/user/type";
import { reqAddOrUpDateUser } from "@/api/hospital/index";
import { reqFindDictCode, reqCity } from '@/api/user/index'
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from 'vue-router'
import type { CascaderProps } from 'element-plus'
import useVipUser from "@/store/modules/vipUser";

let useVip = useVipUser();

//创建路由
let $router = useRouter();

//初始化路由参数
let $route = useRoute();

//收集新增就诊人的数据
let userParams = reactive<AddOrUpdateUser>({
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry:0,
    isInsure:0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
});

//拷贝数据
let copyData = {...userParams};

//证件类型
let certationType = ref<any>([]);

onMounted(() => {
    getCertationType();
    // 新增就诊人前清理数据
    if (!$route.query.id) {
        resetData()
    } else{
        userParams = useVip.userParams;        
    }
})

//获取证件类型方法的回调
const getCertationType = async () => {
    let result = await reqFindDictCode()
    certationType.value = result.data;
}

//保存按钮回调
const onsubmit = async () => {
    try {
        await reqAddOrUpDateUser(userParams);
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '新增成功'
        })
        $router.push({ path: '/vipuser/patient' })

    } catch (error) {
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '新增失败'
        })
    }

}

//取消按钮回调
const Cancel = ()=>{
    $router.push({ path: '/vipuser/patient' })
    resetData();
}

//清空数据
const resetData =()=>{
    //清空数据
    Object.assign(userParams,copyData);
}

//级联选择器数据
const props: CascaderProps = {
    lazy: true,//懒加载数据
    //加载级联选择器数据方法
    async lazyLoad(node, resolve) {
        //@ts-ignore
        let result: any = await reqCity(node.data.id || '86');
        //请求成功
        if (result.code == 200) {
            //整理参数
            let showData = result.data.map((item: any) => {
                return {
                    id: item.id,
                    label: item.name,
                    value: item.value,
                    leaf: !item.hasChildren
                }
            })
            resolve(showData);//注入组件需要展示的数据
        }
    },
}

</script>
<script lang="ts">
export default {
    name: 'registered_step2'
}
</script>
<style lang="scss" scoped></style>