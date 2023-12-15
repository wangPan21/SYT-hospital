<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <div class="right">
        <span :class="{active:activeFlag == ''}" @click="changeLevel('')">全部</span>
        <span v-for="item in levelArr" :key="item.value" :class="{active:activeFlag == item.value}" @click="changeLevel(item.value)">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reqHospitalLevelAndRegion} from '@/api/home';
import { onMounted,ref} from "vue";
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type';
//定义一个数组存储医院等级数据
let levelArr = ref<HospitalLevelAndRegionArr>([]);

//控制医院等级高亮响应式数据
let activeFlag =ref<string>('');

//组建挂载完毕
onMounted(()=>{
  getLevel();
})

//获取医院等级的数据
const getLevel =async () =>{
  let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType');
  if (result.code == 200) {
    levelArr.value = result.data;
  }
};

//点击等级按钮的回调
const changeLevel =(level:string)=>{
  //高亮响应式数据存储level数值
  activeFlag.value = level;
  //触发自定义事件：将医院的等级参数回传给父组件
  $emit('getLevel',level);
}

let $emit = defineEmits(['getLevel']);
</script>
<script lang="ts">
export default {
  name:'Level'
}
</script>
<style lang="scss" scoped>
h1 {
  color: #969696;
}
.content {
  display: flex;
  flex-wrap: wrap;
  color: #969696;
  margin: 10px 0;
  .left {
    margin-right: 20px;
  }
  .right {
    color: #969696;
    span {
      margin-right: 20px;
      cursor: pointer;
    }
    span:hover {
      color: #31c4fd;
    }
    .active{
      color: #31c4fd;
    }
  }
}
</style>