<template>
  <div class="sales">
    <h3 class="pb10">业务员</h3>
    <Card>
      <Row class="pb10" type="flex">
        <i-input v-model="searchForm.partnerName" placeholder="业务员名称" clearable class="w120 mr30"></i-input>
        <i-col style="flex:1">
          <Row :gutter="20" type="flex" justify="start" align="middle" style="margin-bottom: 10px;">
            <Select v-model="searchForm.status" placeholder="全部状态" clearable class="w120 mr20">
              <!-- <Option value="1" key="1">待审核</Option> -->
              <Option value="2" key="2">启用</Option>
              <Option value="3" key="3">禁用</Option>
              <!-- <Option value="4" key="4">审核不通过</Option> -->
            </Select>
            <Select v-model="searchForm.controlledCompanyName" placeholder="分公司" clearable class="w160 mr20">
              <Option :value="1">杭州市分公司</Option>
              <Option :value="2">无锡市分公司</Option>
            </Select>
            <!-- <Select v-model="searchForm.controlledCompanyName" placeholder="分公司" clearable class="w160 mr20">
              <Option v-for="item in companyList" :value="item.username" :key="item.id">{{ item.username }}</Option>
            </Select> -->
            <Select v-model="searchForm.parentId" placeholder="合伙人" clearable class="w120 mr20">
              <Option v-for="(item, index) in belongToList" :value="item.userId" :key="item.id + '' +index">{{ item.partnerName}}</Option>
            </Select>
          </Row>
        </i-col>
        <i-col>
          <DatePicker v-model="datetime" type="datetimerange" placement="bottom-end" placeholder="选择日期" class="w280 mr20"></DatePicker>
        </i-col>
        <i-col>
          <i-button type="primary" @click="getSalesList(1)" icon="search">查 询</i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getSalesList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>

  </div>
</template>

<script>
import { getPartnerList, getCityPartnerList } from '@/api/user/cityPartner'
import makeColums from './data/sales-columns'
import { formatDate } from '@/libs/util'

export default {
  name: 'salesList',
  data() {
    return {
      datetime: [],
      companyList: [],
      belongToList: [],
      searchForm: {
        parentId: '',
        roleId: 3, // 3 表示业务员
        status: '',
        mobile: '',
        partnerName: '',
        controlledCompanyName: '',
        startDate: '',
        endDate: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColums.call(this),
      tableData: []
    }
  },
  created() {
    this.getSalesList()
    this.getCityPartnerList()
    // this.getCompanyList()
  },
  methods: {

    // 分页 size 变化
    changePageSize(size) {
      this.pager.pageSize = size
      this.getSalesList()
    },

    // 业务员 列表查询
    getSalesList(page) {
      this.pager.pageNum = page || this.pager.pageNum
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager,
        {
          startDate: formatDate(this.datetime[0], 'yyyy-MM-dd hh:mm:ss') || undefined,
          endDate: formatDate(this.datetime[1], 'yyyy-MM-dd hh:mm:ss') || undefined
        }
      )
      getPartnerList(query).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.pager.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.pager.tatalCounts = 0
        }
      })
    },

    // 分公司下拉列表查询
    // getCompanyList() {
    //   getCompanyList().then(res => {
    //     this.companyList = res.data
    //   })
    // },

    // 所属合伙人 下拉查询
    getCityPartnerList() {
      getCityPartnerList().then(res => {
        // console.log(res.data)
        this.belongToList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sales {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
