<template>
  <div class="wrapper">
    <Form :label-width="100" class="form pb30" label-position="left">
       <i-col span="12">
        <FormItem label="商户名">{{ baseInfo.name }}</FormItem>
        <!-- <FormItem label="商户角色">{{ getRole }}</FormItem> -->
        <FormItem label="商户简称">{{ baseInfo.alias }}</FormItem>
        <FormItem label="商户类型">{{ baseInfo.mold === 0 ? '个体' : '连锁店' }}</FormItem>
        <FormItem label="行业类别">{{ baseInfo.mcc }}</FormItem>
        <FormItem label="经营类型">{{ baseInfo.categoryName || categoryName }}</FormItem>
        <FormItem label="商家地址">{{ baseInfo.province + baseInfo.city + baseInfo.district + baseInfo.adressDetail }}</FormItem>
        <FormItem label="商家简介">{{ baseInfo.briefIntroduction }}</FormItem>
        <FormItem label="商家详情">{{ baseInfo.detail }}</FormItem>
        <FormItem label="商家服务">{{ baseInfo.service }}</FormItem>
        <FormItem label="门店LOGO">
          <!-- <upload-img title="门店LOGO" v-model="baseInfo.logoImgList"></upload-img> -->
          <img v-if="baseInfo.logoImg" :src="baseInfo.logoImg" alt="门店LOGO" width="100px" height="100px">
        </FormItem>
     </i-col>
      <i-col span="12">
        <FormItem label="经纬度" >
          <b-map v-if="baseInfo.longitude" :initPoint='{lng: baseInfo.longitude, lat: baseInfo.latitude}' :isAlert="false" :width="380" :height="230"></b-map>
          <span v-else>无</span>
        </FormItem>
         <FormItem label="门头照" >
            <img v-if="baseInfo.headImg" :src="baseInfo.headImg" alt="门头照" width="100px" height="100px">
        </FormItem>
        <FormItem label="收银台照" >
          <img v-if="baseInfo.cashImg" :src="baseInfo.cashImg" alt="收银台照" width="100px" height="100px">
        </FormItem>
    </i-col>
    </Form>
  </div>
</template>

<script>
import uploadImg from '_c/uploadImg/uploadImg'
import bMap from '_c/b-map'

export default {
  name: 'checkBaseinfo',
  props: {
    baseInfo: {
      type: Object,
      required: true
    },
    categoryName: {
      type: String
    }
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
    },
    getRole() { // 0城市合伙人1渠道合伙人2供应商3体验店4商户
      let role = this.baseInfo.isSupplier
      if (role === 0) {
        return '城市合伙人'
      } else if (role === 1) {
        return '渠道合伙人'
      } else if (role === 2) {
        return '供应商'
      } else if (role === 3) {
        return '体验店'
      } else if (role === 4) {
        return '商户'
      }
    }
  },
  components: { bMap, uploadImg }
}
</script>
