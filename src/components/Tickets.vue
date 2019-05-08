<template>
    <div id="tickets">
      <el-container>
        <el-header>
          <el-row>
            <el-col :offset="22" :span="4" ><el-button size="small" type="info" @click="myOrder()">我的订单</el-button></el-col>
          </el-row>
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
                  <el-button round size="mini" icon="el-icon-date" @click="buy(scope.row.tid,scope.row.price,scope.row.start,scope.row.end)">购票</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination class="fy"
              @size-change="handleSizeChange"
              @current-change="current_change"
              :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="OriginalTickets.length">
            </el-pagination>
          </el-row>
        </el-main>
        <el-dialog title="确认信息" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="总票价">{{ruleForm.price}}</el-form-item>
            <el-form-item label="姓名" prop="pass">
              <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="checkPass">
              <el-input v-model="ruleForm.IDNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否是学生" prop="age">
              <template>
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="ruleForm.student">是</el-checkbox>
            </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-container>
    </div>
</template>

<script>
  import ticket from '../api/Ticket.js'
  // import qs from 'qs'
  var qs = require('qs')
    export default {
      name: 'Tickets',
      data(){
              return{
                dialogFormVisible:false,
                queryParam:'1',
                pagesize:5,     //每页的数据条数
                currentPage:1,  //默认开始页面
                OriginalTickets:[],
                total:0,
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
                },{
                  props:'price',
                  label:'票价'
                }],
                searchBySart:'',
                searchByEnd:'',
                searchByTrain:'',
                ruleForm: {
                  tid:'',
                  name: '',
                  IDNum: '',
                  student: '',
                  price:'',
                  start:'',
                  end:''
                },
              }
        },
      created:function() {
        this.tableProps=this.propsDefault;
        ticket.load().then(data=>{
            this.OriginalTickets=data;
        });
        this.total=this.OriginalTickets.length;
      },
      methods:{
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
        },
        current_change:function(currentPage){
          this.currentPage = currentPage;
        },
        query:function(){
          //车次查询
          if(this.queryParam==1){
            ticket.findByTname({tname:this.searchByTrain}).then(data=>{
              console.log(data);
              this.OriginalTickets = data;
            });
            //车站查询
          }else{
            console.log("起点"+this.searchBySart);
            ticket.findBySname({start:this.searchBySart,end:this.searchByEnd}).then(data=>{
              console.log(data);
              this.OriginalTickets=data;
            }).catch(err=>{
              console.log(err);
            });
          }
        },
        buy:function (tid,price,start,end) {
          this.dialogFormVisible=true;
          this.ruleForm.tid=tid;
          this.ruleForm.price=price;
          this.ruleForm.start=start;
          this.ruleForm.end=end;
          console.log(tid+"票价"+price);

        },
        submitForm:function () {
          console.log(this.ruleForm);
          var ruleForm = qs.stringify(this.ruleForm);
          console.log(ruleForm);
          ticket.booking(ruleForm).then(data=>{
            // console.log(data);
          })
        },
        myOrder:function () {
          this.$router.push("/MyOrder");
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
