// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'view-design/dist/styles/iview.css';
import ViewUI from "view-design";
Vue.config.productionTip = false
Vue.use(ViewUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('userName')
  if (to.meta.isLogin){
    if(token){
      next()
    }else{
      if(to.path==="/login"){
        next()
      }else{
        next({path:'/login'})
      }
      ViewUI.Message['error']({
        background: true,
        content: '您没有权限访问该页面'
      });
    }
  }else {
    //不需要登录
    next()
  }
})
