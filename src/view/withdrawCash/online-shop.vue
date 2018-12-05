
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          线上商家流水
        </p>
      <div>
        <div style="width:100%;overflow:hidden">
           <div style="float:right">
           <Input placeholder="请输入订单号" style="width: 200px" v-model="orderSn" clearable/>
           <Input placeholder="请输入会员手机号" style="width:200px;margin-left:10px;" v-model="mobile" clearable/>
           <Input placeholder="请输入商家名称" style="width:200px;margin-left:10px;" v-model="storeName" clearable/>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  200px; " v-model="date"></DatePicker>
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
import { flowList } from '@/api/zd'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 订单号
      orderSn: '',
      // 手机号
      mobile: '',
      // 商家姓名
      storeName: '',
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
          key: 'order_uuid'
        },
        {
          title: '会员ID',
          key: 'user_id'
        },
        {
          title: '商家',
          key: 'name'
        },
        {
          title: '商品数',
          key: 'goods_number'
        },
        {
          title: '应收',
          key: 'money'
        },
        {
          title: '实收',
          key: 'real_money'
        },
        {
          title: '核销时间',
          key: 'account_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.account_time),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
      ],
      data: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    getAll() {
      let that = this
      let start = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let end = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      flowList({
        orderType: 2,
        // storeId: 11,
        mobile: this.mobile,
        orderSn: this.orderSn,
        storeName: this.storeName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: start,
        endTime: end
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          if (res.data) {
            that.data = res.data.list
            that.totalCounts = res.data.total
          } else {
            that.data = []
            that.totalCounts = 0
          }
        }
      })
    }
  }
}
</script>
