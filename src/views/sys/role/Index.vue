<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <RoleView v-model="showView" :data="viewData" :menus="menus" />
    <EditModal width="550" :title="editData.id ? '修改角色' : '新增角色'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
    <EditModal width="550" :title="'正在为 ' + currentRole.name + ' 角色配置菜单'" @ok="saveRoleMenu" v-model="showMenu">
      <RoleMenu ref="role-menu" :role-id="currentRole.id" />
    </EditModal>
  </div>
</template>
<script>

import { roleView, roleUpdate, roleAdd, updateRoleMenus } from '@/api/sys/role'

import RoleMenu from './RoleMenu'
import RoleView from './View'

export default {
  components: { RoleView, RoleMenu },
  data () {
    const actions = [
      { type: 'success', name: '菜单配置', click: (params) => this.editMenu(params), checkDisabled: (params) => params.row.processed === 1 || params.row.id === 1 },
      { button: 'update', click: (params) => this.update(params), checkDisabled: (params) => params.row.processed === 1 || params.row.id === 1 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.processed === 1 || params.row.id === 1 },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [{ title: '角色名称', key: 'name' }]
    return {
      showEdit: false,
      editData: {},
      showView: false,
      viewData: {},
      showMenu: false,
      currentRole: {},
      editForms: [{ title: '角色名称', key: 'name', required: true }],
      menus: [],
      group: 'ROLE',
      queryForms: [{ title: '角色名称', key: 'name' }],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增角色' }],
      actions,
      columns
    }
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      const { id, name } = params.row
      this.editData = { id, name }
      this.showEdit = true
    },
    saveRoleMenu (callback, closeLoading) {
      const roleMenus = this.$refs['role-menu'].getRoleMenus()
      const ids = roleMenus.map(e => e.id).join(',')
      updateRoleMenus({ id: this.currentRole.id, menuIds: ids.toString() }).then(res => {
        callback()
        this.$Message.success('配置成功')
        this.loadData()
      }).catch(() => { closeLoading() })
    },
    ok (data, callback, closeLoading) {
      if (data.id) {
        roleUpdate(data).then(() => {
          callback()
          this.$Message.success('修改成功')
          this.loadData()
        }).catch(() => { closeLoading() })
      } else {
        roleAdd(data).then(() => {
          callback()
          this.$Message.success('新增成功')
          this.loadData()
        }).catch(() => { closeLoading() })
      }
    },
    editMenu (params) {
      this.currentRole = { id: params.row.id, name: params.row.name }
      this.showMenu = true
    },
    view (params) {
      const { id, name } = params.row
      roleView(id).then(res => {
        this.viewData = { name }
        this.menus = res.menus
        this.showView = true
      })
    }
  }
}
</script>
