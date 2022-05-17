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

export default {
  props: {
    menus: Array
  },
  computed: {
    menuTree () {
      if (this.menus && this.menus.length > 0) {
        const menus = this.menus
        const menuTree = this.assembleTree(menus.filter(e => !e.parentId), menus)
        return menuTree
      } else {
        return []
      }
    }
  },
  data () {
    return {
      columns: []
    }
  },
  created () {
    const columns = [
      {
        title: '菜单名称',
        key: 'title',
        width: '300',
        tree: true,
        align: 'left',
        render: (h, params) => h(ColumnName, { props: { row: params.row } })
      },
      { title: '路由地址', key: 'path' }]
    this.columns = this.$TableColumns(columns)
  },
  methods: {
    assembleTree (nodes, menus) {
      return nodes.map(e => {
        const children = menus.filter(m => m.parentId === e.id)
        if (children && children.length > 0) {
          e._showChildren = true
          e.children = this.assembleTree(children, menus)
        }
        return e
      })
    }
  }
}
</script>
