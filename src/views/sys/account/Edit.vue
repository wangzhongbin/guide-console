<template>
  <EditModal :title="data.id ? '修改用户' : '新增用户'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
    <div class="group-box border-top">
      <div class="box ">角色选择</div>
      <CheckboxGroup class="box" v-model="accountRoleIds">
        <Checkbox border v-for="item in roles" :key="item.id" :label="item.roleId">{{item.roleName}}</Checkbox>
      </CheckboxGroup>
    </div>
  </EditModal>
</template>
<script>

import { accountAdd, accountUpdate, accountView } from '@/api/sys/account'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    accountId: Number,
    roles: Array
  },
  data () {
    return {
      forms: [],
      data: {},
      accountRoleIds: []
    }
  },
  watch: {
    accountId (val) {
      this.data = {}
      this.accountRoleIds = []
      if (val) {
        accountView(val).then(res => {
          this.accountRoleIds = res.data.roleIds
          this.data = res.data.user
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '帐号', key: 'userName', required: true, span: 2 })
    this.forms.push({ title: '姓名', key: 'nickName', required: true, span: 2 })
    this.forms.push({ title: '手机号码', key: 'phonenumber', required: true, span: 2 })
    this.forms.push({ title: '电子邮件', key: 'email', span: 2 })
    this.forms.push({ title: '密码', key: 'password', show: (data) => !data.userId, rule: { requiredFun: (data) => !data.userId, message: '' }, span: 2 })
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      data.roleIds = this.accountRoleIds
      if (data.userId) {
        accountUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        accountAdd(data).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
