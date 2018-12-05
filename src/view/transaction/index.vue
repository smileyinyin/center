<template>
  <div class="entry">
    <h3 class="pb10">交易列表</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Input placeholder="活动名称" v-model="title" clearable class="w180 mr20" />
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="选择日期" class="w180 mr20"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll(1)">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="data" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getAll" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
  </div>
</template>

<script>
import { getTransactionList } from '@/api/bank/transaction'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      title: '',
      date: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      columns: [
        {
          title: '活动id',
          key: 'activityId',
          width: 60,
          align: 'center'
        },
        {
          title: '流水号',
          key: 'transNo'
        },
        {
          title: '卡号',
          key: 'cardNo'
        },
        {
          title: '活动名称',
          key: 'activityTitle'
        },
        {
          title: '活动类型',
          key: 'type'
        },
        {
          title: '终端号',
          key: 'terminalNo'
        },
        {
          title: '门店名称',
          key: 'storeId'
        },
        {
          title: '交易时间',
          key: 'transDateTime',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.transDateTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        },
        {
          title: '总金额',
          key: 'totalAmount'
        },
        {
          title: '支付金额',
          key: 'payAmount'
        },
        {
          title: '银行补贴',
          key: 'bankSubsidy'
        },
        {
          title: '门店获得补贴',
          key: 'subsidyStore'
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
    getAll(page) {
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      this.currentPage = page || this.currentPage
      getTransactionList({
        keyword: this.title,
        startDate: starttime,
        endDate: endtime,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          this.data = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.data = []
          this.totalCounts = 0
        }
      })
    }
  }
}
</script>
