<template>
  <div class="binding-phone">
    <h3 style="padding-bottom: 10px">绑定手机</h3>
    <Card style="margin:200px outo">
      <Row >
        <Col span="24" >
          <Form :label-width="150" class="form"  ref="form" :model="params" :rules="rules" style="margin:200px outo">
            <FormItem label="原绑定手机号：" prop="oldmobile">
              <Input placeholder="请输入原绑定手机号（确保真实有效）" clearable style="width: 400px;" v-model="params.oldmobile"></Input>
            </FormItem>
            <FormItem label="短信验证码：" prop="volieCode">
              <Input placeholder="请输入短信验证码" style="width: 400px; margin-right: 20px;" v-model="params.volieCode">
                <Button slot="append" @click="countDown" v-if="!disableds">{{text}}</Button>
                <Button slot="append" disabled v-else style="color: #808695">{{text}}</Button>
              </Input>
            </FormItem>
            <FormItem label="新绑定手机号：" prop="mobile">
              <Input placeholder="请输入新绑定手机号" clearable style="width: 400px; margin-right: 20px;" v-model="params.mobile"></Input>
            </FormItem>
            <FormItem label="">
              <Button type="primary" style="width: 400px; margin-right: 20px; margin-bottom: 370px;" @click="update">确认修改</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { validateCode, updateMobile } from '@/api/withdrawRecord'
export default {
  name: 'binding-phone',
  data() {
    return {
      text: '获取验证码',
      disableds: false,
      params: {
        mobile: '',
        volieCode: '9876',
        oldmobile: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        volieCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '新手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    countDown() {
      let time = 60
      if (this.text === '获取验证码') {
        this.disableds = true
        validateCode({ mobile: this.oldmobile, type: '1' }).then(res => {
          // this.mobile
        })
        let timeCountDown = setInterval(() => {
          time--
          if (time === 0) {
            this.disableds = false
            this.text = '获取验证码'
            clearInterval(timeCountDown)
          } else {
            this.text = time + 'S后重新获取'
          }
        }, 1000)
      }
    },
    update() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateMobile(this.params).then(res => {})
        } else {
          this.$Message.error('请将信息填写完整')
        }
      })
    }
  }
}
</script>
