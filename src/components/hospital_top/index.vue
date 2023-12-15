<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHone">
        <img src="../../assets/images/logo.png" alt="" />
        <span>尚医通 预约挂号统一平台</span>
      </div>
      <div class="right">
        <span style="margin-right: 10px;cursor:pointer;" class="a" >帮助中心</span>
        <span @click="login" v-if="!userStore.userInfo.name" class="b" style="cursor:pointer;">登录|注册</span>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/vipuser/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/vipuser/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/vipuser/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="loginOut" style=" cursor:pointer;">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//引入仓库数据，控制dialog显示与隐藏
import useUserStore from "@/store/modules/user";
//引入路由
import { useRouter} from 'vue-router';
//引入样式
import { ArrowDown } from '@element-plus/icons-vue'
let userStore = useUserStore();
//创建一个路由器对象
let $router = useRouter();

//点击跳转到首页
const goHone = () => {
  //编程式路由导航
  $router.push({ path: "/home" })
}

//点击登录注册按钮控制页面显示与隐藏
const login = () => {
  userStore.dialogFormVisible = true;
}

//点击退出登陆按钮回调
const loginOut = ()=>{
  //通知仓库清除数据
  userStore.loginout();
  //刷新页面
  location.reload(); 
  //编程式导航，跳转到首页
  $router.push('/home');
}

//点击实名认证的回调
const goUser =(path:string)=>{
  $router.push({path})
}

</script>

<style scoped lang="scss">
.top {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  z-index: 999;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  cursor:default;
}

.content {
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: pink;
}

.left {
  display: flex;
  align-items: center;
}

.left img {
  width: 50px;
  height: 50px;
}

.left span {
  font-size: 25px;
  color: #31c4fd;
  line-height: 50px;
  margin-left: 10px;
}

.right {
  margin-right: 10px;
  color: #878d92;
}

.a:hover {
  color: #31c4fd;
}
.b:hover {
  color: #31c4fd;
}
</style>