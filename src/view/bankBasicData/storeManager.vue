<template>
  <div>
    <h3 class="pb10">门店管理</h3>
    <Card>
      <Row type="flex">
        <Col style="flex: 1">
            <Button type="success" @click="isShow = true; title = '新增银行授权门店'" class="btn-add w120" icon="plus">新增</Button>
        </Col>
        <Col>
          <Input clearable placeholder="银行ID" class="w180 mr20" v-model="params.bankId" />
          <Input clearable placeholder="银行名称" class="w180 mr20" v-model="params.bankName" />
          <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
        </Col>
      </Row>
      <Row type="flex" justify="end" class="mt20">
          <Button icon="ios-cloud-download-outline" @click="downloadExcel" class="mr10">导出模板</Button>
          <Upload class="dib ml10"
            :action="importUrl"
            :show-upload-list="false"
            :format="['xls']"
            :on-format-error="handleFormatError"
            :on-success="onImportSuccess"
          >
            <Button icon="ios-cloud-upload-outline" type="primary">批量导入</Button>
          </Upload>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="changePage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" :title="title" class-name="vertical-center-modal">
        <Form :label-width="100" class="mt20" :model="vo" :rules="rules" ref="form">
          <FormItem label="银行id:" prop="bankId">
            <Input placeholder="请输入银行id" v-model="vo.bankId"/>
          </FormItem>
          <FormItem label="银行名称：" prop="bankName">
            <Input placeholder="请输入银行名称" v-model="vo.bankName"/>
          </FormItem>
          <FormItem label="商户id" prop="merchantId">
            <Input placeholder="请输入商户id" v-model="vo.merchantId"/>
          </FormItem>
          <FormItem label="商户名称" prop="merchantName">
            <Input placeholder="请输入商户名称" v-model="vo.merchantName"/>
          </FormItem>
          <FormItem label="门店id" prop="storeId">
            <Input placeholder="请输入门店id" v-model="vo.storeId"/>
          </FormItem>
          <FormItem label="门店名称" prop="storeName">
            <Input placeholder="请输入门店名称" v-model="vo.storeName"/>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="reset">取消</Button>
            <Button type="primary" size="large" @click="save">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getBankStoreList, addBankStore, deleteStore } from '@/api/bank/activity'
import BASE_URL from '../../config/url'

export default {
  name: 'store-manager',
  data() {
    return {
      isShow: false,
      title: '',
      importUrl: BASE_URL + '/sxwactivity/bankStore/import',
      params: {
        bankId: '',
        bankName: '',
        pageNum: 1,
        pageSize: 20
      },
      vo: {
        bankId: '',
        bankName: '',
        merchantId: '',
        merchantName: '',
        storeId: '',
        storeName: ''
      },
      rules: {
        bankId: { required: true, message: '银行ID必须填写', trigger: 'blur' },
        bankName: { required: true, message: '银行名称必须填写', trigger: 'blur' },
        merchantId: { required: true, message: '商户ID必须填写', trigger: 'blur' },
        merchantName: { required: true, message: '商户名称必须填写', trigger: 'blur' },
        storeId: { required: true, message: '门店ID必须填写', trigger: 'blur' },
        storeName: { required: true, message: '门店名称必须填写', trigger: 'blur' }
      },
      totalCounts: 0,
      columns: [
        { title: '银行id', key: 'bankId' },
        { title: '银行名称', key: 'bankName' },
        { title: '商户id', key: 'merchantId' },
        { title: '商户名称', key: 'merchantName' },
        { title: '门店id', key: 'storeId' },
        { title: '门店名称', key: 'storeName' },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h(
              'Button',
              { props: { type: 'error', size: 'small' }, on: { click: () => this.deleteStore(params.row.id) } },
              '删除'
            )
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page) {
      this.params.pageNum = page || this.params.pageNum
      getBankStoreList(this.params).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    // 分页切换
    changePage(val) {
      this.params.pageNum = val
      this.getList()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
      this.getList()
    },

    // 导出excel模板
    downloadExcel() {
      var form = document.createElement('form')
      form.action = BASE_URL + 'sxwactivity/bankStore/example'
      form.method = 'get'
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    },

    // 批量导入成功回调
    onImportSuccess() {
      this.$Notice.success({
        title: '上传成功',
        desc: '模板上传成功！'
      })
      this.getList()
    },

    // 导入类型错误处理函数
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件类型有误',
        desc: '文件 ' + file.name + ' 的类型不正确, 请选择 xls 文件上传。'
      })
    },

    save() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let { bankId, bankName, merchantId, merchantName, storeId, storeName } = this.vo
          let query = {
            bankId: Number(bankId),
            bankName,
            merchantId: Number(merchantId),
            merchantName,
            storeId: Number(storeId),
            storeName
          }
          addBankStore(query).then(res => {
            this.getList()
          })
          this.reset()
        } else {
          this.$Message.error('表单未填写完整，请检查后再提交')
        }
      })
    },

    reset() {
      this.isShow = false
      this.vo.bankId = ''
      this.vo.bankName = ''
      this.vo.merchantId = ''
      this.vo.merchantName = ''
      this.vo.storeId = ''
      this.vo.storeName = ''
    },

    deleteStore(id) {
      this.$Modal.confirm({
        title: '删除',
        content: '删除后不可恢复，确认删除么？',
        onOk: () => {
          deleteStore(id).then(res => {
            this.getList()
          })
        }
      })
    }
  }
}
</script>
