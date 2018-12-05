<template>
<div>
  <bread-crumb :data="[
      {path:  '/merchantList' , title: '商户管理'},
      {path: { path: '/storeList', query: { merchantId: this.merchantId } }, title: '门店管理'},
      {title: '门店查看'}
    ]"></bread-crumb>
  <Card class="pl20 pr20">
    <divide-line placement="bottom" class="mt10 mb20">基本信息</divide-line>
    <Form :label-width="100" class="form pb30" label-position="left">
      <Row>
        <i-col span="12">
          <FormItem label="门店名">{{ baseInfo.name }}</FormItem>
          <!-- <FormItem label="店长名称">{{ baseInfo.name }}</FormItem> -->
          <!-- <FormItem label="店长手机号">{{ baseInfo.name }}</FormItem> -->
          <FormItem label="门店地址">{{ baseInfo.province + baseInfo.city + baseInfo.district + baseInfo.addressDetail }}</FormItem>
        </i-col>
        <i-col span="12">
            <FormItem label="门头照" >
              <img v-if="baseInfo.headImg" :src="baseInfo.headImg" alt="门头照" width="100px" height="100px">
          </FormItem>
          <FormItem label="收银台照" >
            <img v-if="baseInfo.cashImg" :src="baseInfo.cashImg" alt="收银台照" width="100px" height="100px">
          </FormItem>
          <FormItem label="经营内容照" >
            <img v-if="baseInfo.contentImg" :src="baseInfo.cashImg" alt="收银台照" width="100px" height="100px">
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </Card>
</div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import uploadImg from '_c/uploadImg/uploadImg'
import { getStoresInfo } from '@/api/store/index'
export default {
  name: 'checkMerchant',
  data() {
    return {
      merchantId: null, // 商户ID
      id: '',
      goodTime: '',
      cardGoodTime: '',
      fontImg: [],
      backImg: [],
      baseInfo: {},
      industry: {},
      legalman: {},
      settleInfo: {}
    }
  },
  components: { breadCrumb, divideLine, uploadImg },
  created() {
    this.id = this.$route.query.marketId
    this.merchantId = this.$route.query.merchantId
    getStoresInfo({ marketId: this.id }).then(res => {
      this.baseInfo = res.data
    })
  },
  computed: {
    logoImg() {
      return [{ url: this.baseInfo.logoImg }]
    },
    cashImg() {
      return [{ url: this.baseInfo.cashImg }]
    },
    headImg() {
      return [{ url: this.baseInfo.headImg }]
    }
  }
}
</script>
