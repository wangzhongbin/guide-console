<template>
  <EditModal :title="data.id ? '修改角色' : '新增角色'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
    <div class="group-box border-top">
      <div class="box ">菜单选择</div>
      <Tree ref="menu-tree" :data="menuTree" show-checkbox multiple />
    </div>
  </EditModal>
</template>
<script>

import { roleView, roleUpdate, roleAdd } from '@/api/sys/role'

import { loadMenus } from '@/api/sys/menu'

import MenuTreeTitle from './MenuTreeTitle'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    roleId: Number
  },
  data () {
    return {
      data: {},
      menuTree: [],
      forms: []
    }
  },
  watch: {
    roleId (val) {
      this.data = {}
      if (val) {
        Promise.all([loadMenus(), roleView(val)]).then(res => {
          const menus = res[0].data
          const role = res[1].data
          this.data = role
          const menuTree = this.assembleTree(menus, role.menuIds)
          this.menuTree = menuTree
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '角色名称', key: 'roleName', required: true, span: 1 })
  },
  methods: {
    assembleTree (nodes, roleMenuIds) {
      return nodes.map(e => {
        e.expand = true
        e.checked = roleMenuIds.some(id => e.id === id)
        e.render = (h, { root, node, data }) => h(MenuTreeTitle, { props: { node: data } })
        const children = e.children
        if (children && children.length > 0) {
          e.children = this.assembleTree(children, roleMenuIds)
        }
        return e
      })
    },
    getRoleMenus () {
      return this.$refs['menu-tree'].getCheckedAndIndeterminateNodes()
    },
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      const roleMenus = this.getRoleMenus()
      data.menuIds = roleMenus.map(e => e.id)
      console.log(data)
      if (data.userId) {
        roleUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        roleAdd(data).then(res => {
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
