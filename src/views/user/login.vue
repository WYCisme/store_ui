<template>
  <div v-if="true" class="login-div" >
    <!--<img src="/static/img/loginImg/loginbgi.png" height="100%" width="100%"/>-->
    <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" @keyup.enter.native="submitClick" name="username"
                auto-complete="off" placeholder="账号" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" @keyup.enter.native="submitClick" prefix-icon="el-icon-lock"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
<div v-else>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div  class="filter"></div>
      <div class="poster hidden">
        <img  src="/src/assets/img/loginImg/loginbgi.png" alt="">
      </div>
    </div>
  </div>
</div>
</template>
<script>
//   import {Base64} from 'js-base64'
  export default{
    data(){
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
          this.loading = true;
        // let paswordEncode=Base64.encode(this.loginForm.password); //使用base64对密码编码
        this.postLoginRequest('/api/user/login.do', {
          username: this.loginForm.username,
        //   password: paswordEncode
          password: this.loginForm.password
        }).then(resp=> {
            this.loading = false;
          if (resp && resp.status === 200) {
              let data = resp.data;
              console.log("登录返回数据：",data);
              this.$store.commit('login', data.data);
              let path = this.$route.query.redirect;
              console.log("请求路径：",path);
              this.$router.replace({path: path === '/' || path === undefined ? '/home' : path});
          }
        });
      }
    }
  }
</script>
<style>
  .login-div{
    width: 100%;
    height: 100%;
    background: url('/src/assets/img/loginImg/loginbgi.png');
    background-size:cover;

  }
  .login-container {
    border-radius: 15px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 10px #0d4786;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);

    background-color:rgba(170,200,200,0.15);
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #fffbf9;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

  /*其他*/
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
</style>
