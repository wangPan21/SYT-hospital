<template>
  <div class="hospital">
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- 左侧导航区域 -->
        <!--@open="handleOpen" @close="handleClose"  -->
        <div class="left">
          <div class="top">
            <svg t="1700645510303" class="icon" viewBox="0 0 1213 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1459" width="18" height="18">
              <path
                d="M818.79717 188.348298l-426.288661 0c-20.117792 0-36.442552 14.288608-36.442552 31.940337 0 17.653421 16.32476 31.960648 36.442552 31.960648l426.288661 0c20.131332 0 36.442552-14.307226 36.442552-31.960648 0-17.651729-16.30445-31.940337-36.442552-31.940337zm358.570949 750.94236l-30.882486 0 0-560.872727c0-47.120926-38.253593-85.32205-85.421911-85.32205l-79.998942 0 0-206.413012c0-47.127696-38.241745-85.303431-85.428681-85.303431l-580.39643 0c-47.186936 0-85.428681 38.175736-85.428681 85.303431l0 206.413012-81.506846 0c-47.166963 0-85.4016 38.201124-85.4016 85.32205l0 560.872727-27.802362 0C15.695212 939.290658 0 957.960971 0 981.465748 0 1004.943445 15.695212 1023.998017 35.100181 1023.998017l1142.261168 0c19.384912 0 35.102043-19.054572 35.102043-42.532268 0-23.504778-15.71036-42.17509-35.095273-42.17509zm-1031.894448 0l0-491.894056c0-39.033864 31.649555-70.671233 70.744352-70.671233l13.599736 0 0 560.158635c0 0.807183 0.01354 1.607934 0.033851 2.406654l-84.377939 0zm752.05979 0l-584.495815 0 0-784.93916c0-39.006783 30.063286-70.644152 67.140549-70.644152l450.196099 0c37.097574 0 67.159167 31.637369 67.159167 70.644152l0 784.93916zm166.380536 0l-82.921997 0c0.025388-0.79872 0.07278-1.599471 0.07278-2.406654l0-560.158635 12.125514 0c39.054175 0 70.723702 31.637369 70.723702 70.671233l0 491.894056zm-245.116826-604.838717l-426.288661 0c-20.117792 0-36.442552 14.293686-36.442552 31.940337 0 17.651729 16.32476 31.960648 36.442552 31.960648l426.288661 0c20.131332 0 36.442552-14.308919 36.442552-31.960648 0-17.646651-16.30445-31.940337-36.442552-31.940337zm0 146.108721l-426.288661 0c-20.117792 0-36.442552 14.307226-36.442552 31.933567 0 17.653421 16.32476 31.960648 36.442552 31.960648l426.288661 0c20.131332 0 36.442552-14.307226 36.442552-31.960648 0-17.62634-16.30445-31.933567-36.442552-31.933567z"
                p-id="1460" fill="#8a8a8a"></path>
            </svg>
            <span>/ 医院信息</span>
          </div>
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
            <el-menu-item index="/hospital/registered" @click="changeActive('/hospital/registered')">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>预约挂号</span>
            </el-menu-item>
            <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
              <el-icon>
                <Document />
              </el-icon>
              <span>医院详情</span>
            </el-menu-item>
            <el-menu-item index="/hospital/notify" @click="changeActive('/hospital/notify')">
              <el-icon>
                <Clock />
              </el-icon>
              <span>预约须知</span>
            </el-menu-item>
            <el-menu-item index="/hospital/message" @click="changeActive('/hospital/message')">
              <el-icon>
                <Warning />
              </el-icon>
              <span>停诊信息</span>
            </el-menu-item>
            <el-menu-item index="/hospital/query" @click="changeActive('/hospital/query')">
              <el-icon>
                <Search />
              </el-icon>
              <span>查询/取消</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 右侧内容展示区域 路由组件展示的位置-->
        <div class="right">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

//引入左侧菜单所需的图标
import { Document, Menu as Clock, Calendar, Warning, Search, } from '@element-plus/icons-vue';

//引入路由
import { useRouter,useRoute } from 'vue-router';

// 引入仓库
import useDetailStore from '@/store/modules/hospitalDetail.ts'

//创建路由器
let $router =useRouter();

//获取当前路由信息
let $route =useRoute();

//获取仓库对象
let detailStore = useDetailStore();

//组件挂载完毕，通知pinia仓库发请求获取医院详情数据，并储存在仓库中
onMounted(()=>{
  //获取医院详情
  detailStore.getHospital($route.query.hoscode as string);
  //获取医院科室数据
  detailStore.getHospitalDepartment($route.query.hoscode as string)
})

//点击左侧菜单，路由跳转
const changeActive =(path:string)=>{
  $router.push({path,query:{hoscode:$route.query.hoscode}})  
}
</script>
<script lang="ts">
export default {
  name: 'Hospital'
}
</script>
<style scoped lang="scss">
.hospital {
  margin-left: -60px;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 10px;
  }
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin: 30px 0 15px -10px;
    color: #7f7f7f;
  }

  .right {
    margin: 30px 0 0 -10px ;
  }
}</style>