<template>
  <div class="activity-check">
    <!-- 活动检查 -->
    <!-- 活动基础信息信息 -->
    <Card class="activity-base-info mt20">
      <base-information :disabled="true"></base-information>
    </Card>

    <!-- 活动规则信息 -->
    <Card class="activity-rule-info mt20">
      <activity-rule :disabled="true"></activity-rule>
    </Card>

    <!-- 测试门店列表 -->
    <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
        <h4 slot="title">测试门店列表</h4>
        <Table :columns="ticketTh" :data="commercialList"></Table>
    </Card>

      <!-- 测试结果列表 -->
      <!-- <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
          <h4 slot="title">测试结果列表</h4>
          <Table :columns="consequenceTh" :data="consequenceLIst"></Table>
      </Card> -->

      <!-- 测试报错列表 -->
      <!-- <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
          <h4 slot="title">测试报错列表</h4>
          <Table :columns="errorTh" :data="errorList"></Table>
      </Card> -->
  </div>
</template>

<script>
import BaseInformation from '../sub-pages/base-information'
import ActivityRule from '../sub-pages/activity-rules'
import tableData from './data/table-data.js'
import { getListActStore } from '@/api/bank/activity'

export default {
  name: 'activityCheck',
  data () {
    return {
      ticketTh: [],
      commercialList: [],

      consequenceTh: [],
      consequenceLIst: [],

      errorTh: [],
      errorList: [],

      activityId: ''
    }
  },

  methods: {

    getTableTh () {
      this.ticketTh = tableData.ticketTh // 测试门店列表--常规

      this.consequenceTh = tableData.consequenceTh // 测试结果列表--常规

      this.errorTh = tableData.errorTh
    },

    // 获取门店设置列表 及 查询
    async getListActStore () {
      let { data = [] } = await getListActStore(this.activityId)
      // this.commercialList = data;
      if (Object.prototype.toString.call(data) === '[object Array]') {
        this.commercialList = data
      } else {
        this.commercialList = []
      }
    }

    // 获取测试结果列表
    // async getListTest (inquire) {
    //   if (inquire === true) { // 测试结果列表
    //     let { data = [] } = await getListTest(this.activityId) //  1 是活动id  this.activityId
    //     if (Object.prototype.toString.call(data) === '[object Array]') {
    //       this.consequenceLIst = data
    //     } else {
    //       this.consequenceLIst = []
    //     }
    //   } else { // 错误结果列表
    //     let { data = [] } = await getListTest(this.activityId, 'fail') //  1 是活动id  this.activityId
    //     if (Object.prototype.toString.call(data) === '[object Array]') {
    //       this.errorList = data
    //     } else {
    //       this.errorList = []
    //     }
    //   }
    // }
  },
  created () {
    this.activityId = this.$route.query.activityId
    this.getTableTh()
    this.getListActStore()
    // this.getListTest(true)
    // this.getListTest(false)
  },

  components: {
    BaseInformation,
    ActivityRule
  }
}
</script>

<style scoped>
.table-card /deep/ .ivu-card-head {
  border: 1px solid #e9eaec;
  border-bottom: none;
}
</style>
