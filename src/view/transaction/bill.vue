<template>
  <div class="entry">
    <h3 class="pb10">活动对账</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Select v-model="type" class="dib w140 mr20 tl">
            <Option :value="1">银行对账单</Option>
            <Option :value="2">商户对账单</Option>
          </Select>
          <Input placeholder="活动ID或者名称" v-model="title" clearable class="w180 mr20" />
          <Button type="primary" icon="ios-search" @click="getAll(1)">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getAll" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
  </div>
</template>
<script>
import { getTransactionLists } from '@/api/bank/transaction'
// import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      type: 1,
      title: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      url: '',
      columns: [
        {
          title: '活动id',
          key: 'activityId',
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'activityName',
          align: 'center'
        },
        {
          title: '账单号',
          key: 'billNo'
        },
        {
          title: '账单日期',
          key: 'billDate'
          // render: (h, params) => {
          //   return h(
          //     'span',
          //     null,
          //     formatDate(new Date(params.row.billDate), 'yyyy-MM-dd hh:mm:ss')
          //   )
          // }
        },
        {
          title: '生成日期',
          key: 'billCreateDate'
          // render: (h, params) => {
          //   return h(
          //     'span',
          //     null,
          //     formatDate(
          //       new Date(params.row.billCreateDate),
          //       'yyyy-MM-dd hh:mm:ss'
          //     )
          //   )
          // }
        },
        {
          title: '交易门店数',
          key: 'storeCount'
        },
        {
          title: '交易笔数',
          key: 'transactionCount'
        },
        {
          title: '支付总额',
          key: 'payTotalAmount'
        },
        {
          title: '银行补贴总额',
          key: 'bankSubsidyTotalAmount'
        },
        {
          title: '交易总额',
          key: 'transactionTotalAmount'
        },
        {
          title: '操作',
          width: 150,
          key: 'control',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.see(params.row)
                    }
                  }
                },
                '下载'
              )
            ])
          }
        }
      ],
      tableData: []
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
      this.currentPage = page || this.currentPage
      getTransactionLists({
        bcFlag: this.type,
        keyword: this.title,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    see(row) {
      this.url = row.downloadUrl
      window.open(this.url)
    }
  }
}
</script>
