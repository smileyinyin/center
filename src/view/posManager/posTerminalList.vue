<template>
  <div class="posTerminalList">
    <h3 class="pb10">pos终端列表</h3>
    <Card>
      <Row class="pb20" type="flex">
        <i-col style="flex:1">
          <Row class="pb20" type="flex" justify="end">
            <Input v-model="searchForm.terminal" placeholder="终端号" clearable class="w120 mr20"/>
            <Select v-model="searchForm.brand" clearable class="w120 mr20">
              <Option v-for="item in brandList" :key="item.code" :value="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="searchForm.picihao" placeholder="批次号" clearable class="w120 mr20"/>
            <Input v-model="searchForm.citypartnerName" placeholder="合伙人名称" clearable class="w120 mr20"/>
          </Row>
          <Row class="pb20" type="flex" justify="end">
            <Input v-model="searchForm.branchCompany" placeholder="分公司" clearable class="w120 mr20"/>
            <Input v-model="searchForm.csn" placeholder="CSN" clearable class="w120 mr20"/>
            <Input v-model="searchForm.merchant" placeholder="商户" clearable class="w120 mr20"/>
          </Row>
          <Row class="pb20" type="flex" justify="end">
            <DatePicker v-model="date" type="datetimerange" placement="bottom-end" placeholder="创建时间" class="w280 mr20"></DatePicker>
          </Row>
        </i-col>
        <i-col>
          <Button type="primary" @click="getPosTerminalList(1)" icon="search">查 询</Button>
        </i-col>
      </Row>

      <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" class="mt10">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getPosTerminalList"
              @on-page-size-change="changePageSize"
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import makeColums from './data/posTerminalList-columns'
import { brandList } from './data'
import * as Api from '@/api/posManager/posTerminalList'
import { formatDate } from '@/libs/util'

export default {
  name: 'posTerminalList',
  data() {
    return {
      date: [],
      brandList,
      searchForm: {
        terminal: '', // 终端号
        brand: '', // 品牌
        picihao: '', // 批次号
        citypartnerName: '', // 合伙人名称
        createTime: '', // 下拨时间
        endTime: '',
        branchCompany: '', // 分公司
        csn: '', // CSN
        merchant: '' // 商户
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      loading: false,
      columns: makeColums.call(this),
      tableData: []
    }
  },

  methods: {

    // 获取pos终端列表
    async getPosTerminalList(page) {
      // TODO
      this.pager.currentPage = page || this.pager.currentPage
      this.loading = true
      // TODO
      try {
        await Api.getPosTerminalList(Object.assign({}, this.searchForm, this.pager, {
          createTime: formatDate(this.date[0]),
          endTime: formatDate(this.date[1])
        }))
      } finally {
        this.loading = false
      }
    },

    // 改变分页
    changePageSize(size) {
      debugger
      this.pager.pageSize = size
      this.getEquipmentInventoryList()
    }
  }
}
</script>
