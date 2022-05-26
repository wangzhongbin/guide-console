<template>
  <div>
    <ViewPage ref="view-page" :url="url" :del-url="delUrl" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" title="密码重置" :forms="resetForms" :edit-data="resetData" @ok="ok" v-model="showReset" />
    <AccountView v-model="showView" :data="viewData" :roles="roles" />
    <AccountEdit v-model="showEdit" :account-id="accountId" :roles="roles" @success="loadData" />
  </div>
</template>
<script>

import AccountView from './View'

import AccountEdit from './Edit'

import { loadRoles } from '@/api/sys/role'

import { accountView, accountRemove, resetPassword } from '@/api/sys/account'

export default {
  components: { AccountView, AccountEdit },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { type: 'primary', name: '重置密码', click: (params) => this.reset(params) },
      { button: 'remove', click: (params) => this.remove(params) },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [
      { title: '用户名', key: 'userName' },
      { title: '登录名', key: 'loginName' },
      { title: '租户名称', key: 'tenantName' },
      { title: '姓名', key: 'nickName' },
      { title: '手机号码', key: 'phonenumber' },
      { title: '邮箱', key: 'email' },
      { title: '账号类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.userType, this.userTtypeOptions) },
      { title: '帐号状态', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.status, this.statusOptions) }]

    return {
      url: '/manage/user/list',
      showEdit: false,
      showReset: false,
      showView: false,
      showRole: false,
      accountId: 0,
      resetData: {},
      viewData: {},
      currentAccount: {},
      roles: [],
      menus: [],
      resetForms: [{ title: '新密码', key: 'password', required: true }],
      queryForms: [{ title: '用户名', key: 'userName' }, { title: '手机号码', type: 'phonenumber' }],
      buttons: [{ type: 'primary', fun: () => { this.accountId = 0; this.showEdit = true }, icon: 'md-add', name: '新增用户' }],
      actions,
      columns,
      userTtypeOptions: [
        { value: 0, label: '管理员' },
        { value: 1, label: '系统用户' },
        { value: 2, label: '租户管理员' },
        { value: 3, label: '租户用户' }],
      statusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '停用' },
        { value: 2, label: '锁定' }]
    }
  },
  created () {
    loadRoles().then(res => { this.roles = res.data })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
      resetPassword(fromData).then(() => {
        callback()
        this.$Message.success('密码重置成功')
      }).catch(() => { closeLoading() })
    },
    update (params) {
      this.accountId = params.row.userId
      this.showEdit = true
    },
    reset (params) {
      this.resetData.userId = params.row.userId
      this.showReset = true
    },
    view (params) {
      const { userId } = params.row
      accountView(userId).then(res => {
        const user = res.data.user
        const roleIds = res.data.roleIds
        const roles = this.roles.filter(e => roleIds.includes(e.roleId))
        user.roles = roles
        this.viewData = user
        this.showView = true
      })
    },
    remove (params) {
      accountRemove(params.row.userId).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
