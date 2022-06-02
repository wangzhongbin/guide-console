<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <RoleView v-model="showView" :data="viewData" />
    <RoleEdit v-model="showEdit" :role-id="roleId" @success="loadData" />
  </div>
</template>
<script>

import { roleView, roleRemove } from '@/api/sys/role'

import RoleEdit from './Edit'
import RoleView from './View'

export default {
  components: { RoleEdit, RoleView },
  data () {
    const actions = [
      { button: 'update', click: (params) => this.update(params) },
      { button: 'remove', click: (params) => this.remove(params) },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [{ title: '角色名称', key: 'roleName' }, { title: '租户名称', key: 'tenantName' }]
    return {
      url: '/manage/role/list',
      showEdit: false,
      roleId: 0,
      showView: false,
      viewData: {},
      queryForms: [{ title: '角色名称', key: 'roleName' }],
      buttons: [{ type: 'primary', fun: () => { this.roleId = 0; this.showEdit = true }, icon: 'md-add', name: '新增角色' }],
      actions,
      columns
    }
  },
  created () { },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      this.roleId = params.row.roleId
      this.showEdit = true
    },
    view (params) {
      roleView(params.row.roleId).then(res => {
        this.viewData = res.data
        this.showView = true
      })
    },
    remove (params) {
      roleRemove(params.row.roleId).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
