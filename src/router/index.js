import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Tickets from '@/components/Tickets'
import MyOrder from '@/components/MyOrder'

import BackStageMainPage from '@/components/BackStageMainPage'
import BackStageTicketsPage from '@/components/BackStageTicketsPage'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/Tickets',
      name: 'Tickets',
      component: Tickets
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path:'/backStageMainPage',
      name:'backStageMainPage',
      component:BackStageMainPage,
      children:[
        {
          path:'tickets',
          name:'tickets',
          component:BackStageTicketsPage
        }
      ]
    }
  ]
})
