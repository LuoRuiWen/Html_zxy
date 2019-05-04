<template>
    <div id="tickets">
      <el-container>
        <el-header>
          欢迎来到xxx火车票系统
        </el-header>
        <el-main>
          <el-row>
            <template>
              <el-row>
                <el-radio v-model="queryParam" label="1">车次</el-radio><el-input v-model="searchByTrain"></el-input>
              </el-row>
              <el-row>
                <el-radio v-model="queryParam" label="2">车站</el-radio>
                起始站：<el-input v-model="searchBySart"></el-input>
                终点站：<el-input v-model="searchByEnd"></el-input>
              </el-row>
            </template>
            <el-col :span="3">
              <el-input v-model="searchBySart"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchByEnd"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchByTrain"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-button round @click="query()">查询</el-button>
          </el-row>
          <el-row>
            <el-table border :data="OriginalTickets.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;;">
              <template v-for="tableProp in tableProps">
                <el-table-column sortable :prop="tableProp.props" :label="tableProp.label" :key="tableProp.index">
                </el-table-column>
              </template>
              <el-table-column  width="125px">
                <template slot-scope="scope">
                  <el-button round size="mini" icon="el-icon-delete" @click="delPro(scope.row.stanid)">购票</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ticket from '../api/Ticket.js'

    export default {
        name: 'Tickets',
        data(){
              return{
                queryParam:'',
                pagesize:9,     //每页的数据条数
                currentPage:1,  //默认开始页面
                total:'1000',
                OriginalTickets:[],
                tableData:[],
                propsDefault:[{
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
        ticket.load().then(data=>{
            this.OriginalTickets=data;
        });
        this.total=this.OriginalTickets.length;
      },
      method:{
        handleCurrentChange(currentPage){
          this.currentPage = currentPage;
        },
        query(){
          //车次查询
          if(this.queryParam==1){

            //车站查询
          }else{

          }
        }
      }
    }
</script>

<style scoped>

</style>
