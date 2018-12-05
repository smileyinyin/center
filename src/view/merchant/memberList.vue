<template>
  <div>
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '会员管理'}
    ]"></bread-crumb>

    <Card>
      <Row :gutter="10" class="mb20" type="flex" justify="end">
        <Input class="w140 mr20" v-model="searchForm.mobile" placeholder="合伙人账号（手机号码）"/>
        <DatePicker class="w140 mr20" v-model="searchForm.startTime" type="date" placeholder="选择注册起止时间"></DatePicker>
        <DatePicker class="w140 mr20" v-model="searchForm.endTime" type="date" placeholder="选择注册起止时间"></DatePicker>
        <Button class="" type="primary" icon="search" @click="getMemberList">查询</Button>
        <!-- <Form :labelWidth="100">
          <i-col span="10">
            <formItem label="会员账号">
            </formItem>
          </i-col>
          <i-col span="10">
            <Row :gutter="10">
              <formItem label="注册时间">
                <i-col span="12">
                </i-col>
                <i-col span="12">
                </i-col>
              </formItem>
            </Row>
          </i-col>
          <i-col span="4">
            <formItem>
            </formItem>
          </i-col>
        </Form> -->
      </Row>
      <Table :data="tableData" :columns="columns"></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getMemberList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { getMemberList } from '@/api/merchant'
import { formatDate } from '@/libs/util'

export default {
  name: 'memberList',
  data() {
    return {
      searchForm: {
        merchantsId: '',
        mobile: '',
        startTime: '',
        endTime: ''
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          title: '会员ID',
          key: 'id'
        },
        {
          title: '会员账号',
          key: 'mobile'
        },
        {
          title: '已赠送积分',
          key: 'integral'
        },
        {
          title: '带来效益',
          key: 'profit'
        },
        {
          title: '上次消费日期',
          key: 'lastestTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.lastestTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '注册日期',
          key: 'createTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm'))
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    let merchantsId = this.$store.state.merchant.merchant.id
    if (!merchantsId) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    this.searchForm.merchantsId = merchantsId
    this.getMemberList()
  },
  methods: {
    changePageSize(size) {
      this.pager.pageSize = size
      this.getMemberList()
    },
    getMemberList() {
      let query = Object.assign({}, this.searchForm, this.pager, {
        startTime: formatDate(this.searchForm.startTime, 'yyyy-MM-dd'),
        endTime: formatDate(this.searchForm.endTime, 'yyyy-MM-dd')
      })
      getMemberList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    }
  },
  components: { breadCrumb }
}
</script>
