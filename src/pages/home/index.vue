<template>
  <div>
    <!-- 首页轮播图结构 -->
    <Carousel></Carousel>
    <!-- 首页搜索医院表单结构 -->
    <Search></Search>
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
      <el-col :span="20" :offset="0">
        <!-- 等级组件 -->
        <Level @getLevel="getLevel"></Level>
        <!-- 地区组件 -->
        <Region @getRegion="getRegion"></Region>
        <!-- 医院组件 -->
        <div class="hospital" v-if="hasHospitalInfo.length>1">
          <Card v-for="item in hasHospitalInfo" :key="item.id" class="card" :hospitalinfo="item" style="cursor:pointer;"></Card>
        </div>
        <div class="empty" v-else>
          <el-empty description="暂无医院" image="https://img.zcool.cn/community/0177965ad579eba8012040295d8025.png@1280w_1l_2o_100sh.png"/>
        </div>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,-> ,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="margin:20px 0"
        />
      </el-col>
      <el-col :span="4" :offset="0">
       <Tip style="cursor:pointer;"></Tip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数
//@ts-ignore
import{onMounted,ref} from 'vue';
//@ts-ignore
import {reqHospital} from "@/api/home"
//引入轮播图组件
import Carousel from "./carousel/index.vue";
//引入搜索组件
//@ts-ignore
import Search from "./search/index.vue";
//引入等级组件
import Level from "./level/index.vue";
//引入地区组件
import Region from "./region/index.vue";
//引入医院组件
//@ts-ignore
import Card from "./card/index.vue";
//引入提示组件
import Tip from './tip/index.vue';
import type {Content,HospitalResponseData} from '@/api/home/type'


//分页器需要的数据
//@ts-ignore
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let hasHospitalInfo = ref<Content>([]);
let total = ref<number>(0);
//存储医院等级/地区的响应式数据
let hostype = ref<string>('');
let districtCode = ref<string>('');


//组件挂载完毕发送请求
onMounted(()=>{
  getHospitalInfo();
  })

//获取已有的医院的数据
const getHospitalInfo=async()=>{
  let result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value);
  if (result.code == 200) {
    //存储已有的医院数据
    hasHospitalInfo.value = result.data.content;
    //存储医院的总个数
    total.value = result.data.totalElements;    
  }  
}

//分页器页码发生变化时的回调
const handleCurrentChange =()=>{
  getHospitalInfo();
  
}
//分页器下拉菜单变化时触发
const handleSizeChange=()=>{
  getHospitalInfo();
}

//子组件自定义事件,接受等级组件 
const getLevel =(level:string) =>{
  hostype.value = level;
  getHospitalInfo();
};

//子组件自定义事件,接受等级组件 
const getRegion =(region:string) =>{
  districtCode.value = region;
  getHospitalInfo();
};
</script>
<script lang="ts">
export default {
  name:'Home'
}
</script>
<style scoped lang='scss'>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card {
    width: 48%;
    margin: 10px 0;
  }

}
</style>