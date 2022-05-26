<template>
  <div>
    <Table row-key="id" :indent-size="32" border :columns="columns" :data="menuTree" v-if="menuTree && menuTree.length > 0" />
    <div v-else class="inline-box text-info">
      <Icon type="md-information-circle" class="item-box" />
      <div class="item-box">暂无菜单信息</div>
    </div>
  </div>
</template>
<script>

import ColumnName from './ColumnName'

import { loadMenus } from '@/api/sys/menu'

export default {
  props: {
    menuIds: Array
  },
  computed: {
    menuTree () {
      if (this.menuIds && this.menuIds.length > 0) {
        const { menus, menuIds } = this
        const menuTree = this.assembleTree(menus, menuIds)
        return menuTree
      } else {
        return []
      }
    }
  },
  data () {
    return {
      columns: [],
      menus: []
    }
  },
  created () {
    const columns = [
      {
        title: '菜单名称',
        key: 'title',
        tree: true,
        align: 'left',
        render: (h, params) => h(ColumnName, { props: { row: params.row } })
      }]
    this.columns = this.$TableColumns(columns)
    loadMenus().then(res => {
      this.menus = res.data
    })
  },
  methods: {
    assembleTree (menus, menuIds = []) {
      return menus.filter(e => menuIds.includes(e.id)).map(e => {
        if (e.children && e.children.length > 0) {
          e._showChildren = false
          e.children = this.assembleTree(e.children, menuIds)
        }
        return e
      })
    }
  }
}
</script>
