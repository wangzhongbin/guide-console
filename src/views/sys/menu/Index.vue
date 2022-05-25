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
        key: 'label',
        tree: true,
        align: 'left',
        render: (h, params) => h(ColumnName, { props: { row: params.row } })
      }]
    this.columns = this.$TableColumns(columns)
    this.loadData()
  },
  methods: {
    loadData () {
      loadMenus().then(res => {
        this.list = this.assembleTree(res.data)
      })
    },
    assembleTree (nodes) {
      return nodes.map(e => {
        if (e.children && e.children.length > 0) {
          e._showChildren = true
          e.children = this.assembleTree(e.children)
        }
        return e
      })
    }
  }
}
</script>
