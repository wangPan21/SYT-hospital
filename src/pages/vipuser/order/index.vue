<template>
    <div>
        <div  v-if="$route.query.orderId">
            <Detail></Detail>
        </div>
        <div v-else>
            <AllOrder></AllOrder>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Detail from '@/pages/vipuser/order/detail/index.vue'
import AllOrder from '@/pages/vipuser/order/allOrder/index.vue'
import { useRoute } from "vue-router";
//获取路由对象
let $route = useRoute();
</script>
<script lang="ts">
export default {
    name: 'order'
}
</script>
<style lang="scss" scoped>

</style>