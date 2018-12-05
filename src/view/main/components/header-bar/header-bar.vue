<template>
  <div class="header-bar">
    <p style="width:180px; font-size: 16px; color: #fff">上下科技总公司管理平台</p>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>

<style lang="less" scoped>
 .header-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);

  .logo {
    vertical-align: middle;
    margin-left: 20px;
    height: 40px;
  }
  .custom-content-con {
    flex: 1;
    float: right;
    height: auto;
    padding-right: 20px;
    line-height: 64px;

    & > *{
      float: right;
    }

    .sider-trigger-a {
      // margin-left: 44px;
      float: left;
    }
  }
}
</style>
