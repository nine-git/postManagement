<template>
  <div class="orderForm">
    <div class="header">
      <div>
        <span>桂溪街道办</span>
        <span @click="logout()">退出</span>
      </div>
    </div>
    <div class="form">
      <div class="formTitle">
        <div>
          <Select v-model="searchName" placeholder="流程编号"
                  style="width: 1.2rem;height: 0.32rem;display: block;">
            <Option v-for="item in searchNameOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input suffix="ios-search" placeholder="请输入搜索关键字" style="width: auto;" v-model="searchValue" search @on-search="search"/>
        </div>
        <div class="export" @click="exportExcel()"><Icon type="ios-download-outline"></Icon><div>全部导出</div></div>
      </div>
      <div class="formMain">
        <Table :columns="orderTitle" :data="currentPageData" border no-data-text="当前没有数据..." ref="table"></Table>
        <Page :total="orderData.length" show-sizer show-elevator :current="1" @on-change="changePage"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  data(){
    return{
      searchName:'流程编号',//搜索字段
      searchValue:'',//搜索值
      searchNameOption:[
        {
          value: '流程编号',
          label: '流程编号'
        },
        {
          value: '流程名称',
          label: '流程名称'
        },
        {
          value: '发起人',
          label: '发起人'
        },
        {
          value: '收件人',
          label: '收件人'
        },
        {
          value: '订单号',
          label: '订单号'
        },
        {
          value: '运单号',
          label: '运单号'
        },
      ],//下拉框的值
      orderTitle: [
        {
          title: '流程编号',
          key: 'flowId',
          resizable: true,
          width: 120
        },
        {
          title: '流程名称',
          key: 'flowName',
          resizable: true,
          width: 120
        },
        {
          title: '发起人',
          key: 'initiator',
          resizable: true,
          width: 72
        },
        {
          title: '收件人',
          key: 'recipients',
          resizable: true,
          width: 72
        },
        {
          title: '收件电话',
          key: 'tel',
          resizable: true,
          width: 105
        },
        {
          title: '收件地址',
          key: 'address',
          resizable: true,
          width: 286
        },
        {
          title: '订单号',
          key: 'orderNum',
          resizable: true,
          width: 99
        },
        {
          title: '运单号',
          key: 'waybillNum',
          resizable: true,
          width: 98
        },
        {
          title: '其他状态',
          key: 'otherStatus',
          resizable: true,
          width: 72
        },
        {
          title: '生成时间',
          key: 'date',
          resizable: true,
          width: 156
        }
      ],//表单表头
      orderData: [],//表单所有的数据
      currentPageData:[],//表单当前页的数据
      totalPage: 1, // 总共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      downloadLoading:false
    }
  },
  mounted() {
    window.document.title='订单列表'
    //获取数据
    this.orderData=this.createData()
    this.changePage(this.currentPage);
    // 计算一共有几页
    this.totalPage = Math.ceil(this.orderData.length / this.pageSize);
    // 计算得0时设置为1
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage;

  },
  methods:{
    //搜索
    search(){
      let searchTitle=this.orderTitle.filter(item=>item.title===this.searchName)[0].key
      this.orderData=this.createData()//请求所有数据
      if (this.searchValue){
        this.orderData=this.orderData.filter(item=> item[searchTitle] == this.searchValue)
      }
      this.changePage(1);
    },
    //创建数据
    createData () {
      let data = [];
      for (let i = 0; i < 96; i++) {
        data.push({
          // flowId: '124320200818113614000001',
          flowId:i+1,
          flowName: '非因工在职死亡一次性待遇支付',
          initiator: '海媛',
          recipients: '司马伟冰',
          tel:'15602784487',
          address: '四川省成都市武侯区丰德国际广场A3座15楼',
          orderNum:'1292658203538182145',
          waybillNum:'1194662177925',
          otherStatus:'已支付',
          date:'2015-05-02 02:00:00'
        })
      }
      return data;
    },
    //分页
    changePage(index){
      this.currentPage=index
      let begin = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.currentPageData = this.orderData.slice(begin, end);
    },
    //退出登录
    logout(){
      sessionStorage.removeItem('userName')
      this.$router.push({path:'/login'})
    },
    //导出Excel
    exportExcel(){
      this.downloadLoading = true;
      require.ensure([], () => {
        const {export_json_to_excel} = require('../excel/Export2Excel') //这个地址和页面的位置相关，这个地址是Export2Excel.js相对于页面的相对位置
        const tHeader = this.orderTitle.map(item=>item.title); //这个是表头名称 可以是iveiw表格中表头属性的title的数组
        const filterVal = this.orderTitle.map(item=>item.key); //与表格数据配合 可以是iview表格中的key的数组
        const list = this.orderData//表格数据，iview中表单数据也是这种格式！
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '订单列表') //列表excel  这个是导出表单的名称
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
  padding-left: 0.12rem;
  padding-right: 0.28rem;
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: rgba(0,0,0,0.65);
  line-height: 0.3rem;
}
/deep/ .ivu-select-selection{
  border-radius: 2px 0 0 2px;
}
/deep/ .ivu-input{
  border-radius: 0 2px 2px 0;
}
/deep/ .ivu-input ivu-input-default ivu-input-with-suffix{
  font-size:0.14rem;
  color: rgba(0,0,0,0.45);
  line-height: 0.22rem;
}
///deep/ .ivu-table{
//  height: 7.35rem;
//}
/deep/ .ivu-table-cell{
  padding: 0;
  font-size: 0.14rem;
  line-height: 0.21rem;
}
/deep/ .ivu-table-header thead tr th{
  height: 0.46rem;
  padding-top: 0.12rem;
  padding-left: 0.08rem;
  font-family: PingFangSC-Medium;
  color: rgba(0,0,0,0.85);
}
/deep/ .ivu-table td{
  padding-top: 0.12rem;
  padding-left: 0.08rem;
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.65);
}
/deep/ .ivu-page{
  margin-top: 0.58rem;
  display: flex;
  justify-content: center;
}
/deep/ .ivu-icon-ios-download-outline:before{
  color: rgba(0,0,0,0.65);;
  margin: 0 0.08rem 0 0.1389rem;
}
.orderForm{
  .header{
    width: 100%;
    height: 0.64rem;
    background-color: #4B90FC;
    div{
      width: 62.5%;
      height: 100%;
      margin: auto;
      color: #FFFFFF;
      font-family: PingFangSC-Semibold;
      letter-spacing: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child{
        font-size: 0.18rem;
      }
      span:last-child{
        width: 0.48rem;
        font-size: 0.12rem;
      }
    }
  }
  .form{
    width: 62.5%;
    margin: auto;
    font-family: PingFangSC-Regular;
    .formTitle{
      margin: 0.24rem 0 0.17rem;
      display: flex;
      justify-content: space-between;
      div{
        display: flex;
      }
      .export{
        width: 1.06rem;
        height: 0.32rem;
        font-size: 0.14rem;
        color: rgba(0,0,0,0.65);
        line-height: 0.32rem;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 0.02rem;
        cursor: pointer;
      }
    }
    .formMain{
      position: relative;
    }
  }
}
</style>
