<template>
    <div>
      <span style="color:#bbb;font-size:12px;">提示: 佣金请输入0~100的整数!!</span>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="pager.totalCounts" show-sizer :page-size="pager.size" :current.sync="pager.page" @on-change="getStoreList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
      <Row type="flex" justify="end" class="mt20">
          <i-col>
              <Button type="text" @click="$emit('close')" class="mr10">取消</Button>
              <Button type="primary" @click="save">保存</Button>
          </i-col>
      </Row>
    </div>
</template>

<script>
import { getCmsn, setCmsn } from '@/api/bank/activity'

export default {
  name: 'commission',
  props: {
    activityId: { required: true }
  },
  data() {
    return {
      formModel: [],
      columns: [
        {
          title: '门店id',
          key: 'storeId'
        },
        {
          title: '门店名称',
          key: 'storeName'
        },
        {
          title: '门店获得补贴(%)',
          key: 'storeDiscount',
          render: (h, params) => {
            let storeId = params.row.storeId
            return h('Input', {
              props: { value: params.row.storeDiscount || 0 },
              on: {
                'on-blur': e => this.changeRate(storeId, e)
              }
            })
            // return h('InputNumber', {
            //   props: {
            //     max: 100,
            //     min: 0,
            //     parser: value => String(parseFloat(Number(value).toFixed(2))),
            //     value: params.row.storeDiscount || 0
            //   },
            //   on: {
            //     'input': value => this.$nextTick(() => this.changeRate(storeId, value))
            //   }
            // })
          }
        }
      ],
      tableData: [
        // {
        //   storeId: 1312,
        //   storeName: '名称',
        //   butie: 1231,
        //   storeDiscount: 89
        // }
      ],
      pager: {
        page: 1,
        size: 20,
        totalCounts: 0
      }
    }
  },
  watch: {
    activityId: {
      handler(v) {
        v && this.getStoreList()
      },
      immediate: true
    }
  },
  computed: {
    isLastPage() {
      return this.pager.page * this.pager.size >= this.pager.totalCounts
    }
  },
  methods: {
    save() {
      setCmsn(this.formModel).then(res => {
        if (!this.isLastPage) { // 保存后自动跳到后一页
          this.pager.page++
          this.getStoreList()
        } else {
          this.$emit('close')
        }
      })
    },
    normalizeValue(e) {
      let v = e.target.value
      v = parseInt(v)
      if (isNaN(v) || v < 0) {
        v = 0
      } else if (v > 100) {
        v = 100
      }
      e.target.value = v
      return v
    },
    changeRate(storeId, e) {
      let value = this.normalizeValue(e)
      console.log(storeId, value)
      let item = this.formModel.find(v => v.storeId === storeId)
      if (item) {
        item.storeDiscount = value
      }
    },
    changePageSize(size) {
      this.pager.size = size
      this.getStoreList()
    },
    getStoreList() {
      getCmsn(this.activityId, this.pager.page, this.pager.size).then(res => {
        this.formModel = res.data
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    }
  }
}
</script>
