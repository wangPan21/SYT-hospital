<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <div class="right">
        <span :class="{active:activeFlag == ''}" @click="changeRegion('')">全部</span>
        <span v-for="item in regionArr" :key="item.value" :class="{active:activeFlag == item.value}" @click="changeRegion(item.value)">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reqHospitalLevelAndRegion} from '@/api/home';
import { onMounted,ref} from "vue";
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type';
//定义一个数组存储医院地区数据
let regionArr = ref<HospitalLevelAndRegionArr>([]);

//控制医院地区高亮响应式数据
let activeFlag =ref<string>('');

//组建挂载完毕
onMounted(()=>{
  getRegion();
})

//获取医院地区的数据
const getRegion = async () =>{
  let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin');
  if (result.code == 200) {
    regionArr.value = result.data;
  }
};

//点击地区按钮的回调
const changeRegion =(region:string)=>{
  //高亮响应式数据存储region数值
  activeFlag.value = region;
  $emit('getRegion',region)
}

let $emit = defineEmits(['getRegion'])
</script>
<script lang="ts">
export default {
  name:'Region'
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  color: #969696;
  margin: 30px 0 40px;
  .left {
    width: 45px;
    margin-right: 20px;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    color: #969696;
    span {
      margin:0 20px 10px 0 ;
      cursor: pointer;
    }
    span:hover {
      color: #31c4fd
    }
    .active{
      color: #31c4fd;
    }
  }
}
</style>