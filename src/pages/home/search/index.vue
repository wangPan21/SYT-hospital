<template>
  <div class="search">
    <el-autocomplete
    clearable
    class="inline-input"
    placeholder="请输入医院名称"
    v-model="hospitalName"
    :trigger-on-focus='false'
    :fetch-suggestions="querySearch" 
    @select="handleSelect"    
    />
    <el-button type="primary" class="sad" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import { Search } from "@element-plus/icons-vue";
import { reqHospitalName } from "@/api/home";
import type {HospitalInfo} from '@/api/home/type';
import { useRouter } from 'vue-router';
//收集搜索的医院关键字
let hospitalName = ref<string>('');

//创建一个路由器对象
let $router = useRouter();
//顶部组件的回调
const querySearch =async(keyword:string,cb:any) =>{
  let result:HospitalInfo = await reqHospitalName(keyword);
  if (result.code == 200) {
    //整理数据
    let showData:Object = result.data.map(item=>{
      return{
        value:item.hosname,//展示医院的名字
        hoscode:item.hoscode,//储存医院的编码
      }
    })
    //给组建提供展示的数据   
    cb(showData);
  }
};

//点击去详情页的事件回调
const handleSelect =(item:any)=>{
  //点击并跳转到详情页
  $router.push({path:"/hospital/registered",query:{hoscode:item.hoscode}})
}
</script>

<script lang="ts">
export default {
  name:'Search'
}
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 20px 0 50px;
  :deep(.el-input__wrapper) {
    width: 600px;
    height: 50px;
    margin-right: 10px;
  }
  .sad{
    height: 46px;
  }

}
</style>