<template>
  <div style="padding: 0 32px;">
    <Tree ref="menu-tree" :data="menuTree" show-checkbox multiple />
  </div>
</template>
<script>

import { roleView } from '@/api/sys/role'

import { loadMenus } from '@/api/sys/menu'

import MenuTreeTitle from './MenuTreeTitle'

export default {
  props: {
    roleId: [Number, String]
  },
  data () {
    return {
      menuTree: []
    }
  },
  watch: {
    roleId (val) {
      this.menuTree = []
      if (val) {
        Promise.all([loadMenus(), roleView(val)]).then(res => {
          const menus = res[0].list
          const roleMenuIds = res[1].menus.filter(e => e.level === 2).map(e => e.id)
          this.menuTree = this.assembleTree(menus.filter(e => e.level === 1), menus, roleMenuIds)
        })
      }
    }
  },
  methods: {
    assembleTree (nodes, menus, roleMenuIds) {
      return nodes.map(e => {
        e.expand = true
        e.checked = roleMenuIds.some(id => e.id === id)
        e.render = (h, { root, node, data }) => h(MenuTreeTitle, { props: { node: data } })
        const children = menus.filter(m => m.parentId === e.id)
        if (children && children.length > 0) {
          e.children = this.assembleTree(children, menus, roleMenuIds)
        }
        return e
      })
    },
    getRoleMenus () {
      return this.$refs['menu-tree'].getCheckedAndIndeterminateNodes()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
