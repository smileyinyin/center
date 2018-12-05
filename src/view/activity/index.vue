<template>
  <div class="entry">
    <h3 class="pb10">活动管理</h3>
    <Card>
      <Row type="flex" justify="end">
        <i-col>
          <Input placeholder="活动名称" v-model="searchForm.keyWord"  clearable class="w180 mr20" />
          <!-- <Select class="mr10 w140" placeholder="请选择银行" clearable>
            <Option ></Option>
          </Select> -->
          <Select class="mr10 w180" placeholder="请选择活动状态" v-model="searchForm.status" clearable>
            <Option v-for="item in activityStatus" :key="item.value" :value="item.value">{{ item.des }}</Option>
          </Select>
          <Select class="mr10 w180" placeholder="请选择活动类型" v-model="searchForm.ruleType" clearable>
            <Option v-for="item in activityTemplates" :key="item.value" :value="item.value">{{ item.des }}</Option>
          </Select>
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="选择日期" class="w180 mr20"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getBankList(1)">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="params" :data="tableData" class="mt20"></Table>
      <Page :total="searchForm.totalCounts" show-sizer :page-size="searchForm.size" :current.sync="searchForm.page" @on-change="getBankList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
    <Modal
      v-model="modal"
      footer-hide
    >
      <commission :activityId="activityId" @close="modal = false"></commission>
    </Modal>
  </div>
</template>

<script>
import commission from './commission'
import { banklist } from '@/api/bank/activity'
import { formatDate, _pickUseful } from '@/libs/util'

const activityTemplates = [
  { des: '满多少减多少', value: 'MeetMinus' },
  { des: '满多少打几折', value: 'MeetDiscount' },
  { des: '几号几折', value: 'DateDiscount' },
  { des: '立折规则', value: 'ImmediatelyDiscount' },
  { des: '立减规则', value: 'ImmediatelyMinus' },
  { des: '随机折扣', value: 'RandomDiscount' },
  { des: '随机立减', value: 'RandomMinus' },
  { des: '连环折扣', value: 'SerialDiscount' },
  { des: '周几几折', value: 'WeekdayDiscount' }
]
const activityStatus = [
  { des: '草稿', value: 'draft' },
  { des: '待审核', value: 'wait_check' },
  { des: '活动上线', value: 'online' },
  { des: '活动中', value: 'in_progress' },
  { des: '提前下线', value: 'early_offline' },
  { des: '活动结束', value: 'finish' }
]

export default {
  name: 'activityList',
  data() {
    return {
      activityTemplates,
      activityStatus,
      searchForm: {
        status: '', // 活动状态
        keyWord: '', // 关键词 活动名称、活动id、商户id
        ruleType: '', // 活动类型
        startDate: '',
        endDate: '',
        page: 1,
        size: 20,
        totalCounts: 0
      },
      date: [],
      // isShowActive: false,
      params: [
        {
          title: '活动ID',
          key: 'id'
        },
        {
          title: '活动名称',
          key: 'name'
        },
        // {
        //   title: '活动类型',
        //   key: 'actTypeStr'
        // },
        {
          title: '活动类型',
          key: 'ruleType',
          render: (h, params) => {
            let type = this.activityTemplates.find(item => item.value === params.row.ruleType)
            return h('span', null, type ? type.des : '')
          }
        },
        {
          title: '主办方',
          key: 'bankName'
        },
        // {
        //   title: '参与卡BIN',
        //   key: 'username'
        // },
        {
          title: '开始日期',
          key: 'startTime',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.startTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        },
        {
          title: '结束日期',
          key: 'endTime'
          // render: (h, params) => {
          //   return h(
          //     'span',
          //     null,
          //     formatDate(
          //       new Date(params.row.endTime),
          //       'yyyy-MM-dd hh:mm:ss'
          //     )
          //   )
          // }
        },
        {
          title: '最后操作人',
          key: 'updatedBy'
        },
        {
          title: '创建人',
          key: 'createdBy'
        },
        {
          title: '创建日期',
          key: 'createdAt'
          // render: (h, params) => {
          //   return h(
          //     'span',
          //     null,
          //     formatDate(
          //       new Date(params.row.createdAt),
          //       'yyyy-MM-dd hh:mm:ss'
          //     )
          //   )
          // }
        },
        {
          title: '状态',
          key: 'statusStr'
          // render: (h, params) => {
          //   let status = params.row.status
          //   let item = activityStatus.find(item => item.value === status)
          //   return h('span', null, item ? item.des : '')
          // }
        },
        {
          title: '操作',
          width: 150,
          key: 'control',
          render: (h, params) => {
            let status = params.row.status
            let hasCommission = status === 'online' || status === 'in_progress'
            return h('div', null, [
              h(
                'Button',
                {
                  props: { type: 'info', size: 'small' },
                  style: { marginRight: '5px' },
                  on: { click: () => this.checkActivity(params.row) }
                },
                '详情'
              ),
              // 活动上线时 出现佣金
              hasCommission && h(
                'Button',
                {
                  props: { type: 'warning', size: 'small' },
                  style: { marginRight: '5px' },
                  on: { click: () => this.showCommission(params.row) }
                },
                '佣金'
              )

            ])
          }
        }
      ],
      tableData: [
        // {
        //   id: 1312,
        //   name: 'name',
        //   ruleType: 'ImmediatelyMinus',
        //   bankName: 'XX银行',
        //   startTime: '2018-07-30 00:00:00',
        //   endTime: '2018-08-08 23:59:59',
        //   updatedBy: 'alme',
        //   createdBy: 'alme',
        //   createdAt: '2018-08-08 23:59:59',
        //   statusStr: '活动上线',
        //   status: 'online'
        // }
      ],

      modal: false,
      activityId: ''
    }
  },
  created() {
    this.getBankList()
  },
  methods: {
    getBankList(page) {
      this.searchForm.page = page || this.searchForm.page
      let query = Object.assign({}, this.searchForm, {
        startDate: formatDate(this.date[0]),
        endDate: formatDate(this.date[1])
      })
      query = _pickUseful(query)
      banklist(query).then(res => {
        this.tableData = res.data
        this.searchForm.totalCounts = res.totalCounts
      })
    },
    getpage(page) {
      this.searchForm.page = page
      this.getBankList()
    },
    changePageSize(size) {
      this.searchForm.size = size
      this.getBankList()
    },
    showCommission(row) {
      this.modal = true
      this.activityId = row.id
    },
    checkActivity(row) {
      this.$router.push({ name: 'activityCheck', query: { activityId: row.id } })
    }
  },
  components: { commission }
}
</script>
