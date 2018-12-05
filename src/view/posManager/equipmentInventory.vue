<template>
<div class="equipmentInventory">
  <h3 class="pb10">机具库存</h3>
  <Card>
    <Row class="pb20" type="flex">
      <i-col style="flex:1;display:flex;justify-content:flex-end;">
        <Input v-model="searchForm.csn" clearable placeholder="CSN" class="w140 mr20"/>
        <Select v-model="searchForm.brand" clearable class="w140 mr20">
          <Option v-for="item in brandList" :key="item.code" :value="item.code">{{ item.name }}</Option>
        </Select>
        <Input v-model="searchForm.picihao" clearable placeholder="批次号" class="w140 mr20" />
        <DatePicker v-model="date" type="datetimerange" placement="bottom-end" placeholder="创建时间" class="w280 mr20"></DatePicker>
      </i-col>
      <i-col>
        <Row class="mb10">
          <Button type="primary" @click="getEquipmentInventoryList(1)" icon="search">查 询</Button>
        </Row>
        <Row>
          <Button type="primary" @click="showInbound = true" class="mr10">机具入库</Button>
          <Button type="primary" @click="showAllocate = true">机具下拨</Button>
        </Row>
      </i-col>
    </Row>
    <Table border :loading="loading" :columns="columns" :data="tableData" @on-selection-change="selectionChange"></Table>
    <Row type="flex" justify="end" align="middle" class="mt10">
      <Page :total="pager.totalCounts" show-sizer
            :page-size="pager.pageSize" :current.sync="pager.currentPage"
            @on-change="getEquipmentInventoryList"
            @on-page-size-change="changePageSize"
      ></Page>
    </Row>
  </Card>

  <!-- 机具入库 的弹窗 -->
  <Modal v-model="showInbound" title="机具入库操作">
    <Form :label-width="100">
      <FormItem label="选择品牌">
        <Select v-model="inbound.brand" clearable >
           <Option v-for="item in brandList" :key="item.code" :value="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="输入批次">
        <Input v-model="inbound.picihao" placeholder="请输入批次"></Input>
      </FormItem>
      <FormItem label="输入CSN">
        <Input v-model="inbound.csn" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="请输入CSN,一行一条记录"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="showInbound = false">取消</Button>
      <Button type="primary" size="large" @click="equipmentInbound">确定</Button>
    </div>
  </Modal>

  <!-- 机具下拨 的弹窗 -->
  <Modal v-model="showAllocate" title="选择下拨分公司">
    <Select v-model="allocate.brand" clearable class="mb20 w280" placeholder="请选择分公司">
      <Option v-for="item in branchCompanyList" :value="item.username" :key="item.id">{{ item.username }}</Option>
    </Select>
    <Table border :columns="allocateColumns" :data="selectionRecord"></Table>
    <div slot="footer">
      <Button type="text" size="large" @click="showAllocate = false">取消</Button>
      <Button type="primary" size="large" @click="equipmentInbound">确定</Button>
    </div>
  </Modal>

</div>
</template>

<script>
import makeColums from './data/equipmentInventory-columns'
import { brandList } from './data'
import * as Api from '@/api/posManager/equipmentInventory'
import { getCompanyList as getBranchCompanyList } from '@/api/user/cityPartner'
import { formatDate } from '@/libs/util'

export default {
  name: 'equipmentInventory',
  data() {
    return {
      loading: false,
      showInbound: false,
      showAllocate: false,
      brandList,
      date: [],
      searchForm: {
        csn: '', // csn 号
        brand: '', // 品牌
        picihao: '', // 批次号
        createTime: '',
        endTime: '' // 入库时间
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColums.call(this),
      tableData: [],

      // 机具入库
      inbound: {
        brand: '',
        picihao: '',
        csn: ''
      },

      // 机具下拨
      branchCompanyList: [], // 分公司下拉列表
      allocateColumns: [
        { title: '序号', type: 'index' },
        { title: 'CSN', key: 'CSN' },
        { title: '品牌', key: 'brand' },
        { title: '批次号', key: 'picihao' }
      ],
      allocate: {
        brand: ''
      },
      selectionRecord: [] // 列表被选中要下拨的 记录
    }
  },

  created() {
    this.getBranchCompanyList()
  },

  methods: {

    // 机具下拨
    equipmentAllocate() {
      // TODO
    },

    // 机具入库
    equipmentInbound() {
      // TODO
    },

    // table选择行变化了
    selectionChange(selection) {
      // TODO
    },

    // 获取分公司列表
    async getEquipmentInventoryList(page) {
      this.pager.currentPage = page || this.pager.currentPage
      this.loading = true
      // TODO
      try {
        await Api.getEquipmentInventoryList(Object.assign({}, this.searchForm, this.pager, {
          createTime: formatDate(this.date[0]),
          endTime: formatDate(this.date[1])
        }))
      } finally {
        this.loading = false
      }
    },

    // 改变分页
    changePageSize(size) {
      debugger
      this.pager.pageSize = size
      this.getEquipmentInventoryList()
    },

    // 获取分公司下拉列表
    getBranchCompanyList() {
      getBranchCompanyList().then(res => {
        this.branchCompanyList = res.data
      })
    }
  }
}
</script>
