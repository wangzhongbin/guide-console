<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="editData.id ? '修改用户' : '新增用户'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
    <AccountView v-model="showView" :data="viewData" :roles="roles" :menus="menus" />
    <EditModal width="800" :title="'正在为 ' + currentAccount.name + ' 账号配置角色'" @ok="saveAccountRole" v-model="showRole">
      <AccountRole ref="account-role" :account-id="currentAccount.id" />
    </EditModal>
  </div>
</template>
<script>

import DeptTreeTitle from './DeptTreeTitle'

import AccountView from './View'

import AccountRole from './AccountRole'

import { accountAdd, accountUpdate, accountView, updateAccountRole, resetPassword } from '@/api/sys/account'

export default {
  components: { AccountView, AccountRole },
  data () {
    const actions = [
      { type: 'success', name: '角色配置', click: (params) => this.editRole(params), checkDisabled: (params) => params.row.id === 1 },
      { button: 'update', click: (params) => { this.update(params) }, checkDisabled: (params) => params.row.id === 1 },
      { type: 'primary', poptip: true, name: '重置密码', click: (params) => this.reset(params), checkDisabled: (params) => params.row.id === 1 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.id === 1 },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [
      { title: '姓名', key: 'name' },
      { title: '登录名', key: 'loginName' }]
    return {
      group: 'ACCOUNT',
      showEdit: false,
      showView: false,
      showRole: false,
      editData: {},
      viewData: {},
      currentAccount: {},
      roles: [],
      menus: [],
      queryForms: [{ title: '员工姓名', key: 'name' }, { title: '登录名', type: 'loginName' }],
      editForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = { deptId: '' }; this.showEdit = true }, icon: 'md-add', name: '新增员工' }],
      actions,
      columns
    }
  },
  created () {
    this.editForms.push({ title: '员工姓名', key: 'name', required: true })
    this.editForms.push({ title: '登录名', key: 'loginName', required: true })
  },
  methods: {
    assembleTreeNode (e) {
      const node = {
        id: e.id,
        title: e.name,
        type: e.type,
        render: (h, { root, node, data }) => h(DeptTreeTitle, { props: { node: data } })
      }
      if (e.type === 1) {
        node.loading = false
        node.children = []
      }
      return node
    },
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        accountUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        accountAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    saveAccountRole (callback, closeLoading) {
      const accountRoleIds = this.$refs['account-role'].accountRoleIds
      const ids = accountRoleIds.join(',')
      updateAccountRole({ id: this.currentAccount.id, roleIds: ids.toString() }).then(res => {
        callback()
        this.$Message.success('配置成功')
        this.loadData()
      }).catch(() => { closeLoading() })
    },
    update (params) {
      this.editData = {
        id: params.row.id,
        name: params.row.name,
        loginName: params.row.loginName,
        deptName: params.row.deptName,
        deptId: params.row.deptId
      }
      this.showEdit = true
    },
    editRole (params) {
      this.currentAccount = { id: params.row.id, name: params.row.name }
      this.showRole = true
    },
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
