<template>
  <div class="pos-warehousing">
    <h3 style="padding-bottom: 10px">pos机库存</h3>
    <Card>
      <Row>
        <Col span="8">
          <Button type="success" class="w120 btn-add mr20" icon="plus" @click="isShowPass = true;paramsT.pos_brand_id = null; paramsT.pos_csn = ''">机具入库</Button>
          <Button type="primary" v-if="select.length > 0" @click="selectPosDown">下拨选中机具</Button>
          <Button type="primary" disabled v-else>下拨选中机具</Button>
        </Col>
        <Col span="16" align="right">
          <Input clearable placeholder="请输入入库单号" style="width: 180px; margin-right: 20px;" v-model="params.storage_no" />
          <Input clearable placeholder="请输入入库人" style="width: 180px; margin-right: 20px;" v-model="params.create_user" />
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择入库时间" style="width: 300px; margin-right: 20px;" v-model="create_time"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20" @on-selection-change="changeSelect" ref="selection"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
    <Modal v-model="isShowPass" :mask-closable="false" :closable="true" title="机具入库操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="primary" size="large" @click="passOrContinue(1)">完成</Button>
            <Button type="primary" size="large" @click="passOrContinue(2)">继续入库</Button>
        </div>
        <div class="mb20">请填写机具入库信息：</div>
         <Form ref="form" :label-width="80">
            <FormItem label="机具品牌：">
                <Select v-model="paramsT.pos_brand_id">
                  <Option :value="1">新大陆</Option>
                  <Option :value="2">嘉联</Option>
                </Select>
            </FormItem>
            <FormItem label="CSN号：">
                <Input type="text" v-model="paramsT.pos_csn" placeholder="请填写CSN号" />
            </FormItem>
        </Form>
    </Modal>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="下拨机具" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" @click="posDown">确定</Button>
        </div>
        <Form ref="form" :model="paramsTT" :rules="rules" :label-width="80">
          <!-- <FormItem label="出库人：" prop="outOfStore">
              <Select v-model="params.outOfStore" placeholder="请选择出库人"></Select>
          </FormItem> -->
          <FormItem label="接收人：" prop="recipient">
              <Select v-model="paramsTT.recipient" placeholder="请选择接收人">
                <Option v-for="(item, index) in list" :key="index" :value="item.mobile">{{item.username}}</Option>
              </Select>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { findPosInputInfo, savePosInfo, findPartnerList, posSendDown } from '@/api/posManager'
export default {
  name: 'posWarehousing',
  data () {
    return {
      paramsTT: {
        outOfStore: '',
        recipient: ''
      },
      rules: {
        outOfStore: [
          { required: true, message: '请选择出库人', trigger: 'change' }
        ],
        recipient: [
          { required: true, message: '请选择接收人', trigger: 'change' }
        ]
      },
      isShowPass: false,
      isShow: false,
      totalCounts: 0,
      pageSize: 20,
      currentPage: 1,
      create_time: '',
      params: {
        storage_no: '',
        create_user: '',
        create_time: '',
        end_time: '',
        pageNum: 1,
        pageSize: 20
      },
      paramsT: {
        pos_brand_id: null,
        pos_csn: ''
      },
      list: [],
      select: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          key: 'id'
        },
        {
          title: 'CSN号',
          key: 'pos_csn'
        },
        {
          title: '入库品牌',
          key: 'pos_brand_id',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.pos_brand_id === 1 ? '新大陆' : '嘉联')
            ])
          }
        },
        {
          title: '入库时间',
          key: 'balance',
          render: (h, params) => {
            return h('div', [
              h('span', this.fmtDate(params.row.create_time))
            ])
          }
        },
        {
          title: '入库单号',
          key: 'storage_no'
        },
        {
          title: '入库人',
          key: 'create_user'
        },
        {
          title: '仓库管理员',
          key: 'storage_name'
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
      if (that.create_time.length === 2 && that.create_time[0] && that.create_time[1]) {
        let date = new Date(that.create_time[0])
        let date1 = new Date(that.create_time[1])
        that.params.create_time = date.valueOf()
        that.params.create_time = '' + that.fmtDate(that.params.create_time)
        that.params.end_time = date1.valueOf()
        that.params.end_time = '' + that.fmtDate(that.params.end_time)
      } else {
        that.params.create_time = ''
        that.params.end_time = ''
      }
      findPosInputInfo(that.params).then(res => {
        if (res.data) {
          that.tableData = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.tableData = []
          that.totalCounts = 0
        }
      })
    },
    posDown() {
      let that = this
      let name = null
      let id = null
      let roleId = null
      if (!that.paramsTT.recipient) {
        that.$Message.error('请选择接收人！')
        return
      }
      for (let i = 0; that.list.length; i++) {
        if (this.paramsTT.recipient === that.list[i].mobile) {
          name = that.list[i].username
          id = that.list[i].user_id
          roleId = that.list[i].role_id
          that.select.forEach((item) => {
            item.handlers_name = name
            item.handlers_id = id
            item.handlers_role_id = roleId
            item.mobile = that.paramsTT.recipient
            item.status = 1
            item.pos_storage_id = item.id
          })
          posSendDown(that.select).then(res => {
            that.isShow = false
            that.paramsTT.recipient = ''
            that.select = []
            that.getAll()
          })
          return
        }
      }
    },
    cancel() {
      this.isShow = false
      this.paramsTT.outOfStore = ''
      this.paramsTT.recipient = ''
    },
    selectPosDown() {
      let that = this
      that.isShow = true
      findPartnerList().then(res => {
        that.list = res.data
      })
    },
    changeSelect(val) {
      this.select = val
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
    passOrContinue(type) {
      if (!this.paramsT.pos_brand_id) {
        this.$Message.error('请填写机具品牌！')
        return
      }
      if (!this.paramsT.pos_csn) {
        this.$Message.error('请填写机具CSN号！')
        return
      }
      savePosInfo(this.paramsT).then(res => {
        this.getAll()
        if (type === 1) {
          this.isShowPass = false
        } else {
          this.paramsT.pos_csn = ''
          this.paramsT.pos_brand_id = null
        }
      })
    },
    // 冻结解冻操作
    confirmationOperation(row) {
      let title = ''
      if (row.status === 0) {
        title = '冻结'
      } else {
        title = '恢复'
      }
      this.$Modal.confirm({
        title: title + '操作',
        content: `确认要${title}用户信息吗？`,
        onOk: () => {
          if (row.status === 0) {
            row.status = 1
          } else {
            row.status = 0
          }
          this.tableData.splice(row._index, 1, row)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
