<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <PointEdit v-model="showEdit" :point-id="pointId" :language="language" @success="loadData" :action-options="actionOptions" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { pointRemove } from '@/api/trade/point'

import PointEdit from './Edit'

export default {
  components: { PointEdit },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', click: (params) => this.remove(params) }]
    const columns = [
      { title: '点位名称', key: 'targetName' },
      { title: '项目名称', key: 'projectName' },
      { title: '简称', key: 'nickName' },
      { title: '点位分类', key: 'classifysName' },
      { title: '点位标签', key: 'labelName' },
      { title: '点位显示层级', key: 'displayRank' },
      { title: '操作类型', render: (h, params) => this.$ColumnDictText(h, params.row.action, this.actionOptions) },
      { title: '点位图标', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.targetIcon } }) },
      { title: '语言', width: 100, key: 'languagesName' }]
    return {
      url: '/manage/projectTarget/list',
      showEdit: false,
      pointId: 0,
      language: 0,
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.pointId = 0; this.language = 0; this.showEdit = true }, icon: 'md-add', name: '新增点位' }],
      actions,
      columns,
      actionOptions: [{ value: 1, label: '查详情' }, { value: 2, label: '无操作' }]
    }
  },
  created () {
    this.queryForms.push({ title: '项目', key: 'projectId', type: 'project' })
    this.queryForms.push({ title: '点位名称', key: 'targetName' })
    this.queryForms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions })
  },
  methods: {
    loadData () {
      this.pointId = 0
      this.$refs['view-page'].loadData()
    },
    update (params) {
      this.pointId = params.row.id
      this.language = params.row.language
      this.showEdit = true
    },
    remove (params) {
      pointRemove(params.row.id).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
