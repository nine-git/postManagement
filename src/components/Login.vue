<template>
  <div class="login">
    <div class="main">
      <p>邮寄订单管理后台</p>
      <input type="text" placeholder="请输入账户" v-model="userName">
      <input type="password" placeholder="请输入密码" v-model="passWord">
      <div @click="login()">登录</div>
    </div>
  </div>
</template>

<script>
import {Message} from "view-design";

export default {
  name: 'Login',
  data () {
    return {
      userName:'',
      passWord:''
    }
  },
  methods:{
    // 登录跳转
    login(){
      if (this.userName&&this.passWord){
        if (this.userName==='admin'&&this.passWord==='admin123456'){
          sessionStorage.setItem('userName',this.userName)
          this.$Message['success']({
            background: true,
            content: '登录成功'
          });
          this.$router.push({ path:'/order'})
        }else{
          this.$Message['error']({
            background: true,
            content: '账户或者密码错误'
          });
        }
      }else {
        this.$Message['error']({
          background: true,
          content: '账户或者密码不能为空'
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
  font-family: PingFangSC;
  min-height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4B90FC;
}
  .main{
    //width: 4.8rem;
    //height: 3.05rem;
    padding: 0.4rem 0.72rem;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 0.16rem;
    p{
      color: #333333;
      font-size: 0.18rem;
      text-align: center;
      margin-bottom: 0.4rem;
    }
    input{
      width: 3.34rem;
      height: 0.38rem;
      border: 0.01rem solid rgba(0,0,0,0.15);
      border-radius: 0.02rem;
      color: rgba(0,0,0,0.45);
      font-size: 0.16rem;
      margin-bottom: 0.16rem;
      text-indent:1em
    }
    div{
      width: 3.36rem;
      height: 0.4rem;
      margin-top: 0.08rem;
      font-size: 0.16rem;
      color: #FFFFFF;
      background-color: #4B90FC;
      line-height: 0.4rem;
      text-align: center;
    }
  }
</style>
