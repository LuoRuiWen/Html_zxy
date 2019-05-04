<template>
    <div id="register_page">
        <div id="register_page_head">
          <div id="register_page_head_right" style="float: right">
            已有账号，<router-link to="/">直接登陆</router-link>
          </div>
        </div>
        <div id="register_page_main">
          <div id="register_page_form_box">
            <h1>欢迎注册</h1>
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="姓    名：">
                <el-input v-model="form.userName" placeholder="请输入姓名">
                </el-input>
              </el-form-item>
              <el-form-item label="手    机：">
                <el-input v-model="form.mobile" placeholder="请输入手机号码">
                </el-input>
              </el-form-item>
              <el-form-item label="密    码：">
                <el-input type="password" v-model="form.userPwd" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：">
                <el-input type="password" v-model="form.userPwdCheck" auto-complete="off" placeholder="请确认密码"></el-input>
              </el-form-item>
              <div id="register_button" @click="register" ><label>注册</label></div>
            </el-form>
          </div>
        </div>
    </div>
</template>

<script>
    import user from '../api/user.js'
    export default {
        name: "Register",
        data(){
          return{
            form:{}
          }
        },
        methods:{
          register(){
            user.register(this.form).then(()=>{
              this.$alert('注册成功，将在3秒后跳转到登陆页面', '标题名称', {
                confirmButtonText: '确定'
                , callback: action => {
                  /*this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  });*/
                  this.$router.push('/');
                }
              });
              setTimeout(function(){
                this.$router.push('/');
              },5000);
            }).catch()
          }
        }
    }
</script>


<style lang="scss">
  #register_page{
    height: 100%;
    min-height: 800px;
    width: inherit;
    min-width: 1140px;
    background: rgba(255,111,0,0.7);
  }
  #register_page_head{
    height: 100px;
    width: 1140px;
    border-bottom: 1px solid white;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  #register_page_main{
    width: 1140px;
    margin: 0 auto;
  }

  #register_page_form_box{
    margin: 0 auto;
    width: 40%;
    border: darkgray 1px solid;
    padding: 20px 20px;
    border-radius: 5px;
    background: rgba(255,255,255,0.5);
  }

  #register_button{
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: white;
    background: blue;
    border-radius: 3px;
    height: 30px;
    width: 300px;
    line-height: 30px;
  }
</style>
