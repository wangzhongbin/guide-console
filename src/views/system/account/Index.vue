<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <!-- <EditModal width="550" :title="editData.id ? '修改用户' : '新增用户'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" /> -->
    <AccountView v-model="showView" :data="viewData" :roles="roles" :menus="menus" />
    <!-- <EditModal :forms="editForms" :title="'正在为 ' + currentAccount.name + ' 账号配置角色'" @ok="saveAccountRole" v-model="showRole">
      <AccountRole ref="account-role" :account-id="currentAccount.id" />
    </EditModal> -->
    <AccountEdit v-model="showEdit" :account-id="accountId" @success="loadData" />
  </div>
</template>
<script>

// import DeptTreeTitle from './DeptTreeTitle'

import AccountView from './View'

import AccountEdit from './Edit'

// import AccountRole from './AccountRole'

// import { accountAdd, accountUpdate, accountView, updateAccountRole, resetPassword } from '@/api/sys/account'
import { accountView, resetPassword } from '@/api/sys/account'

export default {
  // components: { AccountView, AccountRole },
  components: { AccountView, AccountEdit },
  data () {
    const actions = [
      // { type: 'success', name: '角色配置', click: (params) => this.editRole(params), checkDisabled: (params) => params.row.id === 1 },
      { button: 'update', click: (params) => { this.update(params) } },
      { type: 'primary', poptip: true, name: '重置密码', click: (params) => this.reset(params), checkDisabled: (params) => params.row.id === 1 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.id === 1 },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [
      { title: '用户名', key: 'userName' },
      { title: '姓名', key: 'name' },
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
      showView: false,
      showRole: false,
      accountId: 0,
      viewData: {},
      currentAccount: {},
      roles: [],
      menus: [],
      queryForms: [{ title: '用户名', key: 'userName' }, { title: '手机号码', type: 'phonenumber' }],
      // editForms: [],
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
    // this.editForms.push({ title: '帐号', key: 'userName', required: true, span: 2 })
    // this.editForms.push({ title: '手机号码', key: 'phonenumber', required: true, span: 2 })
    // this.editForms.push({ title: '姓名', key: 'nickName', required: true, span: 2 })
    // this.editForms.push({ title: '密码', key: 'password', required: true, span: 2 })
    // this.editForms.push({ title: '密码确认', key: 'password', required: true, span: 2 })
    // this.editForms.push({ title: '电子邮件', key: 'email', span: 2 })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    // ok (fromData, callback, closeLoading) {
    //   if (fromData.id) {
    //     accountUpdate(fromData).then(res => {
    //       callback()
    //       this.$Message.success('修改成功')
    //       this.$refs['view-page'].loadData()
    //     }).catch(() => { closeLoading() })
    //   } else {
    //     accountAdd(fromData).then(res => {
    //       callback()
    //       this.$Message.success('新增成功')
    //       this.$refs['view-page'].loadData()
    //     }).catch(() => { closeLoading() })
    //   }
    // },
    // saveAccountRole (callback, closeLoading) {
    //   const accountRoleIds = this.$refs['account-role'].accountRoleIds
    //   const ids = accountRoleIds.join(',')
    //   updateAccountRole({ id: this.currentAccount.id, roleIds: ids.toString() }).then(res => {
    //     callback()
    //     this.$Message.success('配置成功')
    //     this.loadData()
    //   }).catch(() => { closeLoading() })
    // },
    update (params) {
      this.accountId = params.row.userId
      this.showEdit = true
    },
    // editRole (params) {
    //   this.currentAccount = { id: params.row.id, name: params.row.name }
    //   this.showRole = true
    // },
    reset (params) {
      resetPassword({ id: params.row.id }).then(() => {
        this.$Message.success('密码重置成功')
      })
    },
    view (params) {
      const { id, name, loginName, deptName } = params.row
      accountView(id).then(res => {
        this.viewData = { name, loginName, deptName }
        this.roles = res.roles
        this.menus = res.menus
        this.showView = true
      })
    }
  }
}
</script>
