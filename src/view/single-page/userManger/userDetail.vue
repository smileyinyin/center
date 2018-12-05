<template>
  <div class="user-detail">
    <bread-crumb :data="[{path:'/user/userManger',title: '会员管理'}, {title: '查看详情'}]"></bread-crumb>
    <Card>
      <Form :label-width="100">
        <divide-line placement="bottom">基础信息</divide-line>
        <Row class="mt20">
          <i-col span="12">
            <FormItem label="会员ID：">{{merchants_id}}</FormItem>
            <FormItem label="昵称：">{{params.username}}</FormItem>
            <FormItem label="状态：">
              <span class="mr20">{{params.status === 1? '冻结':'正常'}}</span>
              <Button type="success" @click="statusOperation" v-if="params.status === 1" size="small">恢复</Button>
              <Button type="error" @click="statusOperation" v-else size="small">冻结</Button>
            </FormItem>
            <FormItem label="真实姓名：">{{params.realname}}</FormItem>
            <FormItem label="性别：">{{params.gender}}</FormItem>
            <FormItem label="生日：">{{params.birthday}}</FormItem>
            <FormItem label="身份证号：">{{params.identity_card}}</FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="头像：" class="img">
              <Card style="width: 100px; height: 100px;">
                  <img :src="params.avatar" alt="" style="width: 98px; height: 98px;">
              </Card>
            </FormItem>
            <FormItem label="所在城市：">{{params.province}} {{params.city}} {{params.district}}</FormItem>
            <FormItem label="微信：">{{params.wechat}}</FormItem>
            <FormItem label="邮箱：">{{params.email}}</FormItem>
          </i-col>
        </Row>
        <divide-line placement="bottom">账户信息</divide-line>
        <Row class="mt20">
          <i-col span="12">
            <FormItem label="余额：">{{params.money}}<Button type="error" @click="jf"  size="small" style="margin-left: 20px;">积分明细</Button></FormItem>
            <FormItem label="积分：">{{params.integral}}</FormItem>
            <FormItem label="线上订单：">{{params.online}}</FormItem>
            <FormItem label="线下订单：">{{params.online}}</FormItem>
            <FormItem label="绑定门店：">{{params.province}} {{params.city}} {{params.district}} {{params.name}}</FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="绑定银行卡：">
              <span>{{item}}</span>
              <Button type="error" @click="untie(item, index)" size="small" style="margin-left: 20px;">解绑</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
import { findUser, updataStatus, deteleUntieBankCard } from '@/api/userManger'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
export default {
  components: {
    breadCrumb,
    divideLine
  },
  name: 'userDetail',
  data() {
    return {
      params: {},
      id: null,
      merchants_id: null
    }
  },
  created() {
    this.id = this.$route.query.id
    this.merchants_id = this.$route.query.merchants_id
    findUser({ id: this.id }).then(res => {
      this.params = res.data
    })
  },
  methods: {
    untie(number, index) {
      this.$Modal.confirm({
        title: '解绑操作',
        content: `确认要解绑此银行卡吗？`,
        onOk: () => {
          deteleUntieBankCard({ id: this.id, bank_front_number: number }).then(res => {
            if (this.params.bank_front_number.length === 1) {
              this.params.bank_front_number = []
            } else {
              this.params.bank_front_number = this.params.bank_front_number.splice(index, 1)
            }
          })
        }
      })
    },
    statusOperation() {
      let that = this
      let title = that.params.status === 0 ? '冻结' : '恢复'
      that.$Modal.confirm({
        title: `${title}操作`,
        content: `确认要${title}用户信息吗？`,
        onOk: () => {
          let status = null
          if (that.params.status === 0) {
            status = 1
          } else {
            status = 0
          }
          updataStatus({ id: that.params.id, status: status }).then(res => {
            that.params.status = status
          })
        }
      })
    },
    jf() {
      this.$router.push({
        path: 'integralDetail',
        query: { id: this.$route.query.id }
      })
    }
  }
}
</script>
<style>

.user-detail .img .ivu-card-body {
    padding: 0;
}
</style>
