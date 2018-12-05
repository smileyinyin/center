<template>
  <div class="enty">
    <h3 style="padding-bottom: 10px">pos机管理</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Input placeholder="终端号" clearable style="width: 180px; margin-right: 20px;" v-model="params.terminal" />
          <Input placeholder="CSN号" clearable style="width: 180px; margin-right: 20px;" v-model="params.code" />
          <Select placeholder="机具状态"  clearable style="width: 180px; margin-right: 20px; text-align: left" v-model="params.status">
            <Option :value="0">未激活</Option>
            <Option :value="1">已启用</Option>
            <Option :value="4">已停用</Option>
          </Select>
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="选择交易起止日期" style="width: 300px; margin-right: 20px;" v-model="time"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
       <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.currentPage" @on-change="getEntryList" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right;"> </Page>
    </Card>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="状态操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false">取消</Button>
            <Button type="primary" size="large" @click="statusOperation">确定</Button>
        </div>
        <div>确认要{{title}}吗？</div>
    </Modal>
    <Modal v-model="isShowActive" :mask-closable="false" :closable="true" title="激活操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShowActive = false">取消</Button>
            <Button type="primary" size="large" @click="sureActive">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="商户号：">
            <span>{{merchantUUID}}</span>
          </FormItem>
          <FormItem label="终端号：">
            <span>{{terminalNumber}}</span>
          </FormItem>
          <FormItem label="CNS号：">
            <Input placeholder="请输入CNS号" v-model="posCsn" />
          </FormItem>
          <FormItem label="激活码：">
            <Input placeholder="请输入激活码" v-model="activeCode" />
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { findPosList, posActive, posQiJinYong } from '@/api/posManager'
export default {
  name: 'entry',
  data() {
    return {
      time: [],
      isShowActive: false,
      id: null,
      status: null,
      activeCode: null,
      params: {
        startTime: '',
        endTime: '',
        code: '',
        status: null,
        currentPage: 1,
        pageSize: 20,
        terminal: ''
      },
      isShow: false,
      title: '',
      currentPage: 1,
      posAppStatus: '',
      totalCounts: 0,
      pageSize: 20,
      date: '',
      posApply: '',
      num: null,
      terminalNumber: '', // 终端号
      merchantUUID: '', // 商户号
      posCsn: '', // csn
      columns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '品牌',
          key: 'brandId',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.brandId === 1 ? '新大陆' : '嘉联')
            ])
          }
        },
        {
          title: '商户号',
          key: 'merchantUUID'
        },
        // {
        //   title: 'CSN',
        //   key: 'posCsn'
        // },
        {
          title: '终端号',
          key: 'terminalNumber'
        },
        {
          title: '门店名称',
          key: 'storesName'
        },
        {
          title: '状态',
          key: 'posStatus',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.posStatus === 0 ? '未激活' : (params.row.posStatus === 1 ? '已启用' : '已停用'))
            ])
          }
        },
        {
          title: '最近一笔交易时间',
          key: 'posPayTime',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.posPayTime ? this.fmtDate(params.row.posPayTime) : '')
            ])
          }
        },
        {
          title: '操作',
          key: 'time',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.posStatus === 0 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.isShowActive = true
                      this.id = params.row.id
                      this.merchantUUID = params.row.merchantUUID
                      this.terminalNumber = params.row.terminalNumber
                    }
                  }
                },
                '激活'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.posStatus === 4 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.isShow = true
                      this.id = params.row.id
                      this.status = params.row.posStatus
                      this.title = '启用'
                    }
                  }
                },
                '启用'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.posStatus === 1 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.isShow = true
                      this.title = '停用'
                      this.id = params.row.id
                      this.status = params.row.posStatus
                    }
                  }
                },
                '停用'
              )
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
      if (that.time.length === 2 && that.time[0] && that.time[1]) {
        that.params.startTime = that.time[0]
        that.params.endTime = that.time[1]
        let date = new Date(that.params.startTime)
        let date1 = new Date(that.params.endTime)
        that.params.startTime = date.valueOf()
        that.params.endTime = date1.valueOf()
        that.params.endTime = '' + that.fmtDate(that.params.endTime)
        that.params.startTime = '' + that.fmtDate(that.params.startTime)
      } else {
        that.params.endTime = ''
        that.params.startTime = ''
      }
      findPosList(that.params).then(res => {
        that.tableData = res.data
        that.totalCounts = res.totalCounts
      })
    },
    // pos激活
    sureActive() {
      let that = this
      if (!that.activeCode) {
        this.$Message.error('请填写终端号！')
        return
      }
      if (!that.posCsn) {
        this.$Message.error('请填写CSN号！')
        return
      }
      posActive({ id: that.id, activeCode: that.activeCode }).then(res => {
        that.getAll()
        that.isShowActive = false
        that.id = null
        that.activeCode = ''
      })
    },
    // 分页改变
    getEntryList(val) {
      this.params.currentPage = val
      this.getAll()
    },
    // 每页显示列表条数
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    },
    statusOperation() {
      let that = this
      if (that.status === 1) {
        that.status = 4
      } else {
        that.status = 1
      }
      posQiJinYong({ id: that.id, status: that.status }).then(res => {
        that.getAll()
        that.id = null
        that.status = null
        that.isShow = false
      })
    }
  }
}
</script>
