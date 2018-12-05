<template>
  <div>
    <h3 style="margin-bottom: 10px">查看业务员</h3>

    <Card>
      <Form :label-width="120">
        <formItem label="用户名称">{{ salesMan.partnerName }}</formItem>
        <formItem label="手机号">{{ salesMan.mobile }}</formItem>
        <formItem label="隶属分公司">{{ salesMan.controlledCompanyName }}</formItem>
        <formItem label="所属合伙人">{{ salesMan.parentName }}</formItem>
        <formItem label="POS分润比例">{{ (salesMan.posProfitRate * 100).toFixed(0) + '%' }}</formItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getParterInfo } from '@/api/user/cityPartner'
// import { formatDate } from '@/libs/util'

export default {
  name: 'salesCheck',
  data() {
    return {
      salesMan: {
        id: '',
        partnerName: '',
        controlledCompanyName: '',
        mobile: '',
        parentId: '',
        posProfitRate: ''
      }
    }
  },

  created() {
    let id = this.$route.query.id
    this.salesMan.id = id
    this.getSalesInfo(id)
  },

  methods: {
    getSalesInfo(id) {
      getParterInfo({ userId: id, roleId: 3 }).then(res => {
        this.salesMan = res.data
      })
    }
  }

}
</script>
