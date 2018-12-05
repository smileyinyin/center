<template>
  <div>
    <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="90" class="form">
      <div class="left">
        <p class="tips">提示：门店名称请以"省+市+门店名称"的形式输入</p>
        <FormItem required label="门店名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入省、市加门店名称" />
        </FormItem>
        <FormItem required label="经营类型">
          <Select v-model="formItem.categoryCode" placeholder="经营类型" :disabled="true">
            <Option v-for="item in businessTypeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem required label="门店联系人" prop="contactName">
          <Input v-model="formItem.contactName" placeholder="请输入门店联系人" />
        </FormItem>
        <FormItem label="联系人邮箱" prop="contactEmail">
          <Input v-model="formItem.contactEmail" placeholder="请输入联系人邮箱" />
        </FormItem>
        <FormItem required label="联系人电话" prop="storesTelephone">
          <Input v-model="formItem.storesTelephone" placeholder="请输入联系人电话" />
        </FormItem>
        <FormItem label="门店简介" prop="briefIntroduction">
          <Input v-model="formItem.briefIntroduction" placeholder="请输入门店简介" />
        </FormItem>
        <FormItem label="门店详情" prop="detailInfo">
          <Input type="textarea" v-model="formItem.detailInfo" placeholder="请输入门店详情" />
        </FormItem>
        <FormItem label="门店服务" prop="service">
          <Input v-model="formItem.service" placeholder="请输入门店服务" />
        </FormItem>
        <FormItem label="营业时间" prop="marketOpenTime">
          <TimePicker v-model="marketOpenTime" type="timerange" style="width:100%;" placeholder="请选择营业时间"></TimePicker>
          <!-- <Input  placeholder="请输入营业时间" /> -->
        </FormItem>
        <FormItem label="门店地区" required prop="area">
          <pro-city-area
            :p="formItem.mercProv"
            :c="formItem.mercCity"
            :a="formItem.mercArea"
            @on-change="changePro"
          ></pro-city-area>
        </FormItem>
        <FormItem required label="门店地址" prop="addressDetail">
          <Input v-model="formItem.addressDetail" placeholder="请输入门店地址" />
        </FormItem>
        <FormItem label="经纬度" prop="location">
          <Input v-model="location" placeholder="请输入经纬度" icon="location" @click.native="selectLocation" />
        </FormItem>
      </div>
      <div class="right">
        <FormItem label="门店LOGO" prop="logo">
          <upload-img title="门店LOGO" v-model="logoImgList"></upload-img>
        </FormItem>
        <FormItem label="门头照" required prop="head">
          <upload-img title="门头照" v-model="headImgList"></upload-img>
        </FormItem>
        <FormItem label="收银台照" required prop="cash">
          <upload-img title="收银台照" v-model="cashImgList"></upload-img>
        </FormItem>
        <FormItem label="经营内容照" required prop="operImg">
          <!-- <Input v-model="formItem.shopContentImg" placeholder="经营内容照" /> -->
          <upload-img title="经营内容照" :needImg="1" v-model="operationImgList" ></upload-img>
        </FormItem>
      </div>
    </Form>
    <b-map :isShow.sync="modal"
      @location="getLocation"
    ></b-map>
  </div>
</template>

<script>
import BMap from '_c/b-map'
import UploadImg from '_c/uploadImg/uploadImg'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import proCityArea from '_c/proCityArea'
import {
/* addStores, updateStore,  */
  getStoresInfo } from '@/api/merchant'
import { getSxoIndustryInfo } from '@/api/common'

export default {
  name: 'storeBaseInfo',
  props: {
    baseInfo: Object
  },
  data() {
    const createValid = (...props) => {
      return (rule, value, callback) => {
        if (props.some(prop => !this.formItem[prop])) {
          callback(new Error())
        } else {
          callback()
        }
      }
    }

    return {
      modal: false,
      headImgList: [], // 门头照 数组
      logoImgList: [], // 门店 logo 数组
      cashImgList: [], // 收银台照 数组
      operationImgList: [], // 经营内容照
      marketOpenTime: ['00:00:00', '23:59:59'],
      location: '', // 经纬度
      formItem: {
        id: '', // 门店 id
        merchantsId: '', // 所属商户 ID
        name: '', // 门店名称
        categoryCode: '', // 经营类型编码, 从商户获取
        contactName: '', // 门店联系人
        contactEmail: '', // 联系人邮箱
        storesTelephone: '', // 门店电话
        briefIntroduction: '', // 门店简介
        detailInfo: '', // 门店详情
        service: '', // 门店服务
        openTime: '', // 营业时间
        addressDetail: '', // 门店地址
        longitude: '', // 经度
        latitude: '', // 维度
        headImg: '', // 门头照
        logoImg: '', // 门店logo
        cashImg: '', // 收银台照
        contentImg: '', // 经营内容照
        mercProv: '', // 省code
        province: '', // 省中文
        mercCity: '', // 市code
        city: '', // 市中文
        mercArea: '', // 区code
        district: '' // 区
      },
      ruleValidate: {
        name: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '门店名称不能全为数字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{8,20}$/, message: '门店名称为8-20个字母、汉字或数字，不含特殊字符', trigger: 'blur' }
        ],
        storesTelephone: [
          { required: true, message: '门店电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        // area: [{ required: true, message: '商户地址不能为空', trigger: 'blur', validator: createValid('mercProv', 'mercCity', 'mercArea') }],
        addressDetail: [
          { required: true, message: '门店地址不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '门店地址不能全为数字', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '门店联系人不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/, message: '联系人必须2-10位中文、字母或数字，不含特殊字符', trigger: 'blur' },
          { pattern: /\D+/, message: '联系人不能全为数字', trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
        ],
        area: [{ required: true, message: '门店地区必须填写', trigger: 'change', validator: createValid('mercProv', 'mercCity', 'mercArea') }],
        // logo: [{ required: true, message: '门店 logo 照必须上传', trigger: 'blur', validator: validLogo }],
        head: [{ required: true, message: '门头照必须上传', trigger: 'blur', validator: createValid('headImg') }],
        cash: [{ required: true, message: '收银台照必须上传', trigger: 'blur', validator: createValid('cashImg') }],
        operImg: [{ required: true, message: '经营内容照必须上传', trigger: 'blur', validator: createValid('contentImg') }]
      },
      businessTypeList: [ // 经营类型
        // { id: 5, code: '5', dataValue: '经营类型' }
      ]
    }
  },
  created() {
    // let { id, merchantId, categoryName, categoryCode } = this.$route.params
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    // 商户已有的字段带过来
    let { id, categoryName, categoryCode, adressDetail,
      alias, briefIntroduction, detail, service, longitude, latitude } = merchant
    this.formItem.merchantsId = id
    this.formItem.categoryName = categoryName
    this.formItem.categoryCode = Number(categoryCode)
    this.formItem.name = alias
    this.formItem.briefIntroduction = briefIntroduction
    this.formItem.detailInfo = detail
    this.formItem.service = service
    this.formItem.addressDetail = adressDetail
    this.formItem.longitude = longitude
    this.formItem.latitude = latitude
    if (longitude && latitude) {
      this.location = `${longitude}, ${latitude}`
    }
    this._getBusinessTypeList()
  },
  watch: {
    baseInfo: {
      handler(v) {
        if (v) {
          this.initForm(v)
        }
      }
    },
    logoImgList(value) {
      this.formItem.logoImg = value.map(v => v.url).join(',')
    },
    headImgList(value) {
      this.formItem.headImg = value.map(v => v.url).join(',')
    },
    cashImgList(value) {
      this.formItem.cashImg = value.map(v => v.url).join(',')
    },
    operationImgList(value) {
      this.formItem.contentImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    changePro({ proCode, province, cityCode, city, areaCode, area }) {
      console.log(proCode, province, cityCode, city, areaCode, area)
      this.formItem.mercProv = proCode
      this.formItem.province = province
      this.formItem.mercCity = cityCode
      this.formItem.city = city
      this.formItem.mercArea = areaCode
      this.formItem.district = area
    },
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let query = Object.assign({}, this.formItem, {
              openTime: this.marketOpenTime.join('-')
            })
            resolve(query)
          } else {
            this.$Message.error('门店信息填写不完整，请检查表单填写!')
            /* eslint-disable */
            reject('门店信息填写不完整！！')
          }
        })
      })
    },
    getLocation(loc) {
      this.formItem.longitude = loc.lng
      this.formItem.latitude = loc.lat
      this.location = loc.lng + ',' + loc.lat
    },
    selectLocation() {
      this.modal = true
    },
    // save() {
    //   // 保存门店。。
    //   this.$refs['formValidate'].validate((valid) => {
    //     if (valid) {
    //       let query = Object.assign({}, this.formItem, {
    //         openTime: this.marketOpenTime.join('-')
    //       })
    //       if (this.formItem.id) { // 有 id 则是更新
    //         updateStore(query).then(res => {
    //           this.$Message.success('修改成功')
    //           this.$router.push({
    //             name: 'storeList',
    //             params: {
    //               id: this.formItem.merchantsId,
    //               categoryName: this.formItem.categoryName,
    //               categoryCode: this.formItem.categoryCode
    //             }
    //           })
    //         })
    //       } else { // 没有 id 则是新增
    //         addStores(query).then(res => {
    //           this.$Message.success('保存成功')
    //           this.$router.push({
    //             name: 'storeList',
    //             params: {
    //               id: this.formItem.merchantsId,
    //               categoryName: this.formItem.categoryName,
    //               categoryCode: this.formItem.categoryCode
    //             }
    //           })
    //         })
    //       }
    //     } else {
    //       this.$Message.error('请检查表单填写!')
    //     }
    //   })
    // },
    _getBusinessTypeList() {
      return getSxoIndustryInfo().then(res => {
        this.businessTypeList = res
      })
    },
    _getStoreInfo(marketId) {
      console.log(marketId)
      getStoresInfo({marketId}).then(res => {
        console.log(res)
        let data = res.data
        this.initForm(data)
      })
    },
    initForm(data) {
      this.formItem.id = data.id
      this.formItem.merchantsId = data.merchantsId
      this.formItem.name = data.name
      this.formItem.contactName = data.contactName
      this.formItem.contactEmail = data.contactEmail
      this.formItem.storesTelephone = data.storesTelephone
      this.formItem.briefIntroduction = data.briefIntroduction
      this.formItem.detailInfo = data.detailInfo
      this.formItem.service = data.service
      this.formItem.openTime = data.openTime
      this.formItem.addressDetail = data.addressDetail
      this.formItem.longitude = data.longitude
      this.formItem.latitude = data.latitude
      this.formItem.headImg = data.headImg
      this.formItem.logoImg = data.logoImg
      this.formItem.cashImg = data.cashImg
      this.formItem.contentImg = data.contentImg
      // WARNING 注意，mercArea 是省编码，mercProv 是区编码 神他妈坑！！！！！
      this.formItem.mercProv = data.mercProv
      this.formItem.mercCity = data.mercCity
      this.formItem.mercArea = data.mercArea

      this.marketOpenTime = data.openTime && data.openTime.split('-')
      this.location = data.longitude + ',' + data.latitude

      if (data.headImg) {
        this.headImgList = data.headImg.split(',').map((v, i) => ({name: '门头照' + i, url: v}))
      }
      if (data.logoImg) {
        this.logoImgList = data.logoImg.split(',').map((v, i) => ({name: 'logo照' + i, url: v}))
      }
      if (data.cashImg) {
        this.cashImgList = data.cashImg.split(',').map((v, i) => ({name: '收银台照' + i, url: v}))
      }
       if (data.contentImg) {
            this.operationImgList = [{ name: '经营内容照', url: data.contentImg }]
          }
    }
  },
  components: { breadCrumb, UploadImg, BMap, proCityArea }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  padding-bottom: 20px;

  .left,
  .right {
    flex: 1;
  }

}
.button {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0;
}
.tips {
  margin-left: 90px;
  color: #ccc;
  font-size: 12px;
}
</style>
