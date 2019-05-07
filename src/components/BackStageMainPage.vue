<template>
    <div id="backstage_main_page">
      <div id="backstage_main_page_head">

      </div>
      <div class="backstage_main_page_main">
        <el-container class="backstage_main_page_container">
        <el-aside class="backstage_main_page_aside">
          <!--@open="handleOpen"
          @close="handleClose"-->
          <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>车票管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" route="/backStageMainPage/tickets">添加车次</el-menu-item>
                <el-menu-item index="1-2">车票分配</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>成员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" >查看成员</el-menu-item><!--route="/backStageMainPage/member"-->
                <el-menu-item index="1-2">车次</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="backstage_main_page_main">
          <router-view/>
        </el-main>
        </el-container>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BackStageMainPage"
    }
</script>

<style lang="scss">
  #backstage_main_page{
    min-height: 100vh;
  }

  .backstage_main_page_main{
    min-width: 300px;
  }

  .backstage_main_page_container{
    min-height: 100vh;
  }

  .backstage_main_page_main{
    min-height: 100vh;
  }

  .backstage_main_page_aside{
    min-height: 100vh;
    background-color: #545c64;
  }
</style>
