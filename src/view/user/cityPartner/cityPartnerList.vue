<template>
  <div>
    <h3 class="mb10">城市合伙人管理</h3>
    <Card class="citypartnerList">
      <Row :gutter="10" class="mb20">
        <i-col :span="24" style="display:flex">
          <Row type="flex" justify="start" style="flex:1">
            <i-input v-model="searchForm.mobile" placeholder="手机号码" clearable class="w140 mr20"></i-input>
            <i-input v-model="searchForm.partnerName" placeholder="合伙人名称" clearable class="w120 mr20"></i-input>
            <!-- <Select v-model="searchForm.controlledCompanyName" placeholder="分公司" clearable class="w160 mr20">
              <Option v-for="item in companyList" :value="item.username" :key="item.id">{{ item.username }}</Option>
            </Select> -->
            <Select v-model="searchForm.controlledCompanyName" placeholder="分公司" clearable class="w160 mr20">
              <Option :value="1">杭州市分公司</Option>
              <Option :value="2">无锡市分公司</Option>
            </Select>
            <Select v-model="searchForm.status" clearable class="w120 mr10" placeholder="状态">
              <Option v-for="item in statusList" :key="item.code" :value="item.code">{{ item.name }}</Option>
            </Select>
          </Row>
          <Row>
            <DatePicker class="w280 mr10" v-model="datetime" type="datetimerange" placement="bottom-end" placeholder="选择日期"></DatePicker>
          </Row>
        <i-col>
          <i-button type="primary" @click="getPartnerList(1)" icon="search">查 询</i-button>
        </i-col>
       </i-col>
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.pageNum"
              @on-page-size-change="changePageSize"
              @on-change="getPartnerList"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { statusList } from '../data'
import { getPartnerList } from '@/api/user/cityPartner'
import { formatDate } from '@/libs/util'
import makeColumns from './data/cityPartnerList-columns'

export default {
  name: 'cityPartnerList',
  data() {
    return {
      statusList,
      datetime: '',
      companyList: [],
      searchForm: {
        roleId: 1, // 1 表示城市合伙人
        status: '', // 状态
        mobile: '', // 手机号
        partnerName: '', // 合伙人名称
        controlledCompanyName: '', // 分公司名称
        startDate: '', // 开始时间
        endDate: '' // 结束时间
      },
      pager: {
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColumns.call(this),
      tableData: []
    }
  },
  created() {
    this.getPartnerList()
    // this.getCompanyList()
  },
  methods: {

    // 分页 size 变化
    changePageSize(size) {
      this.pager.pageSize = size
      this.getPartnerList()
    },

    // 查询
    getPartnerList(page) {
      this.pager.pageNum = page || this.pager.pageNum
      let query = Object.assign({}, this.searchForm, this.pager, {
        startDate: formatDate(this.datetime[0], 'yyyy-MM-dd hh:mm:ss') || undefined,
        endDate: formatDate(this.datetime[1], 'yyyy-MM-dd hh:mm:ss') || undefined
      })
      getPartnerList(query).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.pager.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.pager.totalCounts = 0
        }
      })
    }

    // 分公司下拉列表查询
    // getCompanyList() {
    //   getCompanyList().then(res => {
    //     this.companyList = res.data
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.citypartnerList {
  /deep/ .ivu-tooltip {
    display: inline;
  }
}
</style>
