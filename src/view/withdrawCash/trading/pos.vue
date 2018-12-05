
<template>
     <div class="settle">
       <h3>pos机交易流水</h3>
        <Card>
       <Row>
         <i-col span="2" align="left">
             <Button type="success" @click="but">流水明细</Button>
          </i-col>
         <i-col span="22" align="right">
            <Input  placeholder="请输入流水号" style="width: 150px" v-model="batch_number" clearable/>
            <Input placeholder="请输入商户名称" style="width:150px;margin-left:10px;" v-model="storeName" clearable/>
            <Input placeholder="请输入手机号" style="width:150px;margin-left:10px;" v-model="mobile" clearable/>
            <Input placeholder="请输入终端ID" style="width:150px;margin-left:10px;" v-model="pos_terminal_code" clearable/>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  200px; " v-model="date"></DatePicker>
            </label>
             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        搜索
              </Button>
          </i-col>
       </Row>
        <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
        <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
       </div>
</template>
<script>
import { posFlowList } from '@/api/zd'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 流水号
      batch_number: '',
      // 手机号
      mobile: '',
      // 终端
      storeName: '',
      pos_terminal_code: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'pos流水号',
          key: 'batch_number'
        },
        {
          title: '商户名称',
          key: 'merchantName'
        },
        {
          title: '会员手机号',
          key: 'mobile'
        },
        {
          title: '终端号',
          key: 'pos_terminal_code'
        },
        {
          title: '手续费',
          key: 'profit_money'
        },
        {
          title: '交易渠道',
          key: 'pay'
        },
        {
          title: '刷卡金额',
          key: 'deal_price'
        },
        {
          title: '结算金额',
          key: 'real_price'
        },
        {
          title: '核销时间',
          key: 'createTime',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss')
            )
          }
        }
      ],
      data: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    getAll() {
      let that = this
      let start = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let end = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      posFlowList({
        // storeId: 1,
        batch_number: this.batch_number,
        mobile: this.mobile,
        orderSn: this.orderSn,
        storeName: this.storeName,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        startTime: start,
        endTime: end
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
        that.updateArray()
      })
    },
    updateArray() {
      this.data.forEach(item => {
        if (item.pay_channel === '1') {
          item.pay = '支付宝ISV'
        } else if (item.pay_channel === '2') {
          item.pay = '微信支付'
        } else if (item.pay_channel === '3') {
          item.pay = '百度百付宝'
        } else if (item.pay_channel === '4') {
          item.pay = '苏宁易付宝'
        } else if (item.pay_channel === '5') {
          item.pay = '支付宝城市服务商'
        } else if (item.pay_channel === '6') {
          item.pay = '京东钱包'
        } else if (item.pay_channel === '7') {
          item.pay = 'QQ钱包'
        } else if (item.pay_channel === '8') {
          item.pay = '翼支付'
        }
      })
    },
    but() {
      exportPosFlowExcel({}).then(res => {
        var form = document.createElement('form')
        form.action = res.data
        form.method = 'post'
        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)
      })
    }
  }
}
</script>
