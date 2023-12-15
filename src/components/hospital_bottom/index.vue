<template>
  <div class="bottom">
    <div class="content">
        <div class="left">
            <span>京ICP备13018369号电话挂号010-56253825</span>
        </div>
        <div class="right">
                <span style="margin: 0 5px;">联系我们</span>
                <span style="margin: 0 5px;">合作伙伴</span>
                <span style="margin: 0 5px;">用户协议</span>
                <span style="margin: 0 5px;">隐私协议</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #f0f2f6;
  margin-top: 50px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 50px;
    font-size: 14px;
    color: #a1a3a5;
    // background-color: skyblue;
    .right{
        display: flex;
        justify-content: center;
    }
  }
}
</style>