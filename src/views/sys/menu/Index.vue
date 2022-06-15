<template>
  <div>
    <!-- <ViewPage ref="view-page" :group="group" :query-forms="queryForms" :columns="columns" :actions="actions" /> -->
    <Row>
      <div class="inline-box">
        <Tooltip content="刷新数据" class="box">
          <Button shape="circle" class="box" icon="md-sync" @click="loadData" />
        </Tooltip>
        <div class="box">
          <Button type="primary" @click="showEdit = true" icon="md-add">新增用户</Button>
        </div>
      </div>
    </Row>
    <Row>
      <Table row-key="id" :indent-size="32" border :columns="columns" :data="menus"></Table>
    </Row>
  </div>
</template>
<script>

import ColumnName from './ColumnName'

import { loadMenus } from '@/api/sys/menu'

export default {
  data () {
    return {
      showEdit: false,
      menus: [],
      columns: []
    }
  },
  created () {
    const columns = [{
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
        this.menus = this.assembleTableTree(res.data)
      })
    },
    assembleTableTree (nodes) {
      return nodes.map(e => {
        e.title = e.label
        if (e.children && e.children.length > 0) {
          e.expand = true
          e._showChildren = true
          e.children = this.assembleTree(e.children)
        }
        return e
      })
    }
  }
}
</script>
