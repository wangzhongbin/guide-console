<template>
  <div>
    <div class="t-max-height" :style="{maxHeight: showQuery ? '100px' : '0'}">
      <QueryForm :forms="queryForms" :query-data="queryData" @query="query" />
    </div>
    <Row>
      <div class="inline-box">
        <Tooltip :content="showQuery ? '隐藏搜索栏' : '显示搜索栏'" class="box">
          <Button shape="circle" :icon="showQuery ? 'md-eye' : 'md-eye-off'" @click="showQuery = !showQuery" />
        </Tooltip>
        <Tooltip content="刷新数据" class="box">
          <Button shape="circle" class="box" icon="md-sync" @click="refresh" />
        </Tooltip>
        <div class="box" v-for="(buttom, index) in buttons" :key="index">
          <Button :type="buttom.type" @click="buttom.fun" :icon="buttom.icon">{{buttom.name}}</Button>
        </div>
      </div>
    </Row>
    <Row>
      <Table border :columns="pageColumns" :data="list"></Table>
    </Row>
    <Row>
      <Page show-total show-sizer show-elevator :current.sync="paging.current" :total="paging.total" :page-size="paging.size" @on-change="loadData" />
    </Row>
  </div>
</template>
<script>

import { loadPage, commonDelete } from '@/api/common'

export default {
  props: {
    group: String,
    queryForms: Array,
    columns: Array,
    actions: {
      type: Array,
      default: () => ([])
    },
    buttons: Array
  },
  data () {
    return {
      showQuery: true,
      paging: { current: 1, size: 10, total: 0 },
      queryData: {},
      list: [],
      pageColumns: []
    }
  },
  created () {
    const pageActions = this.actions.map(e => {
      const action = { ...e }
      if (action.fun) {
        action.click = (params) => { this[action.fun](params, action.name) }
      }
      return action
    })
    this.pageColumns = this.$TableColumns(this.columns, pageActions)
    this.loadData()
  },
  methods: {
    refresh () {
      this.queryData = {}
      this.loadData()
    },
    query (data) {
      this.queryData = { ...data }
      this.loadData()
    },
    loadData () {
      const data = {
        current: this.paging.current,
        size: this.paging.size
      }
      Object.assign(data, this.queryData)
      loadPage(data, this.group).then(res => {
        this.paging.total = res.total
        this.list = res.list
      })
    },
    add () {
      this.$emit('on-add')
    },
    remove (params) {
      commonDelete({ id: params.row.id }, this.group).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
