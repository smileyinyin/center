<template>
  <div class="login">
    <div class="header-bar">
      <img src="../../assets/LOGO1.png" alt="上下网">
      <div class="sxw">上下科技</div>
      <div class="title">总公司</div>
    </div>
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p class="mt20 mb20 title">总公司业务管理平台</p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">
            版权所有(c) 2013-2018. All rights reserved.
            <br/>
            上下科技 版权所有
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form/index'
import CommonIcon from '_c/common-icon'
import { mapActions } from 'vuex'
import md5 from 'md5'

export default {
  components: {
    LoginForm,
    CommonIcon
  },
  methods: {
    ...mapActions(['handleLogin']),
    handleSubmit({ userName, password }) {
      password = md5(password)
      this.handleLogin({ userName, password }).then(res => {
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #191f29;
  background-image: url('../../assets/p.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  position: relative;
  &-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 340px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      margin-bottom: 30px;
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #bed8f0;
      letter-spacing: 2px;
    }

    /deep/ .ivu-card {
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      border-radius: 0;

      .ivu-card-body {
        padding: 16px 26px;
      }
      .ivu-input,
      .ivu-btn {
        border-radius: 0;
      }
    }

    .input-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}

.header-bar {
  display: flex;
  align-items: center;
  height: 100px;
  padding-left: 200px;
  background: rgba(0, 0, 0, 0.7);
  user-select: none;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;

  .sxw {
    margin-left: 10px;
    font-size: 32px;
  }
  .title {
    position: relative;
    margin-left: 14px;
    padding-left: 16px;
    // position: absolute;

    &::before {
      content: '';
      position: absolute;
      width: 2px;
      top: 4px;
      bottom: 4px;
      left: 0;
      background: rgba(225, 225, 225, 0.8);
    }
  }
}

@media screen and (max-width: 750px) {
  .header-bar {
    padding-left: 20px;
  }
}
</style>
