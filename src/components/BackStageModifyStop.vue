<template>
  <div>
    <div id="backstage_tickets_head">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="添加车次" name="first">
          <div class="backstage_tickets_add_tickets">
            <el-row :style="{height:60+'px',lineHeight: 60+'px'}">

            </el-row>
            <div id="backstage_tickets_add_tickets_formBox" class="backstage_tickets_add_tickets_formBox">
              <el-form  ref="form" :model="form" label-width="50px">
                <el-row >
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
                      <el-input-number v-model="form.num" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="form===null||form.stops===null||form.stops.length===0" :span="24" style="text-align: center;border-top: 1px solid darkgray">
                    <label>暂无此车辆信息</label>
                  </el-col>
                </el-row>
                <el-row v-for="stop in form.stops" style="border-top: 1px solid darkgray">
                  <el-col :span="5" style="text-align: center;">
                      <label>{{stop.sname}}</label>
                  </el-col>
                  <el-col :span="5"  style="text-align: center;">

                  </el-col>
                  <el-col :span="8"  style="text-align: center;">
                    <label>{{stop.arriveTime}}</label> <br/>
                    <label>{{stop.awayTime}}</label>
                  </el-col>
                  <el-col :span="5" v-if="i>1"  style="text-align: center;">
                    <label>{{stop.price}}</label>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col></el-col>
                </el-row>
                <el-button type="primary" @click="save" >添加车次</el-button>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!--<el-tab-pane label="修改车票" name="second">修改车票</el-tab-pane>
      <el-tab-pane label="删除车票" name="third">删除车票</el-tab-pane>
      <el-tab-pane label="退票处理" name="fourth">退票处理</el-tab-pane>-->
    </div>
    <div id="backstage_tickets_main">
      {{form.tname}}
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

