
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          体验店线上订单
        </p>
      <div>
        <div style="width:100%">
          <div class="tr">
             <Input  placeholder="请输入订单号" style="width: 200px" v-model="order_uuid" clearable></Input>
            <Input  placeholder="请输入门店名称" style="width: 200px;margin-left:10px;" v-model="storename" clearable></Input>
           <Input placeholder="请输入会员手机号或者姓名" style="width:200px;margin-left:10px;" v-model="phone_number" clearable></Input>
            <Select clearable style="width:100px;margin-left:10px;" v-model="order_status">
                  <Input  placeholder="请输入订单号" style="width: 200px" v-model="order_uuid" clearable></Input>
            <Input  placeholder="请输入门店名称" style="width: 200px;margin-left:10px;" v-model="storename" clearable></Input>
           <Input placeholder="请输入会员手机号或者姓名" style="width:200px;margin-left:10px;" v-model="phone_number" clearable></Input>
            <Select clearable style="width:100px;margin-left:10px;" v-model="order_status">
                            <Option value="0">待付款</Option>
                            <Option value="1">待核销</Option>
                            <Option value="2">已核销</Option>
                            <Option value="3">已核销-部分退款</Option>
                            <Option value="4">申请退款</Option>
                             <Option value="5">已退款</Option>
                            <Option value="6">待结算</Option>
                            <Option value="7">结算中</Option>
                            <Option value="8">已结算</Option>
            </Select>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:  200px; " v-model="date"></DatePicker>
                          </label>

             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        查询
              </Button>           <Option value="0">待付款</Option>
                            <Option value="1">待核销</Option>
                            <Option value="2">已核销</Option>
                            <Option value="3">已核销-部分退款</Option>
                            <Option value="4">申请退款</Option>
                             <Option value="5">已退款</Option>
                            <Option value="6">待结算</Option>
                            <Option value="7">结算中</Option>
                            <Option value="8">已结算</Option>
            </Select>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:  200px; " v-model="date"></DatePicker>
                          </label>

             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        查询
              </Button>
          </div>

          </div>
               <div class="tr" style="margin-top:20px;">
                 <Table  :columns="params" :data="data" stripe border></Table>
                 <br>
                  <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="currentPage"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
                </div>

      </div>

        </Card>
       </div>
</template>
<script>
import { orderList } from '@/api/order'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 父订单号
      order_uuid: '',
      // 门店id
      id: '',
      // 订单状态
      order_status: '',
      //  会员手机号
      phone_number: '',
      // 门店名称
      storename: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      params: [
        {
          title: '门店名称',
          key: 'storeName'
        },
        {
          title: '订单号',
          key: 'orderUuid'
        },
        {
          title: '会员手机号',
          key: 'mobile'
        },

        {
          title: '套餐数',
          key: 'taocanmumber'
        },
        {
          title: '应收',
          key: 'money'
        },
        {
          title: '实收',
          key: 'realMoney'
        },
        {
          title: '下单时间',
          key: 'createTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          title: '订单状态',
          key: 'ddstatus'
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
                    marginRight: '5px',
                    display: params.row.status === 9 ? 'none' : ''
                  },
                  on: {
                    click: () => {
                      // this.seeorder(params.row.id)

                      this.$router.push({ path: 'see-online-order',
                        query: {
                          orderUuid: params.row.orderUuid
                        }
                      })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.status === 9 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: 'see-online-order',
                        query: {
                          orderUuid: params.row.orderUuid
                        }
                      })
                    }
                  }
                },
                '发货'
              )
            ])
          }
        }
      ],
      data: [

      ]
    }
  },
  created() {
    this.getAll()
    // this.updataArray()
  },
  methods: {
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      //  order_uuid:this.order_uuid,order_status:this.order_status,create_time:starttime,end_time:endtime

      orderList({ storename: this.storename, order_uuid: this.order_uuid, order_status: this.order_status, create_time: starttime, end_time: endtime, pageNum: this.currentPage, pageSize: this.pageSize, is_since: 1, type: 2 }).then(res => {
        that.data = res.data
        that.totalCounts = res.total
        that.updataArray()
      })
    },
    updataArray() {
      this.data.forEach(item => {
        if (item.status === 9) {
          item.ddstatus = '待发货'
        } else if (item.status === 10) {
          item.ddstatus = '待收货'
        } else if (item.status === 11) {
          item.ddstatus = '已收货'
        } else if (item.status === 12) {
          item.ddstatus = '准备退货'
        } else if (item.status === 13) {
          item.ddstatus = '退货中'
        } else if (item.status === 14) {
          item.ddstatus = '待退款'
        } else if (item.status === 6) {
          item.ddstatus = '待结算'
        } else if (item.status === 7) {
          item.ddstatus = '结算中'
        } else if (item.status === 8) {
          item.ddstatus = '已结算'
        } else if (item.status === 4) {
          item.ddstatus = '申请退款'
        } else if (item.status === 5) {
          item.ddstatus = '已退款'
        }
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    }
  }
}
</script>
