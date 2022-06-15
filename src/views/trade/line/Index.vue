<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <lineEdit v-model="showEdit" :line-id="lineId" @success="loadData" :project-options="projectOptions" :type-options="typeOptions" />
  </div>
</template>
<script>

import { loadProjects } from '@/api/trade/project'

import { lineRemove } from '@/api/trade/line'

import lineEdit from './Edit'

export default {
  components: { lineEdit },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', click: (params) => this.remove(params) }]
    const columns = [
      { title: '线路名称', key: 'lineName' },
      { title: '经过景点', key: 'linePointName' },
      { title: '线路摘要', key: 'lineSummary' },
      { title: '线路类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.lineType, this.typeOptions) },
      { title: '语言', width: 100, key: 'lanName' },
      { title: '线路简介', key: 'lineDesc' }]
    return {
      url: '/manage/touringLine/list',
      showEdit: false,
      lineId: 0,
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.lineId = 0; this.showEdit = true }, icon: 'md-add', name: '新增线路' }],
      actions,
      columns,
      typeOptions: [{ value: 0, label: '普通线路' }, { value: 1, label: '绿道' }],
      projectOptions: []
    }
  },
  created () {
    loadProjects().then(res => {
      const projects = res.data && res.data.length > 0 ? res.data.map(e => { return { value: e.projectId + '', label: e.projectName } }) : []
      this.projectOptions = projects
      this.queryForms.push({ title: '项目', key: 'projectId', type: 'select', options: projects })
      this.queryForms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions })
      this.queryForms.push({ title: '线路类型', key: 'lineType', type: 'select', options: this.typeOptions })
    })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      this.lineId = params.row.id
      this.showEdit = true
    },
    remove (params) {
      lineRemove(params.row.id).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
