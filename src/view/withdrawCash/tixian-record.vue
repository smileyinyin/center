
<template>
     <div class="settle">
       <bread-crumb :data="[{ title: '我的结算'}, {title: '账单明细'}]"></bread-crumb>
        <Card>
          <Row>
             <i-col span="8" align="left">
              <Button type="success" @click="but">账单导出</Button>
             </i-col>
             <i-col span="16" align="right">
              <Input  placeholder="请输入商户" style="width: 100px" v-model="bill" clearable />
              <Input  placeholder="请输入终端号" style="width: 100px;margin-left:10px;" v-model="bill" clearable />
              <Select clearable style="width:100px;margin-left:10px;" v-model="bills">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">已打款</Option>
                            <Option value="2" key="2">未提现</Option>
                            <Option value="3" key="3">审核不通过</Option>
              </Select>
              <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:200px;margin-left:10px " v-model="date"></DatePicker>
              <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
             </i-col>
          </Row>
              <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
              <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>

        </Card>
       </div>
</template>
<script>
import { findWithDrawList } from '@/api/jy-water'
import { formatDate } from '@/libs/util'
import breadCrumb from '_c/breadCrumb/breadCrumb'
export default {
  name: 'settle',
  components: {
    breadCrumb
  },
  data() {
    return {
      date: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      id: null, // 当前账单的id
      url: '', // 报表地址
      params: [
        {
          title: '序号',
          key: 'id',
          // type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商店名称',
          key: 'bill_uuid'
        },
        {
          title: '门店名称',
          key: 'bill_uuid'
        },
        {
          title: 'pos机终端号',
          key: 'bill_uuid'
        },
        {
          title: '手续费',
          key: 'bill_uuid'
        },
        {
          title: '卡活动',
          key: 'bill_uuid'
        },
        {
          title: '商户小票名称（扫描小票名称)',
          key: 'bill_uuid'
        },
        {
          title: '支付类型',
          key: 'bill_uuid'
        },
        {
          title: '应付金额',
          key: 'bill_uuid'
        },
        {
          title: '交易金额',
          key: 'bill_uuid'
        },
        {
          title: '利润',
          key: 'bill_uuid'
        },
        {
          title: '交易时间',
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
    this.id = this.$route.query.zdId
    this.url = this.$route.query.zdUrl
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
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findWithDrawList({
        bank_front_number: this.bank_front_number,
        bill_uuid: this.bill_uuid,
        create_time: starttime,
        end_time: endtime,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          that.data = res.data
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
      })
    },
    but() {
      window.open(this.url)
    }
  }
}
</script>
