<template>
  <div>
    <!-- <ViewPage ref="view-page" :group="group" :query-forms="queryForms" :columns="columns" :actions="actions" /> -->
    <Row>
      <div class="inline-box">
        <Tooltip content="刷新数据" class="box">
          <Button shape="circle" class="box" icon="md-sync" @click="loadData" />
        </Tooltip>
      </div>
    </Row>
    <Row>
      <Table row-key="id" :indent-size="32" border :columns="columns" :data="list"></Table>
    </Row>
  </div>
</template>
<script>

import ColumnName from './ColumnName'

import { loadMenus } from '@/api/sys/menu'

export default {
  data () {
    return {
      queryForms: [{ title: '菜单名称', key: 'title' }],
      list: [],
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
      { title: '等级', key: 'level', width: '80' },
      { title: '路由名称', key: 'code' },
      { title: '路由地址', key: 'path' },
      { title: '页面地址', key: 'component' }]
    this.columns = this.$TableColumns(columns)
    this.loadData()
  },
  methods: {
    loadData () {
      loadMenus().then(res => {
        const list = res.list
        this.list = this.assembleTree(list.filter(e => !e.parentId), list)
      })
    },
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
