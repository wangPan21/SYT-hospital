<template>
    <div></div>
</template>

<script lang="ts" setup>
//获取用户信息
import { useRoute } from "vue-router";
import {SET_TOKEN, GET_TOKEN} from '@/utils/user'
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();

let $route = useRoute();

//持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))

//扫描成功：路由组件执行代码
let html = document.querySelector('html');
if (!userStore.dialogFormVisible) {
    html.style.display="none"
}
</script>
<script lang="ts">
export default {
    name:'微信登录'
}
</script>
<style lang="scss" scoped>


</style>