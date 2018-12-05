<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">渠道合伙人库存</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Input clearable placeholder="请输入合伙人姓名" style="width: 180px; margin-right: 20px;" v-model="params.mobile" />
          <Input clearable placeholder="请输入合伙人手机号" style="width: 180px; margin-right: 20px;" v-model="params.handlers_name" />
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
  </div>
</template>

<script>
import { findPosSendList } from '@/api/posManager'
export default {
  name: 'userManger',
  data () {
    return {
      params: {
        mobile: '',
        handlers_name: '',
        status: 2,
        pageSize: 20,
        pageNum: 1
      },
      table: [
        {
          id: 1,
          number: 22,
          time: '2018-6-28'
        }
      ],
      totalCounts: 0,
      columns: [
        {
          title: '序号',
          key: 'handlers_name'
        },
        {
          title: '下级合伙人',
          key: 'handlers_name'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '机具总数',
          key: 'mobile'
        },
        {
          title: '激活数',
          key: 'create_time'
        },
        {
          title: '操作',
          key: 'cz',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: 'channelPartnerInventoryDetails' })
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      tableData: [
        {
          handlers_name: 1,
          mobile: '12345678998',
          create_time: 111
        }
      ]
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    fmtDate(obj) {
      let time = new Date(obj)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()
      let mm = time.getMinutes()
      let s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    add0(m) { return m < 10 ? '0' + m : m },
    getAll() {
      let that = this
      findPosSendList(that.params).then(res => {
        if (res.data) {
          that.tableData = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.tableData = []
        }
      })
    },
    // 分页切换
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    }
  }
}
</script>

<style lang="less">
</style>
