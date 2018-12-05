<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">pos机下拨记录</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <Input clearable placeholder="请输入合伙人手机号" style="width: 180px; margin-right: 20px;" v-model="params.mobile" />
          <Input clearable placeholder="请输入合伙人名称" style="width: 180px; margin-right: 20px;" v-model="params.handlers_name" />
          <Input clearable placeholder="请输入CSN号" style="width: 180px; margin-right: 20px;" v-model="params.pos_csn" />
          <Button type="primary" icon="ios-search" style="margin-right: 20px;" @click="getAll">查询</Button>
          <Button type="primary" size="large" v-if="selectList.length === 0" disabled>选中回拨</Button>
          <Button type="primary" size="large" @click="isShow = true" v-else>选中回拨</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;" @on-selection-change="changeSelect"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="机具回拨" width="800" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false">取消</Button>
            <Button type="primary" size="large" @click="posDown">回拨</Button>
        </div>
        <Input type="textarea" :rows="4" placeholder="请填写回拨原因（必填）" v-model= cause />
    </Modal>
  </div>
</template>

<script>
import { findPosSendList, posEchoplex } from '@/api/posManager'
export default {
  name: 'userManger',
  data () {
    return {
      params: {
        mobile: '',
        handlers_name: '',
        pos_csn: '',
        status: 1,
        pageSize: 20,
        pageNum: 1
      },
      selectList: [],
      cause: '',
      isShow: false,
      totalCounts: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '渠道合伙人',
          key: 'handlers_name'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: 'CSN',
          key: 'pos_csn'
        },
        {
          title: '下拨时间',
          key: 'create_time',
          render: (h, params) => {
            return h('div', [
              h('span', this.fmtDate(params.row.create_time))
            ])
          }
        }
        // {
        //   title: '操作',
        //   key: 'see',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         on: {
        //           click: () => {
        //             this.isShow = true
        //           }
        //         }
        //       }, '查看')
        //     ])
        //   }
        // }
      ],
      tableData: []
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
    },
    changeSelect(val) {
      this.selectList = val
    },
    posDown() {
      let that = this
      if (!that.cause) {
        that.$Message.error('请填写回拨原因！')
        return
      }
      that.selectList.forEach((item) => {
        item.status = 2
        item.cause = that.cause
      })
      posEchoplex(that.selectList).then(res => {
        that.isShow = false
        that.getAll()
      })
    }
  }
}
</script>

<style lang="less">
</style>
