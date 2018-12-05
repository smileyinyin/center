<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">会员管理</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Select placeholder="会员状态" clearable style="width: 180px; margin-right: 20px; text-align: left;" v-model="status">
            <Option :value="0">正常</Option>
            <Option :value="1">冻结</Option>
          </Select>
          <Input clearable placeholder="请输入会员ID" style="width: 180px; margin-right: 20px;" v-model="mobile"/>
          <label style="margin-left:10px">
                      <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择注册时间" style="width:  150px; margin-right: 20px;" v-model="date"></DatePicker>
          </label>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
      <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
  </div>
</template>

<script>
/* eslint-disable */
import { getMemberList} from '@/api/member/index'
import makeColums from './data/index'
import { formatDate } from '@/libs/util'
export default {
  name: 'userManger',
  data () {
    return {
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      //状态
      status: null,
      //会员ID
      mobile: null,
      date:'',
      totalCounts: 0,
      columns: makeColums.call(this),
      tableData: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      let that = this
       let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      getMemberList({
        mobile:this.mobile,
        status:this.status,
        startDate:starttime,
        endDate:endtime,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
        that.updatedArray()
      })
    },
    updatedArray() {
      this.tableData.forEach((item) => {
        let time = new Date(item.create_time)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        let h = time.getHours()
        let mm = time.getMinutes()
        let s = time.getSeconds()
        item.Time = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
      })
    },
    add0(m) { return m < 10 ? '0' + m : m },
    // 分页切换
    getpage(page) {
      this.currentPage = page || this.currentPage
      this.getAll()
    },
    // 页面条数切换
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    // 冻结解冻操作
    confirmationOperation(row) {
      // let title = ''
      // if (row.status === 0) {
      //   title = '冻结'
      // } else {
      //   title = '恢复'
      // }
      // TODO
      this.$Notice.info({
        title: '暂不支持',
        desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
      })
      // TODO
      // this.$Modal.confirm({
      //   title: `${title}操作`,
      //   content: `确认要${title}用户信息吗？`,
      //   onOk: () => {
      //     if (row.status === 0) {
      //       row.status = 1
      //     } else {
      //       row.status = 0
      //     }
      //     updataStatus({ id: row.id, status: row.status }).then(res => {
      //       this.tableData.splice(row._index, 1, row)
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="less">
</style>
