import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Login'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login'),
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/components/OrderForm'),
      meta:{title:'订单列表',isLogin:true},
    },
  ]
})


