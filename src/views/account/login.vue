<template>
  <div class="vava-login-in">
    <h5>SIGN IN</h5>
    <vava-input class="login-input" maxlength="200" v-model="loginParam.userName" placeholder="Email Address"></vava-input> <!-- 邮箱地址 -->
    <vava-input class="login-input" maxlength="50" v-model="loginParam.password" type="password" placeholder="Password"></vava-input> <!-- 密码 -->
    <!-- 勾选法律文件信息 -->
    <vava-checkbox v-model="checkAgree" class="login-check">
      <p>I agree to the <span @click="routerLink('/support/terms-conditions', true)">Terms and Conditions</span> end <span @click="routerLink('/support/private-policy', true)">Privacy Policy</span>.</p>
    </vava-checkbox>
    <!-- 记住我 -->
    <vava-checkbox v-model="remember" class="login-check login-remember-check">Remember me</vava-checkbox>
    <vava-button class="login-button" @click="loginCheckData">SIGN IN</vava-button>
    <p class="login-option-account">Or <span @click="routerLink('/create-account')">Create a new account</span>  |  <span @click="routerLink('/forgot-password')">Forgot password</span>?</p>
  </div>
</template>

<script>
  import { invokeGetShoppingCart } from '@/api/invoke.js'
  export default {
    data () {
      return {
        checkAgree: true,
        remember: false,
        loginParam: {
          userName: '',
          password: ''
        }
      }
    },
    mounted () {
      this.loginParam.userName = window.localStorage.getItem('userName') || ''
    },
    methods: {
      loginCheckData () {
        if (this.$bar.show) return // 防止重复点击登录刷新token
        if (!this.$utils.trim(this.loginParam.userName)) {
          this.$utils.message('Please enter you E-mail address.')
          return
        }
        if (!this.$utils.trim(this.loginParam.password)) {
          this.$utils.message('Please enter your Password.')
          return
        }
        if (this.$utils.trim(this.loginParam.password).length < 6) {
          this.$utils.message('Password must not be less than 6 characters.')
          return
        }
        if (!this.checkAgree) {
          this.$utils.message('Please agree to the Terms and Conditions end Privacy Policy.')
          return
        }
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'signIn', data: this.loginParam}).then(data => {
          this.$bar.finish()
          this.$store.commit('setToken', data.token)
          let accountData = { emailAddress: this.loginParam.userName }
          this.$store.commit('setAccountData', accountData)
          invokeGetShoppingCart(this) // 获取购物车列表
          window.localStorage.setItem('userName', this.remember ? this.loginParam.userName : '')
          this.routerLink(this.$route.query.redirect ? this.$route.query.redirect + '?redirect=/login' : '/account')
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      routerLink (path, isOpen) {
        isOpen ? window.open(path) : this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-login-in{
    padding: 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 45vw;
    h5{
      font-size: 2.6vw;
      color: @base-font-color;
      margin-bottom: 2vw;
    }
    .login-input{
      width: 20.84vw;
      min-width: 280px;
      height: 3.125vw;
      margin: 1.04vw 0;
      input{
        padding: 0 3vw;
      }
    }
    .login-check{
      margin: 1.04vw 3vw;
      font-size: 0.84vw;
      width: 20.84vw;
      min-width: 280px;
      padding: 0 10px;
      color: @base-font-color;
      p{
        color: @un-font-color;
        span{
          color: @base-font-color;
          cursor: pointer;
        }
        span:hover{
          color: @base-button-back;
          text-decoration: underline;
        }
      }
    }
    .login-remember-check{
      color: @un-font-color;
      margin-top: 0;
      margin-bottom: 2vw;
    }
    .login-option-account{
      margin: 1.04vw 0;
      font-size: 0.84vw;
      color: @un-font-color;
      span{
        color: @base-font-color;
        cursor: pointer;
      }
      span:hover{
        color: @base-button-back;
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 1350px) {
    .vava-login-in{
      h5{
        font-size: 35px;
        margin-bottom: 27px;
      }
      .login-input{
        margin: 14px 0;
        input{
          padding: 0 40px;
        }
      }
      .login-check{
        font-size: 12px;
      }
      .login-remember-check{
        margin-bottom: 25px;
      }
      .login-option-account{
        margin: 15px 0;
        font-size: 12px;
      }
    }
  }
  @media (max-width: 500px) {
    .vava-login-in{
      h5{font-size: 24px;}
      padding: 40px 0;
      .login-check{
        margin-top: 10px;
        min-height: 20px;
      }
    }
  }
</style>
