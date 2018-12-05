<template>
  <div>
    <breadCrumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {path: '/storeList', title: '门店管理'},
      {title: title}
    ]"></breadCrumb>
    <Card>
      <divide-line placement="bottom" class="mb20">门店信息</divide-line>
      <store-base-info
        ref="baseInfo"
        :baseInfo="baseInfo"
      ></store-base-info>
    </Card>
    <!-- <div class="button">
      <Button class="w120 btn-cancel" @click="cancel">取 消</Button>
      <Button type="primary" class="w120 btn-add" @click="submit">保存</Button>
    </div> -->
  </div>
</template>

<script>
import divideLine from '_c/divideLine/divide-line'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import storeBaseInfo from './components/storeBaseInfo'
import { addStores, updateStore, getStoresInfo } from '@/api/merchant'
// import { merchantSignUp } from '@/api/user'
// import { getSxoIndustryInfo } from '@/api/common'

export default {
  name: 'storeAdd',
  data() {
    return {
      id: '',
      title: '门店新增',
      editable: true,
      baseInfo: null,
      accountInfo: null
    }
  },
  created() {
    let { id } = this.$store.state.merchant.store || {}
    if (id) {
      this.id = id
      this.title = '门店编辑'
      getStoresInfo({ marketId: id }).then(res => {
        this.baseInfo = res.data
      })
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    submit() {
      let baseInfo = this.$refs['baseInfo'].submit()
      // 有id是更新
      baseInfo.then(res => {
        if (this.id) {
          updateStore(res).then(res => {
            this.$router.push({ name: 'storeList' })
          })
        } else {
          debugger
          addStores(res).then(res => {
            this.$router.push({ name: 'storeList' })
          })
        }
      })
    }
  },
  components: { breadCrumb, divideLine, storeBaseInfo }
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
