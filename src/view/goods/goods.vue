
<template>
    <div class="settle height-100">
        <Card>
            <p slot="title">
               商品管理
            </p>
              <div style="width:100%;overflow:hidden">
                       <label >
                         <Button type="success" @click="confirm" style="width:120px;" icon="plus">添加</Button>
                     </label>

                 <div style="float:right;">
                  <Input  placeholder="请输入商户名称" style="width: 120px" v-model="merchantsName" clearable />
                  <Input  placeholder="请输入门店名称" style="width: 120px;margin-left:10px;" v-model="storesName" clearable />
                  <Input  placeholder="请输入商品名称" style="width: 120px;margin-left:10px;" v-model="goodsName" clearable />
                        <Select clearable style="width:80px;margin-left:10px;" v-model="status">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">审核不通过</Option>
                            <Option value="2" key="2">上架</Option>
                            <Option value="3" key="3">下架</Option>
                        </Select>
                  <label style="margin-left:10px">
                         <DatePicker v-model="date1" type="daterange" placement="bottom-end" placeholder="请选择更新时间" style="width:  150px; "></DatePicker>
                     </label>

                     <label style="margin-left:10px">
                        <DatePicker v-model="date2" type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:  150px; "></DatePicker>
                          </label>
                     <label style="margin-left:10px">
                         <Button type="primary" :loading="loading" icon="search" @click="getAll">
                            <span v-if="!loading">搜索</span>
                            <span v-else>搜索中</span>
                        </Button>
                     </label>
                </div>
              </div>
             <br>
            <div class="table text-right">
                 <Table :loading="loading" :columns="params" :data="data" stripe border></Table>
                 <Row type="flex" justify="end" align="middle" style="margin-top: 10px" border>
        <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="currentPage"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row></div>
             <Spin size="large" fix v-if="loading"></Spin>
              <Modal v-model="modal" title="添加商品库存" @on-ok="ok" @on-cancel="cancel">
          <div class="flex">商品名称 :<Input  disabled style="width: 200px" :value="name"/></div>
          <br>
           <div class="flex">库存总量 :<Input  disabled style="width: 200px" :value="num"/></div>
            <br>
              <div class="flex">库存状态 :<Input  disabled style="width: 200px" :value="shop_status===0?'库存不足': shop_status===1?'库存充足':shop_status===2?'库存预警':''"/></div>
             <br>
             <div>
               单规格商品数量:
             <span v-for="(item, index) in inventorylist" :key="index" >
               <span style="display:inline-block;width:60%;margin-left:115px;">{{item.name}}:{{item.store_number}}</span></span>
             </div>
            <br>
             <div class="flex">添加规格商品库存 :
             <Input style="width: 200px" v-model="number"/>
             <Select style="width:100px;margin-left:10px;" v-model="skuName">
             <Option v-for="(item, index) in inventorylist" :key="index" :value="item.name">{{item.name}}</Option>
             </Select>
             </div>
             </Modal>
              <Modal v-model="modal2" title="添加商品库存" @on-ok="ok2" @on-cancel="cancel2" >
                    <p>确定要上架或者下架么</p>
             </Modal>
        </Card>
    </div>

</template>
<script>
import { findGoodsList, kcList, addkcList, isShelves } from '@/api/good'
import { formatDate } from '@/libs/util'
// import { getSxoIndustryInfo } from '@/api/common'
export default {
  name: 'settle',
  data() {
    return {
      modal: false,
      modal2: false,
      id: '',
      totalCounts: 0,
      currentPage: 1,
      pageSize: 20,
      number: null,
      goodsName: '', // 商品名称
      merchantsName: '', // 商户名称
      storesName: '', // 门店名称
      num: '',
      shop_status: '',
      sku_title: '',
      inventorylist: [],
      skuName: null,
      status: '',
      statut: '',
      date1: '',
      date2: '',
      name: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'merchantsName'
        },
        {
          title: '门店名称',
          key: 'storesName'
        },
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '规格数',
          key: 'ggnumber'
        },
        {
          title: '库存状态',
          key: 'kcstatus'
        },
        {
          title: '审核状态',
          key: 'shstatus'
        },
        {
          title: '是否上架',
          key: 'sxstatus'
        },
        {
          title: '更新时间',
          width: 100,
          key: 'modify_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.modify_time),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        },
        {
          title: '创建时间',
          width: 100,
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
          key: 'control',
          width: 200,
          align: 'left',
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
                    display: params.row.status === 0 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'see-goods',
                        query: {
                          id: params.row.id
                        }
                      })
                    }
                    // this.seegoods(params.row.id)
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
                    display: params.row.status === 0 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'see-goods',
                        query: {
                          id: params.row.id
                        }
                      })
                    }
                    // this.seegoods(params.row.id)
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
                    display:
                      params.row.status === 3 ||
                      params.row.status === 2 ||
                       params.row.status === 4
                        ? ''
                        : 'none'
                  },
                  on: {
                    click: () => {
                      // this.editgoods(params.row)
                      if (params.row.status === 2) {
                        this.$router.push({
                          name: 'no-edit-goods',
                          query: {
                            id: params.row.id
                          }
                        })
                      } else if (params.row.status === 3 || params.row.status === 4) {
                        this.$router.push({
                          name: 'edit-goods',
                          query: {
                            id: params.row.id
                          }
                        })
                      }
                    }
                  }
                },
                '修改'
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
                    display:
                      params.row.number_status === 0
                        ? ''
                        : params.row.number_status === 2 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      // this.modal = true
                      this.adds(params.row.id)
                    }
                  }
                },
                '添加库存'
              ),
              h(
                'Button',
                {
                  props: {
                    type:
                      params.row.status === 3
                        ? 'error'
                        : params.row.status === 4 ? 'info' : undefined,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display:
                      params.row.status === 3 || params.row.status === 4
                        ? ''
                        : 'none'
                  },
                  on: {
                    click: () => {
                      this.modal2 = true
                      this.id = params.row.id
                      this.statut = params.row.status === 3 ? 4 : 3
                    }
                  }
                },
                params.row.status === 3
                  ? '下架'
                  : params.row.status === 4 ? '上架' : ''
              )
            ])
          }
        }
      ],
      data: []
    }
  },
  computed: {
    loading() {
      return !!this.$store.state.app.loading
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    confirm() {
      this.$router.push({
        name: 'add-goods'
      })
    },

    updateArray() {
      // debugger
      this.data.forEach(item => {
        if (item.status === 0) {
          item.shstatus = '待审核'
          item.sxstatus = ''
        } else if (item.status === 1) {
          item.shstatus = '审核通过'
          item.sxstatus = ''
        } else if (item.status === 2) {
          item.shstatus = '审核不通过'
          item.sxstatus = ''
        }
        if (item.status === 3) {
          item.shstatus = '审核通过'
          item.sxstatus = '上架'
        } else if (item.status === 4) {
          item.shstatus = '审核通过'
          item.sxstatus = '下架'
        }

        if (item.number_status === 0) {
          item.kcstatus = '库存不足'
        } else if (item.number_status === 1) {
          item.kcstatus = '库存充足'
        } else if (item.number_status === 2) {
          item.kcstatus = '库存预警'
        }

        // if (item.status === 0) {
        //   item.sfstatus = '上架'
        // } else if (item.status === 1) {
        //   item.sfstatus = '下架'
        // }
      })
    },

    getAll() {
      let that = this
      let starttime = formatDate(this.date1[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date1[1], 'yyyy-MM-dd hh:mm:ss')
      let starttime1 = formatDate(this.date2[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime1 = formatDate(this.date2[1], 'yyyy-MM-dd hh:mm:ss')
      findGoodsList({
        goodsName: this.goodsName,
        merchantsName: this.merchantsName,
        storesName: this.storesName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        status: this.status,
        modifyStartTime: starttime,
        modifyEndTime: endtime,
        createStartTIme: starttime1,
        createEndTIme: endtime1
      }).then(res => {
        that.data = res.data.list
        that.totalCounts = res.data.total
        that.updateArray()
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
    adds(id) {
      let that = this
      this.id = id
      this.modal = true
      // let query = Object.assign({}, { id: id })
      kcList({ id: id, is_flag: 0 }).then(res => {
        that.inventorylist = res.data.returnInventory.inventorylist
        that.name = res.data.returnInventory.name
        that.shop_status = res.data.returnInventory.number_status
        that.num = res.data.returnInventory.sum
        that.updateArray()
      })
    },
    ok() {
      addkcList({
        goods_id: this.id,
        number: this.number,
        skuName: this.skuName
      }).then(res => {
        this.number = null
        this.skuName = null
        this.getAll()
      })
    },
    cancel() {
      this.$Message.info('已取消')
    },

    ok2() {
      isShelves({
        id: this.id,
        status: this.statut
      }).then(res => {
        this.getAll()
      })
    },
    cancel2() {}
  }
}

</script>
