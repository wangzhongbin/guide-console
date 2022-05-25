<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <RoleView v-model="showView" :data="viewData" :menus="menus" />
    <RoleEdit v-model="showEdit" :role-id="roleId" @success="loadData" />
    <!-- <EditModal :title="data.id ? '修改角色' : '新增角色'" :forms="forms" :edit-data="editData" @ok="ok" v-model="showEdit">
    <div class="group-box border-top">
      <div class="box ">菜单选择</div>
      <Tree ref="menu-tree" :data="menuTree" show-checkbox multiple />
    </div>
  </EditModal> -->
    <!-- <EditModal width="550" :title="editData.id ? '修改角色' : '新增角色'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
    <EditModal width="550" :title="'正在为 ' + currentRole.name + ' 角色配置菜单'" @ok="saveRoleMenu" v-model="showMenu">
      <RoleMenu ref="role-menu" :role-id="currentRole.id" />
    </EditModal> -->
  </div>
</template>
<script>

import { roleView } from '@/api/sys/role'

// import { loadMenus } from '@/api/sys/menu'

import RoleEdit from './Edit'
// import RoleMenu from './RoleMenu'
import RoleView from './View'

// import MenuTreeTitle from './MenuTreeTitle'

export default {
  // components: { RoleView, RoleMenu },
  components: { RoleEdit, RoleView },
  data () {
    const actions = [
      { button: 'update', click: (params) => this.update(params) },
      { button: 'remove', fun: 'remove' },
      { button: 'view', click: (params) => this.view(params) }]
    const columns = [{ title: '角色名称', key: 'roleName' }]
    return {
      url: '/manage/role/list',
      showEdit: false,
      roleId: 0,
      // editData: {},
      showView: false,
      viewData: {},
      // showMenu: false,
      // currentRole: {},
      // editForms: [],
      menus: [],
      queryForms: [{ title: '角色名称', key: 'roleName' }],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增角色' }],
      actions,
      columns
    }
  },
  created () {
    // loadMenus().then(res => {
    //   console.log(this.assembleTree(res.data, []))
    // })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    // assembleTree (nodes, roleMenuIds) {
    //   return nodes.map(e => {
    //     e.expand = true
    //     e.checked = roleMenuIds.some(id => e.id === id)
    //     e.render = (h, { root, node, data }) => h(MenuTreeTitle, { props: { node: data } })
    //     const children = e.children
    //     if (children && children.length > 0) {
    //       e.children = this.assembleTree(children, roleMenuIds)
    //     }
    //     return e
    //   })
    // },
    update (params) {
      this.roleId = params.row.roleId
      this.showEdit = true
    },
    // saveRoleMenu (callback, closeLoading) {
    //   const roleMenus = this.$refs['role-menu'].getRoleMenus()
    //   const ids = roleMenus.map(e => e.id).join(',')
    //   updateRoleMenus({ id: this.currentRole.id, menuIds: ids.toString() }).then(res => {
    //     callback()
    //     this.$Message.success('配置成功')
    //     this.loadData()
    //   }).catch(() => { closeLoading() })
    // },
    // ok (data, callback, closeLoading) {
    //   if (data.id) {
    //     roleUpdate(data).then(() => {
    //       callback()
    //       this.$Message.success('修改成功')
    //       this.loadData()
    //     }).catch(() => { closeLoading() })
    //   } else {
    //     roleAdd(data).then(() => {
    //       callback()
    //       this.$Message.success('新增成功')
    //       this.loadData()
    //     }).catch(() => { closeLoading() })
    //   }
    // },
    // editMenu (params) {
    //   this.currentRole = { id: params.row.id, name: params.row.name }
    //   this.showMenu = true
    // },
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
