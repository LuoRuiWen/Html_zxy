<template>
  <el-container>
    <el-header>
      我的订单
    </el-header>
    <el-main>
      <el-table border :data="orderDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;">
        <el-table-column type="oid" width="150" label="订单号">
        </el-table-column>
        <el-table-column prop="startName" label="起始站"></el-table-column>
        <el-table-column prop="startTime" label="起始时间"></el-table-column>
        <el-table-column prop="endName" label="起始站"></el-table-column>
        <el-table-column prop="endTime" label="终点时间"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" small v-if="scope.row.status=='购买成功'" icon="el-icon-star-on" @click='refund(scope.row.oid)'>退票</el-button>
            <el-button type="primary" small v-if="scope.row.status=='已退票'" disabled icon="el-icon-star-on" @click='refund(scope.row.oid)'>退票</el-button>
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
            uid:'',
            tid:'',
            orderDatas:[],
            currentPage:1,
            pagesize:5,
          }
      },
      created:function () {
        this.uid = this.$route.query.userId;
        console.log("用户id"+this.uid);
        order.load({uid:this.uid}).then(data=>{
          console.log("数据："+data);
          this.orderDatas=data;
          console.log(this.orderDatas);
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
          this.$confirm('是否确定退票?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            order.refund({oid:this.oid}).then(data=>{
            })
            this.$message({
              type: 'success',
              message: '退票成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
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
