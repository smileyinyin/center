<template>
  <div class="bank">
    <span class="mr20" v-if="bankBranchName">{{ bankBranchName }}</span>
    <Button type="primary" @click="select">选择支行</Button>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="选择支行" width="800" class-name="flex-between">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false; params.LBNK_CD_NM = ''; proCode = ''; cityCode = '';">取消</Button>
            <Button type="primary" size="large" @click="posDown">确定</Button>
        </div>
        <Row type="flex" >
          <i-col span="6">
            <Select placeholder="总行名称" class="w180 mr20 tl" v-model="params.LBNK_CD_NM">
              <Option v-for="(item, index) in bankList" :key="index" :value="item">{{item}}</Option>
            </Select>
          </i-col>
          <i-col span="12">
            <pro-city-area
              noArea
              :p="proCode"
              :c="cityCode"
              @on-change="changePro"
            ></pro-city-area>
          </i-col>
          <i-col span="6" align="right">
            <!-- <Input placeholder="请输入总行名称" v-model="params.LBNK_CD_NM" class="w180 mr20" /> -->
            <Button type="primary" @click="getAll">查询</Button>
          </i-col>
        </Row>
        <Table border :columns="columns" :data="tableData" class="mt20" @on-selection-change="changeSelect" ref="selection"></Table>
        <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="params.totalCounts" show-sizer
              :page-size="params.size" :current.sync="params.page"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Modal>
  </div>
</template>

<script>
import proCityArea from '_c/proCityArea'
import { getBankCode, getLbnkCdNm } from '@/api/common'

export default {
  name: 'bank',
  props: {
    bankBranchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      tableData: [],
      list: [],
      proCode: '',
      cityCode: '',
      params: {
        LBNK_CD_NM: '', // 总行名称
        PROV_NM: '', // 省
        CITY_NM: '', // 市
        page: 1,
        size: 20,
        totalCounts: 0
      },
      bankList: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '支行名称',
          key: 'lbnk_NM'
        }, {
          title: '联行号',
          key: 'lbnk_NO'
        }
      ]
    }
  },
  created() {
    getLbnkCdNm().then(res => {
      this.bankList = res
    })
  },
  methods: {
    select() {
      this.isShow = true
    },

    changePro({ proCode, province, cityCode, city }) {
      console.log(proCode, province, cityCode, city)

      this.proCode = proCode
      this.cityCode = cityCode
      if (!proCode) {
        this.params.PROV_NM = ''
        this.params.CITY_NM = ''
        return
      }
      this.params.PROV_NM = province

      if (!cityCode) {
        this.params.CITY_NM = ''
        return
      }
      this.params.CITY_NM = city
    },

    changeSelect(val) {
      this.list = val
    },
    getpage(page) {
      this.page = page
      this.getAll()
    },
    changePageSize(size) {
      this.params.size = size
      this.getAll()
    },
    getAll() {
      this.tableData = []
      this.params.totalCounts = 0
      this.list = []

      if (!this.proCode) {
        this.$Message.error('请选择省！')
        return
      }
      if (!this.cityCode) {
        this.$Message.error('请选择市！')
        return
      }
      if (!this.params.LBNK_CD_NM) {
        this.$Message.error('请输入总行！')
        return
      }
      getBankCode(this.params).then(res => {
        this.tableData = res.data
        this.params.totalCounts = res.objectotalNumber
        this.list = []
      })
    },
    posDown() {
      if (!this.list.length) {
        this.$Message.error('请选择一个支行')
        return
      }
      if (this.list.length > 1) {
        this.$Message.error('只能选择一个支行')
        return
      }
      this.$emit('getBank', this.list)
      this.isShow = false
    }
  },
  components: { proCityArea }
}
</script>

<style>
  .bank .flex-between {
    flex-direction: column;
    justify-content: space-between;
  }

  .bank .flex-between:before, .flex-between:after {
      content: '';
      display: inline-block;
  }
</style>
