<template>
  <div class="addBranchCompany">
    <bread-crumb :data="[
      {path: '/branchCompanyList', title: '分公司'},
      {title: title}
    ]"></bread-crumb>
    <Card class="pl20 pr20">
      <Form ref="formInline" :model="formItem" :rules="ruleValidate" :label-width="100" label-position="left">
        <!-- 基础信息 -->
        <divide-line placement="bottom" class="title mb30">基础信息</divide-line>
        <Row :gutter="20">
          <i-col span="12">
            <FormItem label="分公司名称" prop="name" required>
              <Input v-model="formItem.name" placeholder="请输入分公司名称" clearable/>
            </FormItem>
            <FormItem label="登录手机号" prop="mobile" required>
              <Input v-model="formItem.mobile" placeholder="请输入登录手机号" clearable/>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="区域" prop="area" required>
              <pro-city-area
                :p="formItem.mercProv"
                :c="formItem.mercCity"
                :a="formItem.mercArea"
                @on-change="changePro"
              ></pro-city-area>
            </FormItem>
            <FormItem label="地址" prop="adress" required>
              <Input v-model="formItem.adress" placeholder="请输入地址" clearable/>
            </FormItem>
          </i-col>
        </Row>

        <!-- 工商信息 -->
        <divide-line placement="bottom" class="title mb30">工商信息</divide-line>
        <Row :gutter="20">
          <i-col span="12">
            <FormItem label="营业执照号" prop="businessNumber" required>
              <Input v-model="formItem.businessNumber" placeholder="请输入营业执照号" clearable/>
            </FormItem>
            <FormItem prop="licenseEndTime" label="执照有效期" required>
              <DatePicker
                type="date"
                v-model="formItem.licenseEndTime"
                :options="dateOptions"
                placement="bottom-end"
                placeholder="到期时间"
                style="width: 100%;" ></DatePicker>
            </FormItem>
            <FormItem prop="establishTime" label="成立日期" required>
              <DatePicker
                type="date"
                v-model="formItem.establishTime"
                placement="bottom-end"
                placeholder="成立日期"
                style="width: 100%;" ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="营业执照" required prop="lisenceImg">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img
                title="营业执照"
                v-model="lisenceImgList"
                :needImg="1"
                :noTips="true"></upload-img>
            </FormItem>
          </i-col>
        </Row>

        <!-- 法人信息 -->
        <divide-line placement="bottom" class="title mb30">法人信息</divide-line>
        <Row :gutter="20">
          <i-col span="12">
            <FormItem label="法人名称" prop="legalPersonName" required>
              <Input v-model="formItem.legalPersonName" placeholder="请输入法人名称" clearable/>
            </FormItem>
            <FormItem label="法人身份证号" prop="identityCard" required>
              <Input v-model="formItem.identityCard" placeholder="请输入法人身份证号" clearable/>
            </FormItem>
            <FormItem label="身份证有效期" prop="identityEndDate" required>
              <DatePicker
                type="date"
                v-model="formItem.identityEndDate"
                :options="dateOptions"
                placement="bottom-end"
                placeholder="法人身份证到期时间"
                style="width: 100%;" ></DatePicker>
            </FormItem>
            <FormItem label="法人联系电话" prop="legalPersonMobile" required>
              <Input v-model="formItem.legalPersonMobile" placeholder="请输入法人联系电话" clearable/>
            </FormItem>
            <FormItem label="邮箱" prop="legalPersonEmail" required>
              <Input v-model="formItem.legalPersonEmail" placeholder="请输入邮箱" clearable/>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="法人身份证" required prop="idImg">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img title="法人身份证正面"
                class="mr10"
                noTips
                v-model="identityFrontImgList"
                :needImg="1"></upload-img>
              <upload-img title="法人身份证反面"
                noTips
                v-model="identityBackImgList"
                :needImg="1"></upload-img>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <Row type="flex" justify="space-between" class="pl20 pt20 pr20">
      <router-link to="/branchCompanyList">
        <Button class="w120 btn-cancel">取消</Button>
      </router-link>
      <Button type="success" class="w120" @click="saveBranchCompany">保存</Button>
    </Row>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import UploadImg from '_c/uploadImg/uploadImg'
import divideLine from '_c/divideLine/divide-line'
import proCityArea from '_c/proCityArea'
import { createValid } from '@/libs/util'

export default {
  name: 'addBranchCompay',
  data() {
    return {
      title: '新增分公司',
      lisenceImgList: [],
      identityFrontImgList: [],
      identityBackImgList: [],
      formItem: {
        name: '',
        mobile: '',
        adress: '',
        mercProv: '', // 省编码
        mercCity: '', // 市编码
        mercArea: '', // 区编码
        province: '', // 省中文
        city: '', // 市中文
        district: '', // 区中文

        businessNumber: '', /// 营业执照号
        licenseEndTime: '', // 执照到期时间
        establishTime: '', // 成立时间
        lisenceImg: '', // 执照 url

        legalPersonName: '', // 法人名
        identityCard: '', // 身份证
        identityEndDate: '', // 法人身份证有效期
        legalPersonMobile: '', // 法人电话
        legalPersonEmail: '', // 法人Email
        identityFrontImg: '', // 身份证正面照
        identityBackImg: '' // 身份证反面照
      },
      ruleValidate: {
        name: [
          { required: true, message: '分公司名称不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '分公司名称不能全为数字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{8,20}$/, message: '分公司名称为8-20个字母、汉字或数字，不含特殊字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '分公司电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '分公司地区必须填写', trigger: 'change', validator: createValid.call(this, 'formItem.mercProv', 'formItem.mercCity', 'formItem.mercArea') }
        ],
        adress: [
          { required: true, message: '分公司地址不能为空', trigger: 'blur' }
        ],

        businessNumber: [
          { required: true, message: '营业执照号不能为空', trigger: 'blur' },
          { pattern: /^[\d\w]+$/, message: '营业执照号必须为字母或数字', trigger: 'blur' },
          { type: 'string', max: 27, min: 1, message: '营业执照号为1-27个字符', trigger: 'blur' }
        ],
        lisenceImg: [
          { required: true, message: '营业执照必须上传', validator: createValid.call(this, 'formItem.lisenceImg') }
        ],
        licenseEndTime: [
          { required: true, type: 'date', message: '结束时间不能为空', trigger: 'blur' }
        ],
        establishTime: [
          { required: true, type: 'date', message: '开始时间不能为空', trigger: 'blur' }
        ],

        legalPersonName: [
          { required: true, message: '法人名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '法人名称为中文、字母或数字', trigger: 'blur' },
          { pattern: /\D+/, message: '法人名称不能全为数字', trigger: 'blur' },
          { type: 'string', max: 10, min: 2, message: '法人名称为2-10个字符', trigger: 'blur' }
        ],
        identityCard: [
          { required: true, message: '法人身份证号不能为空', trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法身份证', trigger: 'blur' }
        ],
        identityEndDate: [
          { required: true, type: 'date', message: '身份证有效期不能为空', trigger: 'blur' }
        ],
        legalPersonMobile: [
          { required: true, message: '法人联系电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法联系电话', trigger: 'blur' }
        ],
        legalPersonEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
        ],
        idImg: [
          { required: true, message: '法人身份证正反照必须上传', trigger: 'change', validator: createValid.call(this, 'formItem.identityFrontImg', 'formItem.identityBackImg') }
        ]
      },
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  watch: {
    lisenceImgList(value) {
      this.formItem.lisenceImg = value.map(v => v.url).join(',')
    },
    identityFrontImgList(value) {
      this.formItem.identityFrontImg = value.map(v => v.url).join(',')
    },
    identityBackImgList(value) {
      this.formItem.identityBackImg = value.map(v => v.url).join(',')
    }
  },
  methods: {

    // 省市区组件回调
    changePro({ proCode, province, cityCode, city, areaCode, area }) {
      console.log(proCode, province, cityCode, city, areaCode, area)
      this.formItem.mercProv = proCode
      this.formItem.province = province
      this.formItem.mercCity = cityCode
      this.formItem.city = city
      this.formItem.mercArea = areaCode
      this.formItem.district = area
    },

    // 保存分公司
    saveBranchCompany() {
      // TODO
      this.$refs['formInline'].validate(valid => {
        if (valid) {
          // TODO
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    }
  },
  components: { breadCrumb, UploadImg, divideLine, proCityArea }
}
</script>
