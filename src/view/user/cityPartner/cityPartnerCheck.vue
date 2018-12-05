<template>
  <div class="cityPartnerCheck">
    <bread-crumb :data="[
      {path: '/cityPartnerList', title: '城市合伙人'},
      {title: '城市合伙人查看'}
    ]"></bread-crumb>
     <Card>
      <Form :label-width="100" label-position="left" class="pl20 pr20">
        <Row :gutter="20">
          <i-col span="12">
            <formItem label="合伙人名称">
              {{ cityPartner.partnerName }}
            </formItem>
            <formItem label="合伙人手机号">
              {{ cityPartner.mobile }}
            </formItem>
            <formItem label="联系地址">
              {{ cityPartner.province + cityPartner.city + cityPartner.district + cityPartner.detailAddress }}
            </formItem>
            <formItem label="所属分公司">
              {{ cityPartner.controlledCompanyName }}
            </formItem>
            <formItem label="开户名">{{ cityPartner.accountName }}</formItem>
            <formItem label="开户总行">{{ cityPartner.bankName }}</formItem>
            <formItem label="开户支行">{{ cityPartner.bankBranchName }}</formItem>
            <formItem label="银行卡号">{{ cityPartner.bankFrontNumber }}</formItem>
          </i-col>
          <i-col span="12">
            <formItem label="添加时间">
              {{ cityPartner.createTime | formatDate }}
            </formItem>
            <formItem label="法人名称">{{ cityPartner.legalPersonName }}</formItem>
            <formItem label="身份证号">{{ cityPartner.identityCard }}</formItem>
            <formItem label="身份证照">
              <upload-img v-if="frontImg" viewOnly v-model="frontImg"></upload-img>
              <upload-img v-if="backImg" viewOnly v-model="backImg"></upload-img>
            </formItem>
            <formItem label="银行卡正面图">
              <upload-img v-if="bankFrontImg" viewOnly v-model="bankFrontImg"></upload-img>
            </formItem>
          </i-col>
        </Row>
      </Form>
    </Card>

  </div>
</template>

<script>
import { getParterInfo } from '@/api/user/cityPartner'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import UploadImg from '_c/uploadImg/uploadImg'
import { formatDate } from '@/libs/util'

export default {
  name: 'cityPartnerCheck',
  data() {
    return {
      cityPartner: {
        id: '',
        name: '',
        roleName: '',
        mobile: '',
        address: '',
        detailAddress: '',
        controlledCompanyName: '',
        createTime: '',
        bankFrontImg: '',
        accountName: '',
        partnerName: '',
        bankBranchName: '',
        bankFrontNumber: '',
        bankName: '',
        identityBackImg: '',
        identityFrontImg: '',
        identityCard: ''
      }
    }
  },

  created() {
    let id = this.$route.query.id
    this.cityPartner.id = id
    this.getCityPartnerInfo(id)
  },

  computed: {
    bankFrontImg() {
      if (this.cityPartner.bankFrontImg) {
        return [{ url: this.cityPartner.bankFrontImg }]
      }
      return null
    },
    frontImg() {
      if (this.cityPartner.identityFrontImg) {
        return [{ url: this.cityPartner.identityFrontImg }]
      }
      return null
    },
    backImg() {
      if (this.cityPartner.identityBackImg) {
        return [{ url: this.cityPartner.identityBackImg }]
      }
      return null
    }
  },

  filters: {
    formatDate(value) {
      return formatDate(value, 'yyyy年MM月dd日 hh:mm:ss')
    }
  },

  methods: {

    // 查询城市合伙人详情
    getCityPartnerInfo(id) {
      getParterInfo({ userId: id, roleId: 1 }).then(res => {
        this.cityPartner = res.data
      })
    }
  },
  components: { breadCrumb, UploadImg }
}
</script>
