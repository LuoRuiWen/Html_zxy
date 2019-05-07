<template>
  <el-container>
    <el-header>
      我的订单
    </el-header>
    <el-main>
      <el-table border :data="orderDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;">
        <el-table-column type="oid" width="150" label="订单号">
        </el-table-column>
        <el-table-column prop="tname" label="车次"></el-table-column>
        <el-table-column prop="startName" label="起始站"></el-table-column>
        <el-table-column prop="startTime" label="起始时间"></el-table-column>
        <el-table-column prop="endName" label="起始站"></el-table-column>
        <el-table-column prop="endTime" label="终点时间"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-star-on" @click='refund(scope.row.oid)'>退票</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="fy"
                     @size-change="handleSizeChange"
                     @current-change="current_change"
                     :current-page="currentPage"
                     :page-size="pagesize"
                     layout="total, prev, pager, next, jumper"
                     :total="orderDatas.length">
      </el-pagination>

    </el-main>
  </el-container>
</template>

<script>
    import order from '../api/order.js'
    export default {
      name: "MyOrder",
      data(){
          return{
            orderDatas:[],
            currentPage:1,
            pagesize:5,
          }
      },
      created:function () {
        order.load().then(data=>{
          this.orderDatas=data;
        });
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
        refund:function () {
          order.refund().then(data=>{

          })
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
