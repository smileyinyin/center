<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">会员管理</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Select placeholder="会员状态" clearable style="width: 180px; margin-right: 20px; text-align: left;" v-model="params.status">
            <Option :value="0">正常</Option>
            <Option :value="1">冻结</Option>
          </Select>
          <Input clearable placeholder="请输入会员ID" style="width: 180px; margin-right: 20px;" v-model="params.merchants_id"/>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.number" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
  </div>
</template>

<script>
/* eslint-disable */
import { findMembers, updataStatus } from '@/api/userManger'
export default {
  name: 'userManger',
  data () {
    return {
      params: {
        pageNum: 1,
        pageSize: 20,
        status: null,
        merchants_id: null
      },
      totalCounts: 0,
      columns: [
        {
          title: '序号',
          // key: 'id',
          type:'index'
        },
        {
          title: '会员ID',
          key: 'merchants_id',
          width: 120
        },
        // {
        //   title: '绑定体验店',
        //   key: 'experience_id'
        // },
        {
          title: '绑定门店',
          key: 'name'
        },
        {
          title: '余额',
          key: 'money'
        },
        {
          title: '积分',
          key: 'integral',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  cursor: 'pointer',
                  color: '#2d8cf0',
                  textDecoration: 'underline'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: 'integralDetail',
                      query: {
                        id: params.row.id
                      }
                    })
                  }
                }
              }, params.row.integral)
            ])
          }
        },
        {
          title: '订单数',
          key: 'user_id'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: params.row.status === 1 ? '#ed4014' : '#19be6b'
                }
              }, params.row.status === 1 ? '冻结' : '正常')
            ])
          }
        },
        {
          title: '时间',
          key: 'Time',
          width: 150
        },
        {
          title: '操作',
          key: 'operation',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: 'userDetail',
                      query: {
                        id: params.row.id,
                        merchants_id:params.row.merchants_id
                      }
                    })
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: params.row.status === 1 ? 'success' : 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.confirmationOperation(params.row)
                  }
                }
              }, params.row.status === 1 ? '恢复' : '冻结')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      let that = this
      findMembers(that.params).then(res => {
        that.tableData = res.data.list
        that.totalCounts = res.data.total
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
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
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
