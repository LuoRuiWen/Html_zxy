<template>
  <div style="min-width:800px">
    <div id="backstage_tickets_head">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="添加车次" name="first">
          <div class="backstage_tickets_add_tickets">
            <el-row :style="{height:60+'px',lineHeight: 60+'px'}">

            </el-row>
            <div id="backstage_tickets_add_tickets_formBox" class="backstage_tickets_add_tickets_formBox">
              <el-form  ref="form" :model="form" label-width="50px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="列车编号" label-width="120px">
                      <el-input :disabled="true" v-model="form.tname" placeholder="如：k999"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="站点数量" label-width="120px">
                      <el-input :disabled="true" v-model="form.stops.length"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="列车票数" label-width="120px">
                      <el-input-number v-model="form.num" :disabled="true" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="height: 30px;line-height: 30px;margin-bottom: 10px;margin-top: 5px">
                  <el-col :span="2" style="text-align: center;">
                    <label>站次</label>
                  </el-col>
                  <el-col :span="5" style="text-align: center;">
                    <label>车站</label>
                  </el-col><!--
                  <el-col :span="5"  style="text-align: center;">

                  </el-col>-->
                  <el-col :span="8"  style="text-align: center;">
                    <label>时刻表</label>
                  </el-col>
                  <el-col :span="5"  style="text-align: center;">
                    <label>票价</label>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col></el-col>
                </el-row>
                <el-row>
                  <el-col v-if="form===null||form.stops===null||form.stops.length===0" :span="24" style="text-align: center;border-top: 1px solid darkgray">
                    <label>暂无此车辆信息</label>
                  </el-col>
                </el-row>
                <el-row v-for="(stop,i) in form.stops" style="border: 1px solid darkgray;border-radius:5px;height: 70px;line-height: 60px;margin-bottom: 10px;padding-top: 5px;padding-bottom: 5px">
                  <el-col :span="2" style="text-align: center;">
                    <label>第{{i}}站</label>
                  </el-col>
                  <el-col :span="5" style="text-align: center;">
                      <label>{{stop.sname}}</label>
                  </el-col>
                  <el-col :span="8"  style="text-align: center;">
                    <div style="line-height: 30px"><label v-if="stop.arriveTime!==null&&stop.arriveTime!==''">抵达时间：{{stop.arriveTime}}</label><br>
                    <label  v-if="stop.awayTime!==null&&stop.awayTime!==''">发车时间：{{stop.awayTime}}</label></div>
                  </el-col>
                  <el-col :span="5" v-if="i>0"  style="text-align: center;">
                    <el-input-number size="small" v-model="stop.price" :step="1" :min="0"></el-input-number>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" style="float: right"><el-button type="primary" @click="save" >修改</el-button></el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!--<el-tab-pane label="修改车票" name="second">修改车票</el-tab-pane>
      <el-tab-pane label="删除车票" name="third">删除车票</el-tab-pane>
      <el-tab-pane label="退票处理" name="fourth">退票处理</el-tab-pane>-->
    </div>
  </div>
</template>

<script>
    import * as provinces from '../json/province.js'
    import ticketService from '../api/backstage_tickes_service.js'
    export default {
      name: "BackStageModifySop",
      data(){
        return{
          form:{tname:'',num:'',stops:[]},
          activeName:'first',
          provinces:provinces,
          cities:[]
        }
      },
      methods:{
        save(){
          ticketService.modifyTrain(this.form).then(data=>{
            if (data.code!==0){
              this.$alert("修改失败！","code"+data.code);
            } else{
              this.$alert("修改成功！","code"+data.code);
              this.init();
            }
          }).catch(err=>{
            this.$alert("发生错误！");
          })
        },
        change_province(val){
        },
        handleClick(){

        },
        /*changeStopNum(){
          this.form.stops=[];
          for(let i=0;i<this.stations;i++){
            this.form.stops.push({proId:'',sname:'',arriveTime:'',awayTime:'',price:'',level:i});
          }
        },*/
        init(){
          let tid = this.$route.query.tid;
          console.log(tid);
          ticketService.trainDetail(tid).then(data=>{
            if(data.data!==null){
              this.form=data.data;
              if(data.data.stops!==null&&data.data.stops.length!==0){
                this.stations = data.data.stops.length;
              }
            }
          }).catch(err=>{

          });
        }
      },
      mounted() {
        this.init();

      }
    }
</script>


<style lang="scss">
  .el-select .el-input {
    width: 130px;
  }

  .backstage_tickets_add_tickets{
    min-width: 400px;
  }

  .backstage_tickets_add_tickets_formBox{
    min-width: 500px;
    overflow: hidden;
  }
  </style>

