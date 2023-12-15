<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 20px;">实名信息</span>
                </div>
            </template>

            <div class="content">
                <div class="content-head">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span style="margin-left: 5px;">完成实名认证后才能添加就诊人,正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
                </div>
                <!-- 实名前 -->
                <div class="content-body" v-if="userInfo.authStatus == 0">
                    <el-form :model="form" label-width="120px" :rules="rules" ref="text">
                        <el-form-item label="用户姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入用户姓名" />
                        </el-form-item>
                        <el-form-item label="证件类型" prop="certificatesType">
                            <el-select v-model="form.certificatesType" placeholder="请选择证件类型">
                                <el-option v-for="(item, index) in arrType" :key='index' :label="item.name"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号码" prop="certificatesNo">
                            <el-input v-model="form.certificatesNo" placeholder="请输入证件号码" />
                        </el-form-item>
                        <el-form-item label="上传证件" prop="certificatesUrl">
                            <el-upload list-type="picture-card" :limit="1" ref="upload"
                                action="/api/oss/file/fileUpload?fileHost=userAuah" :on-exceed="exceed"
                                :on-success="progress" :on-preview="preview" :on-remove="remove">
                                <img style="width: 100%; height: 100%; border-radius: 10px;"
                                    src="../../../assets/images/auth_example.png" alt="" />
                            </el-upload>
                            <el-dialog v-model="dialogVisible">
                                <img style="width: 100%; height: 100%; border-radius: 10px;" v-if="form.certificatesUrl"
                                    :src="form.certificatesUrl" alt="" />
                            </el-dialog>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onsubmit">保存</el-button>
                            <el-button @click="rewrite">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 实名后 -->
                <div v-else class="content-bodys">
                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="用户姓名" :width="40" label-align="center">{{ form.name
                        }}</el-descriptions-item>
                        <el-descriptions-item label="证件类型" :width="40" label-align="center">{{ userInfo.certificatesType ==
                            10 ? '身份证' : '户口本' }}</el-descriptions-item>
                        <el-descriptions-item label="证件号码" :width="40" label-align="center">{{
                            form.certificatesNo }}</el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { Warning } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { reqGetUserInfo, reqFindDictCode, getUserAuah } from "@/api/user/index";
import type { CertationArr, CertationTypeResponseData, UserParams } from "@/api/user/type";
import { ElMessage } from 'element-plus';
//收集用户表单认证的数据
let form = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
});

let forms = reactive({ ...form })

// 存储用户信息
let userInfo: any = ref<any>({});

//初始化类型
let arrType = ref<CertationArr>([]);

//照片预览显示与隐藏
let dialogVisible = ref<boolean>(false);

let upload = ref();

let text= ref();

//组件挂载完毕
onMounted(() => {
    getUser();
    getDictCode();
})

//获取用户信息
const getUser = async () => {
    let result = await reqGetUserInfo();
    //@ts-ignore
    if (result.code == 200) {
        userInfo.value = result.data;
    }
}

//点击提交按钮
const onsubmit = async () => {
    //表单校验
    await text.value.validate();
    try {
        await getUserAuah(form);
        ElMessage({
            type: 'success',
            message: '实名认证成功'
        })
        getUser()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '实名认证失败'
        })
    }
}

//点击重写按钮的回调
const rewrite = () => {
    Object.assign(form, forms)
    upload.value.clearFiles();
}

//获取证件类型的接口
const getDictCode = async () => {
    //@ts-ignore
    let result: CertationTypeResponseData = await reqFindDictCode();
    //@ts-ignore
    if (result.code == 200) {
        arrType.value = result.data;
    }
}

//实名照片超出限制后的回调
const exceed = () => {
    ElMessage({
        type: 'error',
        message: '最多只能上传一张图片'
    })
}

//实名照片上传成功后的回调
const progress = (response: any) => {
    //如果上传成功，校验结果清除
    text.value.clearValidata('certificatesUrl');
    //收集上传成功的图片路径
    form.certificatesUrl = response.data;

}

//实名照片预览回调
const preview = () => {
    //打开对话框，显示预览
    dialogVisible.value = true;
}

//实名照片删除图片回调
const remove = () => {
    // 清空图片的路径
    form.certificatesUrl = ''
}

//自定义校验规则姓名的方法
const validateName = (rule: any, value: any, callBack: any) => {
    const reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入合法的姓名'))
    }
}

//自定义校验规则证件类型的方法
const validateType = (rule: any, value: any, callBack: any) => {
    if (value == "10" || value == "20") {
        callBack();
    } else {
        callBack(new Error('请选择您的证件类型'))
    }
}

//自定义校验规则证件号码的方法
const validateNo = (rule: any, value: any, callBack: any) => {
    // 身份证正则表达
    const res = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[Xx\d]$/;
    //户口本正则表达
    const rec = /^[1-9]\d{5}\d{3}[Xx\d]$/;

    if (res.test(value) || rec.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入合法的证件号码'))
    }
}

//自定义校验规则证件照片的方法
const validateUrl = (rule: any, value: any, callBack: any) => {
    if (value.length != '') {
        callBack();
    } else {
        callBack(new Error('请上传您的证件照'))
    }
}

//表单校验规则
const rules = {
    //用户
    name: [
        { required: true, validator: validateName, trigger: 'blur' }
    ],
    certificatesType: [
        { required: true, validator: validateType, trigger: 'blur' }

    ],
    certificatesNo: [
        { required: true, validator: validateNo, trigger: 'change' }

    ],
    certificatesUrl: [
        { required: true, validator: validateUrl, trigger: 'blur' }

    ]
}
</script>
<script lang="ts">
export default {
    name: 'certification'
}
</script>
<style lang="scss" scoped>
.content {
    .content-head {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #aaa;
        font-size: 15px;
    }

    .content-body {
        margin: 30px 0 0 0;

    }

    .content-bodys {
        margin: 30px 0 0 0;
    }
}
</style>