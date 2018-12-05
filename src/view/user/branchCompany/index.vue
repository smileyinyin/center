<template>
  <div class="branchCompany">
    <h3 class="pb10">分公司管理</h3>
    <Card>
      <Row class="pb20" type="flex">
        <i-col style="flex:1">
          <i-button @click="addBranchCompany"  icon="plus" class="btn-add">新增分公司</i-button>
        </i-col>
        <i-col>
          <Row class="mb15">
            <i-input v-model="searchForm.account" placeholder="登录账号" clearable class="w140 mr20"></i-input>
            <i-input v-model="searchForm.name" placeholder="分公司" clearable class="w140 mr20"></i-input>
            <i-input v-model="searchForm.chargeMan" placeholder="负责人" clearable class="w140 mr20"></i-input>
          </Row>
          <Row type="flex" justify="end">
            <DatePicker v-model="searchForm.createTime" type="datetimerange" placement="bottom-end" placeholder="创建时间" class="w280 mr20"></DatePicker>
          </Row>
        </i-col>
        <i-col>
          <i-button type="primary" @click="getCompanyList(1)" icon="search">查 询</i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" class="mt10">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getCompanyList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import makeColums from './data/branchCompany-columns'
import * as Api from '@/api/user/branchCompany'

export default {
  name: 'branchCompanyList',
  data() {
    return {
      searchForm: {
        account: '',
        name: '',
        chargeMan: '',
        createTime: ''
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColums.call(this),
      tableData: []
    }
  },
  methods: {

    // 获取分公司列表
    async getCompanyList(page) {
      this.pager.currentPage = page || this.pager.currentPage
      // TODO
      await Api.getCompanyList(Object.assign({}, this.searchForm, this.pager))
    },

    // 冻结分公司
    freezeBranchCompany(row) {
      // TODO
    },

    // 解冻分公司
    unfreezeBranchCompany(row) {
      // TODO
    },

    // 新增分公司
    addBranchCompany() {
      this.$router.push({ name: 'addBranchCompany' })
    },

    // 改变分页
    changePageSize(size) {
      debugger
      this.pager.pageSize = size
      this.getCompanyList()
    }
  }
}
</script>
