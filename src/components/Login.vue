<template>
    <div id="login" class="login-page">
        <div id="main" class="main-box">
          <div id="head" class="head-box">
          </div>
          <div id="login_form" class="login-form">
              <el-form  ref="form" :model="form" label-width="80px">
                  <el-form-item label="账号：">
                      <el-input v-model="form.userName">
                      </el-input>
                  </el-form-item>
                  <el-form-item label="密码：">
                    <el-input type="password" v-model="form.userPwd" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="login" >登陆</el-button>
                <router-link class="link-without-underline" to="/register"><span class="router_span">立即注册</span></router-link>
              </el-form>
          </div>
        </div>
    </div>

</template>
<script>
  import user from '../api/user.js'
  export default {
    name: 'Login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        form:{userName:'',userPwd:''}
      }
    },
    methods:{
      login(){
        user.login(this.form).then(data=>{
          console.log(data.code);
        }).catch(err=>{

        });
      },
      register(){

      }
    }
}
</script>
<style lang="scss">
  *{
    padding: 0px;
  }

  .router_span{
    color: white;
  }

  .link-without-underline{
    text-decoration: none;
  }
  .login-page{
    width: inherit;
    height: inherit;
    position: relative;
    background: url("../img/timg.jpg") no-repeat center 50%;
  }

  .head-box{
    height: 200px;
    position: relative;
  }

  .main-box{
    width: 1140px;
    text-align: center;
    margin: 0 auto;
    border-width: 1px;
    position: relative;
    min-height: 500px;
  }

  .login-form{
    width: 30%;
    margin: 0 auto;
    position: relative;
  }
</style>
