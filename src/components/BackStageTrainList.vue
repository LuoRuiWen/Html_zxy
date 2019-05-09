<template>
  <div class="back_train_list_main_box">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="车次列表" name="first">
        <el-row style="border: 1px solid darkgray;border-radius: 5px;height: 60px;line-height: 60px;margin-bottom: 10px;font-weight: bold">
          <el-col :span="3" style="text-align: center">
            <label>车次</label>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <label>票数</label>
          </el-col>
          <el-col :span="5"  style="text-align: center">
            <label>首发站</label>
          </el-col>
          <el-col :span="2" style="text-align: center">
            <div>&nbsp;</div><!-- <img src="../img/右箭头gray.png" style="height:30px;">-->
          </el-col>
          <el-col :span="5"  style="text-align: center">
            <label>终点站</label>
          </el-col>
        </el-row>
        <el-row  v-if="trains===null||trains.length===0" style="border-top: 1px solid darkgray;border-radius: 5px">
          <el-col :span="24" style="text-align: center">
            <label>暂无列车信息</label>
          </el-col>
        </el-row>
        <el-row v-for="(train,index) in trains" style="border: 1px solid darkgray;border-radius: 5px;height: 60px;line-height: 60px;margin-bottom: 10px">
          <el-col :span="3" style="text-align: center">
            <label style="color:rgb(100,100,100)">{{train.tname}}</label>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <label style="color:rgb(100,100,100)">{{train.num}}</label>
          </el-col>
          <el-col :span="5" style="text-align: center">
            <label style="color:rgb(100,100,100);">
              {{train.startTime}}
            </label>
          </el-col>
          <el-col :span="2" style="text-align: center;line-height: 45px;padding-top: 14px">
            <img src="../img/右箭头gray.png" style="height:30px;">
          </el-col>
          <el-col :span="5" style="text-align: center">
            <label style="color:rgb(100,100,100)">{{train.endTime}}</label>
          </el-col>
          <el-col :span="4" style="text-align: center">
            <el-dropdown trigger="click" size="small" @command="handleCommand">
              <el-button type="primary">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{command:'del',id:train.tid}">删除列车</el-dropdown-item>
                <el-dropdown-item :command="{command:'modify',id:train.tid}">编辑列车</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import tickets from "../api/backstage_tickes_service.js"
    export default {
        name: "BackStageTrainList",
        data(){
          return{
            totle:1,
            pageSize:10,
            currentPage:0,
            activeName:'first',
            trains:[]
          }
        },
      methods:{
        handleCommand(command){
          var $this =this;
          var comm = command.command;
          var id = command.id;
          if(comm==="modify"){
            this.$router.push({
              path:'/backStageMainPage/modifyStop',
              query:{
                tid:id
              }
            });
          }else{
            tickets.deleteTrain(id).then(data=> {
                if(data.code!=0){
                  this.$alert('删除失败', 'code:' + data.code, {
                    confirmButtonText: '确定'
                    , callback: action => {
                      /*this.$message({
                      type: 'info',
                      message: `action: ${action}`
                    });*/
                      $this.init();
                    }
                  });
                }else{
                  this.$alert('删除成功', 'code:' + data.code, {
                    confirmButtonText: '确定'
                    , callback: action => {
                      /*this.$message({
                      type: 'info',
                      message: `action: ${action}`
                    });*/
                      $this.init();
                    }
                  });
                }
              }
            ).catch(err=>{
              console.log(err);
              this.$alert('删除失败', 'code:'+err.code, {
                confirmButtonText: '确定'
                , callback: action => {
                  /*this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  });*/
                  $this.init();
                }
              });
            })
            this.init();
          }
        },
          modify(id){
            console.log(id);
          },
          deleteTrain(id){
            console.log(id);
            this.init();
          },
        init(){
          tickets.trainList({pageSize:this.pageSize,currentPage: this.currentPage}).then(data=>{
            console.log(data.data);
            if (data.data.list.length!==0){
              this.trains = data.data.list;
              console.log(this.trains.length+"length");
            }
          });
        }
      },
        mounted() {
          this.init();
        }
    }
</script>

<style lang="scss">
  .back_train_list_main_box{
    min-height: 500px;
    height:100vh;
    min-width:800px;
  }
</style>
