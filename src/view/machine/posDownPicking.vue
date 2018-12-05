<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">pos机下拨</h3>
    <Card>
      <Row>
        <Col span="8">
          <Button type="success" class="w120 btn-add mr20" icon="plus" @click="isShowPass = true;paramsTT.pos_brand_id = null; paramsTT.pos_csn = ''">机具入库</Button>
          <Button type="primary" v-if="select.length > 0" @click="selectPosDown">下拨选中机具</Button>
          <Button type="primary" disabled v-else>下拨选中机具</Button>
        </Col>
        <Col span="16" align="right">
          <Input clearable placeholder="请输入CSN号" style="width: 180px; margin-right: 20px;" v-model="paramsT.pos_csn" />
          <Input clearable placeholder="请输入机身号" style="width: 180px; margin-right: 20px;" v-model="paramsT.terminal_number" />
          <Input clearable placeholder="请输入入库单号" style="width: 180px; margin-right: 20px;" v-model="paramsT.storage_no" />
          <DatePicker type="datetimerange" placeholder="请选择时间" style="width: 300px; margin-right: 20px;" v-model="create_time"></DatePicker>
          <Button type="primary" icon="ios-search" style="margin-right: 20px;" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;" @on-selection-change="changeSelect" ref="selection"></Table>
      <Page :total="totalCounts" show-sizer :page-size="paramsT.pageSize" :current.sync="paramsT.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
      <Modal v-model="isShow" :mask-closable="false" :closable="true" title="下拨机具" class-name="vertical-center-modal">
          <div slot="footer">
              <Button type="text" size="large" @click="cancel">取消</Button>
              <Button type="primary" size="large" @click="posDown">确定</Button>
          </div>
          <Form ref="form" :model="params" :rules="rules" :label-width="80">
            <!-- <FormItem label="出库人：" prop="outOfStore">
                <Select v-model="params.outOfStore" placeholder="请选择出库人"></Select>
            </FormItem> -->
            <FormItem label="接收人：" prop="recipient">
                <Select v-model="params.recipient" placeholder="请选择接收人">
                  <Option v-for="(item, index) in list" :key="index" :value="item.mobile">{{item.username}}</Option>
                </Select>
            </FormItem>
          </Form>
      </Modal>
      <Modal v-model="isShowPass" :mask-closable="false" :closable="true" title="机具入库操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="primary" size="large" @click="passOrContinue(1)">完成</Button>
            <Button type="primary" size="large" @click="passOrContinue(2)">继续入库</Button>
        </div>
        <div class="mb20">请填写机具入库信息：</div>
         <Form ref="form" :label-width="80">
            <FormItem label="机具品牌：">
                <Select v-model="paramsTT.pos_brand_id">
                  <Option :value="1">新大陆</Option>
                  <Option :value="2">嘉联</Option>
                </Select>
            </FormItem>
            <FormItem label="CSN号：">
                <Input type="text" v-model="paramsTT.pos_csn" placeholder="请填写CSN号" />
            </FormItem>
        </Form>
    </Modal>
    </Card>
  </div>
</template>

<script>
import { findPosSendList, findPartnerList, posSendDown, savePosInfo } from '@/api/posManager'
export default {
  name: 'userManger',
  data () {
    return {
      isShowPass: false,
      params: {
        outOfStore: '',
        recipient: ''
      },
      paramsTT: {
        pos_csn: '',
        pos_brand_id: null
      },
      list: [],
      create_time: '',
      paramsT: {
        pos_csn: '',
        terminal_number: '',
        storage_no: '',
        create_time: '',
        end_time: '',
        pageNum: 1,
        pageSize: 20,
        status: 1
      },
      rules: {
        outOfStore: [
          { required: true, message: '请选择出库人', trigger: 'change' }
        ],
        recipient: [
          { required: true, message: '请选择接收人', trigger: 'change' }
        ]
      },
      isShow: false,
      select: [],
      totalCounts: 0,
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
          title: 'CSN',
          key: 'pos_csn'
        },
        // {
        //   title: '入库单号',
        //   key: 'storage_no'
        // },
        {
          title: '机身号',
          key: 'terminal_number'
        },
        {
          title: '入库时间',
          key: 'time',
          render: (h, params) => {
            return h('div', [
              h('span', this.fmtDate(params.row.create_time))
            ])
          }
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
        that.paramsT.create_time = date.valueOf()
        that.paramsT.create_time = '' + that.fmtDate(that.paramsT.create_time)
        that.paramsT.end_time = date1.valueOf()
        that.paramsT.end_time = '' + that.fmtDate(that.paramsT.end_time)
      }
      findPosSendList(that.paramsT).then(res => {
        if (res.data) {
          that.tableData = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.tableData = []
          that.totalCounts = 0
        }
      })
    },
    selectPosDown() {
      let that = this
      that.isShow = true
      findPartnerList().then(res => {
        that.list = res.data
      })
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
          this.paramsTT.pos_csn = ''
          this.paramsTT.pos_brand_id = null
        }
      })
    },
    // 分页切换
    getpage(val) {
      this.paramsT.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.paramsT.pageSize = val
      this.getAll()
    },
    changeSelect(val) {
      this.select = val
    },
    posDown() {
      let that = this
      let name = null
      let id = null
      let roleId = null
      if (!that.params.recipient) {
        that.$Message.error('请选择接收人！')
        return
      }
      for (let i = 0; that.list.length; i++) {
        if (this.params.recipient === that.list[i].mobile) {
          name = that.list[i].username
          id = that.list[i].user_id
          roleId = that.list[i].role_id
          that.select.forEach((item) => {
            item.handlers_name = name
            item.handlers_id = id
            item.handlers_role_id = roleId
            item.mobile = that.params.recipient
            item.status = 1
            item.pos_storage_id = item.id
          })
          posSendDown(that.select).then(res => {
            that.isShow = false
            that.params.recipient = ''
            that.select = []
            that.getAll()
          })
          return
        }
      }
    },
    cancel() {
      this.isShow = false
      this.params.outOfStore = ''
      this.params.recipient = ''
    }
  }
}
</script>

<style lang="less">
</style>
