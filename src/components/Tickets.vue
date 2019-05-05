<template>
    <div id="tickets">
      <el-container>
        <el-header>
          欢迎来到xxx火车票系统{{OriginalTickets}}
        </el-header>
        <el-main>
          <el-row>
            <template>
              <el-row>
                <el-col :span="4">
                  <el-radio v-model="queryParam" label="1">车次</el-radio>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="searchByTrain" size="medium"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-radio v-model="queryParam" label="2">车站</el-radio>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="searchBySart" size="medium">
                    <template slot="prepend">起始站：</template>
                  </el-input>
                </el-col>
                <el-col :span="5" :offset="6">
                  <el-input v-model="searchByEnd" size="medium">
                    <template slot="prepend">终点站：</template>
                  </el-input>
                </el-col>
                <el-col :span="2" :offset="2">
                  <el-button round @click="query()">查询</el-button>
                </el-col>
              </el-row>
            </template>
          </el-row>
          <el-row>
            <!--.slice((currentPage-1)*pagesize,currentPage*pagesize)-->
            <el-table border :data="OriginalTickets.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;">
              <template v-for="tableProp in tableProps">
                <el-table-column sortable :prop="tableProp.props" :label="tableProp.label" :key="tableProp.index">
                </el-table-column>
              </template>
              <el-table-column  width="125px">
                <template slot-scope="scope">
                  <el-button round size="mini" icon="el-icon-date" @click="buy(scope.row.tid)">购票</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="fy"
                           layout="prev, pager, next"
                           @current-change="current_change"
                           :total="total"
                           background
            >
            </el-pagination>
          </el-row>
        </el-main>
        {{'长度'+total}}
      </el-container>
    </div>
</template>

<script>
  import ticket from '../api/Ticket.js'

    export default {
        name: 'Tickets',
        data(){
              return{
                queryParam:'1',
                pagesize:9,     //每页的数据条数
                currentPage:1,  //默认开始页面
                total:'1000',
                OriginalTickets:[],
                tableData:[],
                tableProps:[],
                propsDefault:[{
                  props:'tid',
                  label:'编号'
                },{
                  props:'tname',
                  label:'车次'
                },{
                  props:'start',
                  label:'起始站'
                },{
                  props:'startTime',
                  label:'起始时间'
                },{
                  props:'end',
                  label:'终点站'
                },{
                  props:'endTime',
                  label:'终点时间'
                },{
                  props:'num',
                  label:'余票'
                }],
                searchBySart:'',
                searchByEnd:'',
                searchByTrain:''
              }
        },
      created:function() {
        this.tableProps=this.propsDefault;
        ticket.load().then(data=>{
            this.OriginalTickets=data;
        });
        this.total=this.OriginalTickets.length;
      },
      method:{
        current_change:function(currentPage){
          this.currentPage = currentPage;
        },
        query:function(){
          //车次查询
          if(this.queryParam==1){
            ticket.findByTname().then(data=>{
              this.OriginalTickets = data;
            });
            //车站查询
          }else{

          }
        }
      }
    }
</script>

<style scoped>
  .fy{
    text-align:center;
    margin-top:30px;
  }
</style>
