
<template>
     <div class="settle">
      <h3 class="pb10">打款记录</h3>
        <Card>
        <Row>
          <i-col span="24" align="right">
             <Input  placeholder="请输合伙人" style="width: 100px" v-model="bill" clearable />
             <Input  placeholder="请输账单号" style="width: 100px" v-model="bill" clearable />
             <Select clearable style="width:100px;margin-left:10px;" v-model="bills">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">已打款</Option>
                            <Option value="1" key="1">未提现</Option>
                            <Option value="2" key="2">审核不通过</Option>
             </Select>
             <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:200px;margin-left:10px " v-model="date"></DatePicker>
             <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
          </i-col>
        </Row>
        <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
        <Page :total="totalCounts" show-sizer:page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
       </div>
</template>
<script>
// import { findBillApply, updatebill } from '@/api/zd'
import { formatDate } from '@/libs/util'
import UploadImg from '_c/uploadImg/uploadImg'
export default {
  name: 'settle',
  components: {
    UploadImg
  },
  data() {
    return {
      isShowActive: false,
      isShow: false,
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      url: '',
      params: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '合伙人',
          key: 'bill_uuid'
        },
        {
          title: '帐单号',
          key: 'bill_uuid'
        },
        {
          title: '年月',
          key: 'bill_start_date',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
                'yyyy-MM-dd'
              )
            )
          }
        },
        {
          title: '可结算金额',
          key: 'bii_m_sum_money'
        },
        {
          title: '手续费',
          key: 'bii_m_sum_money'
        },
        {
          title: '到账金额',
          key: 'bii_m_sum_money'
        },
        {
          title: '提现状态',
          key: 'ddstatus'
        },
        {
          title: '生成时间',
          key: 'create_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
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
  },
  methods: {
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')

      findBillApply({
        mobile: this.mobile,
        bill_uuid: this.bill,
        role_id: this.role_id,
        bill_no: this.bills,
        invoice_no: this.status,
        start_time: starttime,
        end_time: endtime,
        pageNum: this.currentPage,
        pageSize: this.pageSize
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
        // if (item.role_id === 0) {
        //   item.role = '城市合伙人'
        // } else if (item.role_id === 1) {
        //   item.role = '渠道合伙人'
        // } else if (item.role_id === 2) {
        //   item.role = '供应商'
        // } else if (item.role_id === 3) {
        //   item.role = '体验店'
        // } else if (item.role_id === 4) {
        //   item.role = '商户'
        // }

        // if (item.bill_withdraw_status === 0) {
        //   item.ddstatus = '未提现'
        // } else if (item.bill_withdraw_status === 1) {
        //   item.ddstatus = '已提现'
        // }
        // if (!item.invoice_no) {
        //   item.fpstatus = '未上传'
        //   item.ttstatus = '待上传发票'
        // } else if (item.invoice_no) {
        //   item.fpstatus = item.invoice_no
        // }
        // if (item.bill_no === 0) {
        //   item.ttstatus = '待审核'
        // } else if (item.bill_no === 1) {
        //   item.ttstatus = '通过'
        // } else if (item.bill_no === 2) {
        //   item.ttstatus = '未通过'
        // }
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    }
  }
}
</script>
