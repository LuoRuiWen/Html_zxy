<template>
    <div>
      <div id="backstage_tickets_head">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="添加车票" name="first">
            <div class="backstage_tickets_add_tickets">
              <el-row :style="{height:60+'px',lineHeight: 60+'px'}">

              </el-row>
              <div id="backstage_tickets_add_tickets_formBox" class="backstage_tickets_add_tickets_formBox">
                <el-form  ref="form" :model="form" label-width="50px">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="请输入列车编号" label-width="120px">
                          <el-input v-model="form.tname" placeholder="如：k999"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="请输入站点数量" label-width="120px">
                          <el-input-number v-model="stations" :step="1" @change="changeStopNum" :min="2"></el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="请输入列车票数" label-width="120px">
                          <el-input-number v-model="form.num" :step="1" :min="0"></el-input-number>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-for="i in stations">
                      <el-col :span="5">
                        <el-form-item label="省份">
                          <el-select v-model="form.stop[i-1].proId" placeholder="请选择" @change="change_province(i-1)">
                            <el-option v-for="pro in provinces.province" :label="pro.name" :value="pro.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="市/县">
                          <el-select v-model="form.stop[i-1].sname" placeholder="请选择">
                            <el-option v-for="city in cities[i-1]" :label="city.name" :value="city.name"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="发车时间：" v-if="i<stations" label-width="85px">
                          <el-date-picker
                            v-model="form.stop[i-1].awayTime"
                            type="datetime"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="抵达时间：" v-if="i>1" label-width="85px">
                          <el-date-picker
                            v-model="form.stop[i-1].arriveTime"
                            type="datetime"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="票价:">
                          <el-input v-model="form.stop[i-1].price" placeholder="票价">
                          </el-input>
                        </el-form-item>
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
        name: "BackStageTicketsPage",
      data(){
          return{
            stations:2,
            form:{tname:'',num:'',stop:[{proId:'',sname:'',arriveTime:'',awayTime:'',price:'',level:0},{proId:'',sname:'',arriveTime:'',awayTime:'',price:'',level:0}]},
            activeName:'first',
            provinces:provinces,
            cities:[]
          }
        },
      methods:{
        save(){
          ticketService.addTrain(this.form).then(data=>{
            console.log(data);
          }).catch(err=>{

          });
        },
        change_province(val){
          console.log(val+'val');
          //console.log(sort);
          console.log(this.form.stop[val].proId+'proId');
          if(this.form.stop[val].sname!=null){
            delete this.form.stop[val].sname;
          }
          provinces.province.forEach(v=>{
            console.log(v);
            if(v.id===this.form.stop[val].proId){
              console.log(v.id);
              this.cities[val]=v.child;
            }
          });
        },
        handleClick(){

        },
        changeStopNum(){
          this.form.stop=[];
          for(let i=0;i<this.stations;i++){
            this.form.stop.push({proId:'',sname:'',arriveTime:'',awayTime:'',price:'',level:i});
          }
        }
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
