<template>
    <div class="main">
        <div class="text">{{ hospitalStore.hospitalInfo.hospital?.hosname }}意见反馈</div>
        <el-empty description="暂无信息" />
    </div>
</template>

<script lang="ts" setup>
//引入医院详情仓库的数据
import useDetailStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetailStore();
</script>
<script lang="ts">
export default {
    name:'feedback'
}
</script>
<style lang="scss" scoped>
.text {
    display: flex;
    font-size: 25px;
    color: #4b4949;
    justify-content: center;
    padding: 30px 0 0 0;
    margin: 0 0 60px 0;
}
</style>