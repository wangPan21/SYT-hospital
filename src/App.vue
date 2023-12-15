<template>
  <div class="main">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>

    <!-- 展示路由组件的区域 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 底部全局组件 -->
    <HospitalBottom></HospitalBottom>
    
    <!-- 登陆组件 -->
    <Login></Login>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Trispace&family=Zen+Antique+Soft&display=swap');
* {
  font-family: 'Trispace', sans-serif;
}
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
    width: 90%;
    min-height: 700px;
    margin-top: 71px;
    background-color: #fff;
  }

}
</style>