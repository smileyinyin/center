<template>
     <div class="settle">
       <h3>POS费率分润</h3>
        <Card>
          <Row>
            <i-col span="2" align="left">
             <Button type="success" @click="but">分润明细</Button>
            </i-col>
            <i-col span="22" align="right">
                <Input  placeholder="请输入分公司" style="width: 120px" v-model="filialeName" clearable/>
                <Input  placeholder="请输入合伙人" style="width: 120px;margin-left:10px;" v-model=" partner" clearable/>
                <Input  placeholder="请输入商户名称" style="width: 120px;margin-left:10px;" v-model=" merchantName" clearable/>
                <Input  placeholder="请输入终端号" style="width: 120px;margin-left:10px;" v-model=" posTerminalCode" clearable/>
                <!-- <Input  placeholder="请输入银行卡活动" style="width: 120px;margin-left:10px;" v-model=" activityName" clearable/> -->
                <label style="margin-left:10px">
                      <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  150px; " v-model="date"></DatePicker>
                </label>
                 <Button type="primary" icon="search" @click="getAll(1)" style="margin-left:10px">查询</Button>
            </i-col>
          </Row>
                <Table  :columns="params" :data="data" stripe border class="mt20" ></Table>
                <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
        <Modal
                   v-model="modal"
                   title="确认提示"
                   @on-ok="ok"
                   @on-cancel="cancel" >
                  <p style="font-size:14px">请选择时间：</p>
                  <DatePicker  type="datetimerange" placement="bottom-end" placeholder="请选择结算时间" style="width:  450px;margin-top:20px " v-model="date1"></DatePicker>
        </Modal>
     </div>
</template>
<script>
import { posFlowList } from '@/api/money/water'
import { formatDate } from '@/libs/util'
import BASE_URL from '../../../src/config/url'
export default {
  name: 'settle',
  data() {
    return {
      // 分公司
      filialeName: '',
      // 合伙人
      partner: '',
      // 商户名称
      merchantName: '',
      // 终端号
      posTerminalCode: '',
      // 银行卡活动
      activityName: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date1: '',
      date: '',
      url: '',
      modal: false,
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'pos流水号',
          key: 'batchNumber',
          width: 100
        },
        {
          title: '分公司',
          key: 'filialeName',
          width: 100
        },
        {
          title: '合伙人',
          key: 'partner',
          width: 100
        },
        {
          title: '商家名称',
          key: 'merchantName',
          width: 100
        },
        {
          title: '唯一终端号',
          key: 'posTerminalCode',
          width: 100
        },
        {
          title: '支付类型',
          key: 'payChannel',
          width: 100,
          render: (h, params) => {
            let pay = params.row.payChannel
            // let type = params.row.bank_card_type
            return h(
              'span',
              null,
              pay === '1' ? '支付宝' : pay === '2' ? '微信' : pay === '[]' ? '银行卡' : ''
            )
          }
        },
        {
          title: '小票商户号',
          key: 'merchantPosCode',
          width: 100
        },
        {
          title: '小票名称',
          key: 'name',
          width: 100
        },
        {
          title: '银行卡活动',
          key: 'activityName',
          width: 100
        },
        {
          title: '应收',
          key: 'realMnoey',
          width: 100
        },
        {
          title: '实收',
          key: 'discountMoney',
          width: 100
        },
        {
          title: '利润',
          key: 'profitMoney',
          width: 100
        },
        {
          title: '会员手机号',
          key: 'phone',
          width: 100
        },
        {
          title: '交易时间',
          key: 'dealTime',
          width: 150,
          render: (h, params) => {
            return h(
              'span',
              formatDate(
                new Date(params.row.dealTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
      ],
      data: []
    }
  },
  created() {
    this.getAll()
    // this.updataArray()
  },
  methods: {
    getpage(page) {
      this.currentPage = page || this.currentPage
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      posFlowList({
        filialeName: this.filialeName, // 分公司
        partner: this.partner, // 合伙人
        merchantName: this.merchantName, // 商户名称
        posTerminalCode: this.posTerminalCode, // 终端号
        activityName: this.activityName, // 银行卡活动
        page: this.currentPage,
        rows: this.pageSize,
        startDealTime: starttime,
        endDealTime: endtime
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
      })
    },
    but() {
      this.modal = true
    },
    ok() {
      window.open(BASE_URL + 'Detail/detailExport' +
        '?startTime=' + formatDate(this.date1[0]) +
        '&endTime=' + formatDate(this.date1[1])
      )
    },
    cancel() {}
  }
}
</script>
