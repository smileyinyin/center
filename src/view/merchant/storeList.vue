<template>
  <!-- <div>门店列表 {{ $route.params.id }}</div> -->
  <div class="store-list">
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '门店管理'}
    ]"></bread-crumb>

    <Card>
      <Row class='pb20'>
        <i-col span="24" align="right">
        <Input  placeholder="请输入门店名称" style="width: 150px" clearable v-model="searchForm.storeName"/>
        <!-- <Input  placeholder="请输入门店店长" style="width: 100px;margin-left:10px;"  clearable /> -->
        <Select clearable style="width:100px;margin-left:10px;"  placeholder="请选择状态" v-model="searchForm.storeStatus">
                <Option value="1" key="1">启用</Option>
                <Option value="2" key="2">停用</Option>
        </Select>
        <Button type="primary" @click="getStoreList(1)" icon="search" style="margin-left:10px;">查 询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" class="mt10">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getStoreList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { getStoreList } from '@/api/store/index'

export default {
  name: 'storeList',
  data() {
    return {
      searchForm: {
        merchantId: '',
        storeName: '',
        storeStatus: ''
      },
      pager: {
        pageSize: 20,
        currentPage: 1,
        totalCounts: 0
      },
      columns: [
        {
          title: '门店ID',
          key: 'id'
        },
        {
          title: '门店名称',
          key: 'name'
        },
        {
          title: '门店地址',
          key: 'addressDetail'
        },
        {
          title: '门店电话',
          key: 'storesTelephone'
        },
        // {
        //   title: '商品数',
        //   key: 'goodsNumber',
        //   render: (h, params) => {
        //     return h(
        //       'span',
        //       {
        //         // class: 'link',
        //         on: {
        //           click: () => this.goStoreList(params.row)
        //         }
        //       },
        //       params.row.goodsNumber
        //     )
        //   }
        // },
        // {
        //   title: '会员数目',
        //   key: 'memberNumber',
        //   render: (h, params) => {
        //     return h(
        //       'span',
        //       {
        //         // class: 'link',
        //         on: {
        //           click: () => this.goMemberList(params.row)
        //         }
        //       },
        //       params.row.memberNumber
        //     )
        //   }
        // },
        {
          title: 'POS数目',
          key: 'posNumber',
          render: (h, params) => {
            return h(
              'span',
              {
                // class: 'link',
                on: {
                  click: () => this.goPosList(params.row)
                }
              },
              params.row.posNumber
            )
          }
        },
        {
          title: '状态',
          key: 'status', // 1启用  2 停用
          render: (h, params) => {
            return h('span', null, params.row.status === 1 ? '启用' : '停用')
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: { size: 'small', type: 'primary' },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'storeInfo', query: { marketId: params.row.id, merchantId: this.searchForm.merchantId, type: params.type } })
                    }
                  }
                }, '查看'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    this.searchForm.merchantId = this.$route.query.merchantId
    this.getStoreList()
  },
  methods: {
    getStoreList(page) {
      this.pager.currentPage = page || this.pager.currentPage
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager
      )
      getStoreList(query).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.pager.totalCounts = res.data.total
        } else {
          this.data = []
          this.pager.totalCounts = 0
        }
      })
    },
    changePageSize(size) {
      this.pager.size = size
      this.getStoreList()
    },
    getpage(page) {
      this.pager.currentPage = page
      this.getStoreList()
    }
  },
  components: { breadCrumb }
}
</script>

<style lang="less" scoped>
.store-list {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
