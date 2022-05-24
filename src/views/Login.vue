<template>
  <div class="login">
    <div class="login-box">
      <div class="inline-box">
        <img :src="logo" class="box login-logo" />
        <span class="box login-title">后台管理系统</span>
      </div>
      <Divider />
      <div>
        <div class="login-item">
          <Input type="text" v-model="userName" placeholder="输入用户名" size="large" prefix="md-person" />
        </div>
        <div class="login-item">
          <Input type="password" v-model="password" placeholder="输入密码" size="large" prefix="md-lock" />
        </div>
        <div class="login-item inline-box">
          <Input type="password" v-model="code" placeholder="输入图片验证码" size="large" prefix="md-image" class="box" />
          <img :src="codeImgae" class="box code-image" @click="refreshCode" />
        </div>
        <div class="login-item">
          <Button type="primary" size="large" long @click="login">登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { captcha, login } from '@/api/sys/account'

import { setToken } from '@/cookie'

import logo from '@/assets/images/logo.png'

export default {
  data () {
    return {
      uuid: '',
      userName: 'admin',
      password: 'admin123',
      code: '',
      codeImgae: '',
      logo
    }
  },
  created () {
    this.refreshCode()
  },
  methods: {
    refreshCode () {
      captcha().then(res => {
        const { uuid, img } = res
        this.codeImgae = 'data:image/png;base64,' + img
        this.uuid = uuid
      })
    },
    login () {
      const { uuid, code, userName, password } = this
      if (!userName) {
        this.$Message.warning('请输入用户名')
        return false
      }
      if (!password) {
        this.$Message.warning('请输入登录密码')
        return false
      }
      login({ uuid, code, userName, password }).then(res => {
        this.$Message.success('登录成功')
        setToken(res.access_token, res.expires_in)
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
<style lang="scss">
.login {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: rgba(24, 144, 255, 0.5) url('../assets/images/login_bg.png')
    no-repeat center / 100% 100%;
}
.login-box {
  position: relative;
  top: calc(50vh - 250px);
  left: calc(50vw - 250px);
  width: 500px;
  // background-color: rgba(0, 0, 0, 0.6);
  background-color: #fff;
  border-radius: 4px;
  padding: 40px;
  .login-title {
    font-size: 18px;
    color: #707070;
    font-weight: 600;
  }
  .login-item + .login-item {
    margin-top: 20px;
  }

  .login-logo {
    height: 32px;
    width: 32px;
  }

  .code-image {
    width: 100px;
    height: 38px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
  }
}
</style>
