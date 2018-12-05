<template>
  <div class="update-password">
    <h3 style="padding-bottom: 10px">修改密码</h3>
    <Card>
      <Row>
        <Col span="24" style="margin-top: 200px;">
           <Form :label-width="150" class="form"  ref="form" :model="params" :rules="rules">
            <FormItem label="原密码：" prop="oldPassword">
              <Input placeholder="请输入原密码" clearable style="width: 400px;" v-model="params.oldPassword" type="password" />
            </FormItem>
            <FormItem label="新密码：" prop="newPassword">
              <Input placeholder="请输入新密码" clearable style="width: 400px; margin-right: 20px;" v-model="params.newPassword" type="password" />
            </FormItem>
            <FormItem label="确认新密码：" prop="againNewPassword">
              <Input placeholder="确认新密码" clearable style="width: 400px; margin-right: 20px;" v-model="againNewPassword" type="password" @on-blur="params.againNewPassword = againNewPassword" />
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
import { updatePassword } from '@/api/withdrawRecord'
import md5 from 'md5'
export default {
  name: 'update-password',
  data() {
    return {
      againNewPassword: null,
      params: {
        oldPassword: null,
        newPassword: null,
        againNewPassword: null
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ],
        againNewPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          {
            message: '两次填写密码不一致，请重新填写!',
            trigger: 'blur',
            validator: (value, rule, callback) => {
              if (this.againNewPassword !== this.params.newPassword) {
                callback(new Error())
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    update() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updatePassword({
            oldPassword: md5(this.params.oldPassword),
            newPassword: md5(this.params.newPassword),
            mobile: this.$store.state.user.mobile
          }).then(data => {
            this.$store.dispatch('handleLogOut').then(() => {
              this.$router.push({ name: 'login' })
            })
          })
        } else {
          this.$Message.error('请将信息填写完整')
        }
      })
    }
  }
}
</script>
