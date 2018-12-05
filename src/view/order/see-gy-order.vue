
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          供应链订单列表
        </p>
      <div>
        <div style="width:100%;overflow:hidden">
           <div style="float:right">
           <Input  placeholder="请输入订单号" style="width: 200px" v-model="order_uuid"/>
           <Input  placeholder="请输入门店名称" style="width: 200px;margin-left:10px" v-model="storename"/>
           <Input placeholder="请输入会员手机号或者姓名" style="width:200px;margin-left:10px;" v-model="phone_number"/>
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
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderUuid'
        },
        {
          title: '门店名称',
          key: 'storeName'
        },
        // {
        //   title: '供应链商家',
        //   key: 'order_uuid'
        // },
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
        }

      ],
      data: []
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

      orderList({ type: 1, storename: this.storename, order_uuid: this.order_uuid, order_status: this.order_status, create_time: starttime, end_time: endtime, pageNum: this.currentPage, pageSize: this.pageSize }).then(res => {
        that.data = res.data
        that.totalCounts = res.total
        that.updataArray()
      })
    },
    updataArray() {
      this.data.forEach(item => {
        if (item.status === 0) {
          item.ddstatus = '待付款'
        } else if (item.status === 1) {
          item.ddstatus = '待核销'
        } else if (item.status === 2) {
          item.ddstatus = '已核销'
        } else if (item.status === 3) {
          item.ddstatus = '已核销（部分退款）'
        } else if (item.status === 4) {
          item.ddstatus = '申请退款'
        } else if (item.status === 5) {
          item.ddstatus = '已退款'
        } else if (item.status === 6) {
          item.ddstatus = '待结算'
        } else if (item.status === 7) {
          item.ddstatus = '结算中'
        } else if (item.status === 8) {
          item.ddstatus = '已结算'
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
