<template>
    <div id="login" class="login-page">
        <div id="login_main" class="main-box">
          <div id="login_main_head" class="head-box">
            <h1 style="margin:0 auto;">欢迎使用车票销售系统</h1>
          </div>
          <div id="login_form" class="login-form">
              <el-form  ref="form" :model="form" label-width="80px">
                  <el-form-item label="账号：">
                      <el-input v-model="form.mobile">
                      </el-input>
                  </el-form-item>
                  <el-form-item label="密码：">
                    <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
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
          this.form={};
          console.log(data.data);
          if(data.code===0) {
            if (data.data.flag === 2) {
              this.$router.push(
                {
                  path:"/frontMainPage",
                  params:{
                    userId:data.data.id
                  }
              });
            }
            if (data.data.flag === 1) {
              this.$router.push("/backStageMainPage");
            }
          }else{
            this.$alert(data.msg, '登陆失败', {
              confirmButtonText: '确定'
              , callback: action => {
              }
            })
          }
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
    padding-top: 50px;
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
