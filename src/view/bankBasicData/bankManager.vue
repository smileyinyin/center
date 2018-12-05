<template>
  <div class="card-bin-manager">
    <h3 class="pb10">银行管理</h3>
    <Card>
      <Row type="flex" justify="space-between">
        <i-col>
            <Button type="success" @click="Show = true; title = '添加银行'" class="btn-add w120" icon="plus">新增</Button>
        </i-col>
        <i-col>
          <Input clearable placeholder="请输入银行名称" class="w180 mr20" v-model="titles" />
          <Button type="primary" icon="ios-search" @click="getAll(1)">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
       <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getAll" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
    <!-- 修改 -->
    <Modal v-model="Show" :mask-closable="false" :closable="true" :title="title" @on-visible-change="visibleChange" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="Show = false">取消</Button>
            <Button type="primary" size="large" @click="buts">确定</Button>
        </div>
        <Form :label-width="120" class="form"  ref="form" :model="user" :rules="rules">
          <FormItem label="银行名称：" prop="bankName">
             <Input placeholder="请输入银行名称" v-model="user.bankName"/>
          </FormItem>
          <FormItem label="分公司名称：" prop="companyId">
            <Select v-model="user.companyId" placeholder="请选择分公司名称" :label-in-value="true">
                <Option v-for="item in companyList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="请选择开户地区：" prop="address">
             <pro-city-area
                :p="user.provinceId"
                :c="user.cityId"
                :a="user.districtId"
                @on-change="changePro"
            ></pro-city-area>

          </FormItem>
          <FormItem label="联系方式：" prop="mobile">
            <Input placeholder="请输入联系方式" v-model="user.mobile" :maxlength="11"/>
          </FormItem>
           <FormItem label="联系人：" prop="name">
            <Input placeholder="请输入联系人" v-model="user.name"/>
          </FormItem>
          <FormItem label="登录手机号：" prop="loginName">
            <Input placeholder="请输入登录手机号" v-model="user.loginName" :disabled="title === '编辑银行'"/>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import {
  banklist,
  addbanklist,
  editbanklist,
  findbanklist,
  getCompanyList
} from '@/api/bank/transaction'
import proCityArea from '_c/proCityArea'
import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

export default {
  name: 'card-bin-manager',
  data() {
    return {
      Show: false,
      title: '',
      titles: '',
      companyList: [],
      user: {
        createdBy: this.$store.state.user.userName,
        bankName: '',
        companyId: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        loginName: '',
        name: '',
        mobile: null
        // province: '',
        // city: '',
        // district: ''

      },
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      columns: [
        {
          title: '银行ID',
          key: 'bankId'
        },
        {
          title: '银行名称',
          key: 'bankName'
        },
        {
          title: '分公司',
          key: 'companyName'
        },
        {
          title: '登录账号',
          key: 'loginName'
        },
        {
          title: '联系方式',
          key: 'mobile'
        },
        {
          title: '区域',
          key: 'district'
        },
        {
          title: '操作',
          key: 'time',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.Show = true
                      this.title = '编辑银行'
                      findbanklist({ loginName: params.row.loginName }).then(
                        res => {
                          debugger
                          this.user = _pick(res.data, _keys(this.user))
                          this.user.provinceId = String(res.data.provinceId)
                          this.user.cityId = String(res.data.cityId)
                          this.user.districtId = String(res.data.districtId)
                        }
                      )
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      tableData: [],
      rules: {
        address: [
          {
            required: true,
            message: '开户地区不能为空',
            trigger: 'change',
            validator: (value, rule, callback) => {
              if (!this.user.provinceId || !this.user.cityId || !this.user.districtId) {
                callback(new Error())
              } else {
                callback()
              }
            }
          }
        ],
        bankName: [
          {
            required: true,
            message: '银行名称不能为空！',
            trigger: 'blur'
          },
          { type: 'string', max: 100, message: '银行名称不可超过100字符', trigger: 'blur' }
        ],
        companyId: [
          {
            required: true,
            message: '分公司名称不能为空！',
            trigger: 'change',
            type: 'number'
          }
        ],
        provinceId: [
          {
            required: true,
            message: '省不能为空！',
            trigger: 'blur'
          }
        ],
        cityId: [
          {
            required: true,
            message: '市不能为空！',
            trigger: 'blur'
          }
        ],
        districtId: [
          {
            required: true,
            message: '区不能为空！',
            trigger: 'blur'
          }
        ],
        // mobile: [
        //   {
        //     required: true,
        //     message: '联系方式不能为空！',
        //     trigger: 'blur'
        //   }
        // ],
        // name: [
        //   {
        //     required: true,
        //     message: '联系人不能为空！',
        //     trigger: 'blur'
        //   }
        // ],
        loginName: [
          {
            required: true,
            message: '登录手机号不能为空！',
            trigger: 'blur'
          },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getAll()
    getCompanyList().then(res => {
      this.companyList = res.data
    })
  },
  methods: {
    visibleChange(visible) {
      if (visible === false) {
        for (let key in this.user) {
          this.user[key] = ''
        }
      }
    },
    changePro({ proCode, province, cityCode, city, areaCode, area, type }) {
      console.log(proCode, province, cityCode, city, areaCode, area, type)
      this.user.provinceId = proCode
      this.user.cityId = cityCode
      this.user.districtId = areaCode
      // this.user.province = province
      // this.user.city = city
      // this.user.district = area
    },
    getAll(page) {
      this.currentPage = page || this.currentPage
      banklist({
        keyword: this.titles,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
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
    },
    buts() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.title === '编辑银行') {
            editbanklist(this.user).then(res => {
              this.getAll()
              this.Show = false
            })
          } else {
            addbanklist(this.user).then(res => {
              this.getAll()
              this.Show = false
            })
          }
        } else {
          this.$Message.error('请将信息填写完整！')
        }
      })
    }
  },
  components: { proCityArea }
}
</script>
