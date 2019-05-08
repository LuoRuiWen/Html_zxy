<template>
  <div >
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="车次列表" name="first">
        <el-row  v-if="trains===null||trains.length===0" style="border-top: 1px solid darkgray;border-radius: 5px">
          <el-col :span="24" style="text-align: center">
            <label>暂无列车信息</label>
          </el-col>
        </el-row>
        <el-row v-for="(trian,index) in trains" style="border: 1px solid darkgray;border-radius: 5px">
          <el-col :span="4">
            {{train.name}}
          </el-col>
          <el-col :span="4">
            {{train.num}}
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "BackStageTrainList",
        data(){
          return{
            activeName:'first',
            train:{stops:[]},
            trains:[]
          }
        }
    }
</script>

<style lang="scss">
  .back_train_list_main_box{
    min-height: 500px;
    height:100vh;
    min-width:1140px;
  }
</style>
