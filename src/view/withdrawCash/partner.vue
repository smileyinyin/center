
<template>
     <div class="settle">
      <h3 class="pb10">合伙人账单</h3>
        <Card>
        <Row>
          <i-col span="8" align="left">
             <Button type="success" @click="but">账单明细</Button>
          </i-col>
          <i-col span="16" align="right">
             <Input  placeholder="请输直属合伙人" style="width: 100px" v-model="bill" clearable />
             <Select clearable style="width:100px;margin-left:10px;" v-model="bills">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">已打款</Option>
                            <Option value="1" key="1">未提现</Option>
                            <Option value="2" key="2">审核不通过</Option>
             </Select>
             <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:200px;margin-left:10px " v-model="date"></DatePicker>
             <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
          </i-col>
        </Row>
        <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
        <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
        <Modal v-model="isShowActive" :mask-closable="false" :closable="true" title="上传发票" >
        <div slot="footer">
            <Button type="text" size="large" @click="ok">审核通过</Button>
            <Button type="primary" size="large" @click="no">审核不通过</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="发票金额：">
            <InputNumber placeholder="请输入发票金额" :min="1"/>
          </FormItem>
          <FormItem label="发票税额：">
            <InputNumber placeholder="请输入发票税额" :min="1"/>
          </FormItem>
          <FormItem label="发票张数：">
            <InputNumber placeholder="请输入发票张数" :min="1"/>
          </FormItem>
          <FormItem label="价税合计：">
            <InputNumber placeholder="请输入价税合计" :min="0.1"/>
          </FormItem>
          <FormItem label="开票单位：">
            <Input placeholder="请输入开票单位" />
          </FormItem>
          <FormItem label="开票时间：">
             <DatePicker type="date" placeholder="请选择开票时间" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="物流公司：">
            <Input placeholder="请输入物流公司" />
          </FormItem>
          <FormItem label="开票单号：">
            <Input placeholder="请输入开票单号" />
          </FormItem>
          <FormItem label="发票号：">
            <Input placeholder="请输入发票号" />
          </FormItem>
          <FormItem label="快递单号：">
            <upload-img title="快递单号"></upload-img>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="打款信息" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false">取消</Button>
            <Button type="primary" size="large" @click="sure">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="分公司：">
              <i-Input> </i-Input>
          </FormItem>
          <FormItem label="打款卡号：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="打款金额：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="绑定手机：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="手续费：">
            <Input placeholder="请输入手续费" />
          </FormItem>
          <FormItem label="打款流水号：">
            <Input placeholder="请输入打款流水号" />
          </FormItem>
          <FormItem label="上传凭证号：">
            <upload-img title="凭证号"></upload-img>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="Show" :mask-closable="false" :closable="true" title="打款信息" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="Show = false">取消</Button>
            <Button type="primary" size="large" @click="sures">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="审核不通过的原因：">
              <i-Input > </i-Input>
          </FormItem>
        </Form>
    </Modal>
       </div>
</template>
<script>
// import { findBillApply, updatebill } from '@/api/zd'
import { formatDate } from '@/libs/util'
import UploadImg from '_c/uploadImg/uploadImg'
export default {
  name: 'settle',
  components: {
    UploadImg
  },
  data() {
    return {
      isShowActive: false,
      isShow: false,
      Show: false,
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      url: '',
      params: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '合伙人',
          key: 'bill_uuid'
        },
        {
          title: '帐单号',
          key: 'bill_uuid'
        },
        {
          title: '年月',
          key: 'bill_start_date',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
                'yyyy-MM-dd'
              )
            )
          }
        },
        {
          title: '可结算金额',
          key: 'bii_m_sum_money'
        },
        {
          title: '手续费',
          key: 'bii_m_sum_money'
        },
        {
          title: '到账金额',
          key: 'bii_m_sum_money'
        },
        {
          title: '提现状态',
          key: 'ddstatus'
        },
        {
          title: '生成时间',
          key: 'create_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        },
        {
          title: '操作',
          width: 200,
          key: 'control',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                    // display: params.row.bill_no === 0 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.addfp(params.row)
                    }
                  }
                },
                '审核'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.seeMessage(params.row)
                    }
                  }
                },
                '打款'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.see(params.row)
                    }
                  }
                },
                '账单明细'
              )
            ])
          }
        }
      ],
      data: [{
        id: 1
      }]
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

      findBillApply({
        mobile: this.mobile,
        bill_uuid: this.bill,
        role_id: this.role_id,
        bill_no: this.bills,
        invoice_no: this.status,
        start_time: starttime,
        end_time: endtime,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
        that.updateArray()
      })
    },
    updateArray() {
      this.data.forEach(item => {
        // if (item.role_id === 0) {
        //   item.role = '城市合伙人'
        // } else if (item.role_id === 1) {
        //   item.role = '渠道合伙人'
        // } else if (item.role_id === 2) {
        //   item.role = '供应商'
        // } else if (item.role_id === 3) {
        //   item.role = '体验店'
        // } else if (item.role_id === 4) {
        //   item.role = '商户'
        // }

        // if (item.bill_withdraw_status === 0) {
        //   item.ddstatus = '未提现'
        // } else if (item.bill_withdraw_status === 1) {
        //   item.ddstatus = '已提现'
        // }
        // if (!item.invoice_no) {
        //   item.fpstatus = '未上传'
        //   item.ttstatus = '待上传发票'
        // } else if (item.invoice_no) {
        //   item.fpstatus = item.invoice_no
        // }
        // if (item.bill_no === 0) {
        //   item.ttstatus = '待审核'
        // } else if (item.bill_no === 1) {
        //   item.ttstatus = '通过'
        // } else if (item.bill_no === 2) {
        //   item.ttstatus = '未通过'
        // }
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    but() {
      this.$router.push({
        path: 'partners'
      })
    },
    addfp() {
      this.isShowActive = true
    },
    ok() {

    },
    no() { this.Show = true },
    seeMessage() {
      this.isShow = true
    },
    sures() {

    },
    sure() {
      if (!this.paramsT.posCsn) {
        this.$Message.error('请输入发票金额！')
        return
      }
      if (!this.paramsT.activeCode) {
        this.$Message.error('请输入发票税额！')
        return
      }
      if (!this.paramsT.terNum) {
        this.$Message.error('请输入发票张数！')
        return
      }
      updateStoresPos(this.paramsT).then(res => {
        this.getAll()
        this.isShowActive = false
      })
    }
  }
}
</script>
