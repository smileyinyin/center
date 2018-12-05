<template>
<div>
  <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '账号信息详情'}
    ]"></bread-crumb>
  <Card>
    <h3 slot="title">账号信息详情</h3>
    <Form :label-width="120">
      <formItem label="账号名">{{ formItem.accountName }}</formItem>
      <!-- <formItem label="账号角色">{{ formItem.accountRole }}</formItem>
      <formItem label="商户角色">{{ getRole }}</formItem> -->
      <formItem label="手机号">{{ formItem.mobile }}</formItem>
      <formItem label="绑定的城市合伙人">{{ formItem.cityParent }}</formItem>
      <formItem label="绑定的渠道合伙人" v-if="formItem.parent">{{ formItem.parent }}</formItem>
      <formItem label="绑定的业务员" v-if="formItem.sale">{{ formItem.sale }}</formItem>
    </Form>
  </Card>
  <Row type="flex" class="mt30 ml30">
    <Button class="w120 btn-cancel" size="large" @click="cancel">返回</Button>
  </Row>
</div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { BsinessFind } from '@/api/store/index'

export default {
  name: 'accountInfo',
  data() {
    return {
      merchantsId: '', // 商户id
      formItem: {}
    }
  },
  created() {
    this.merchantsId = this.$route.query.merchantId
    BsinessFind({ merchantsId: this.merchantsId }).then(res => {
      this.formItem = res.data
    })
  },
  computed: {
    getRole() {
      let role = this.formItem.isSupplier
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
  methods: {
    cancel() {
      this.$router.go(-1)
    }
  },
  components: { breadCrumb }
}
</script>
