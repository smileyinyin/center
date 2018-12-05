<template>
  <div class="card-bin-manager">
    <h3 class="pb10">卡bin管理</h3>
    <Card>
      <Row>
        <Col span="2">
            <Button type="success" @click="isShow = true; title = '新增卡bin'" class="btn-add w120" icon="plus">新增</Button>
        </Col>
        <Col span="22" align="right">
          <Input clearable placeholder="请输入银行名称" class="w180 mr20" v-model="params.pos_csn" />
          <Input clearable placeholder="请输入联系方式" class="w180 mr20" v-model="params.terminal_number" />
          <Select placeholder="请选择省" class="w180 mr10 tl"></Select>
          <Select placeholder="请选择市" class="w180 mr10 tl"></Select>
          <Select placeholder="请选择区" class="w180 mr10 tl"></Select>
          <DatePicker type="datetimerange" placeholder="请选择创建时间" class="w300 mr20" v-model="create_time"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" :title="title" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false">取消</Button>
            <Button type="primary" size="large" @click="isShow = false">确定</Button>
        </div>
        <Form :label-width="100" class="mt20">
          <FormItem label="银行名称：">
            <Select placeholder="请选择银行名称"></Select>
          </FormItem>
          <FormItem label="机构代码：">
            <Input placeholder="请输入机构代码" />
          </FormItem>
          <FormItem label="卡bin：">
            <Input placeholder="请输入卡bin" />
          </FormItem>
          <FormItem label="联系方式：">
            <Input placeholder="请输入联系方式" />
          </FormItem>
          <FormItem label="卡种：">
            <Select placeholder="请选择卡种">
                <Option value="1">借记卡</Option>
                <Option value="1">贷记卡</Option>
            </Select>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'card-bin-manager',
  data () {
    return {
      isShow: false,
      title: '',
      list: [],
      create_time: '',
      params: {
        pos_csn: '',
        terminal_number: '',
        storage_no: '',
        create_time: '',
        end_time: '',
        pageNum: 1,
        pageSize: 20,
        status: 1
      },
      totalCounts: 0,
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '发卡行',
          key: 'pos_csn'
        },
        {
          title: '机构代码',
          key: 'storage_no'
        },
        {
          title: '卡bin',
          key: 'terminal_number'
        },
        {
          title: '卡种',
          key: 'terminal_number'
        },
        {
          title: '操作',
          key: 'time',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.isShow = true
                    this.title = '修改卡bin'
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '删除操作',
                      content: `确认要删除卡bin为的信息吗？`,
                      onOk: () => {}
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [{
        id: 1
      }]
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {},
    // 分页切换
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    }
  }
}
</script>
