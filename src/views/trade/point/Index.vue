<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改分类' : '新增分类'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
    <PointEdit v-model="showEdit" :point-id="pointId" @success="loadData" :project-options="projectOptions" :classify-options="classifyOptions" :language-options="languageOptions" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { loadProjects } from '@/api/trade/project'

import { loadClassifys } from '@/api/trade/classify'

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
      { title: '简称', key: 'nickName' },
      { title: '点位分类', key: 'targetClassify' },
      { title: '点位标签', key: 'targetLabel' },
      { title: '楼层', key: 'targetFloor' },
      { title: '点位显示层级', key: 'displayRank' },
      { title: '点位图标', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.targetIcon } }) },
      { title: '语言', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.language, this.languageOptions) }]
    return {
      url: '/manage/point/list',
      showEdit: false,
      pointId: 0,
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.pointId = 0; this.showEdit = true }, icon: 'md-add', name: '新增点位' }],
      actions,
      columns,
      projectOptions: [],
      classifyOptions: [],
      languageOptions: [{ value: 1, label: '中文' }, { value: 2, label: '英文' }, { value: 3, label: '俄文' }, { value: 4, label: '日文' }, { value: 5, label: '韩文' }]
    }
  },
  created () {
    Promise.all([loadProjects(), loadClassifys()]).then(res => {
      const projects = res[0].data && res[0].data.length > 0 ? res[0].data.map(e => { return { value: e.projectId + '', label: e.projectName } }) : []
      const classifys = res[1].data && res[1].data.length > 0 ? res[1].data.map(e => { return { value: e.classifyId + '', label: e.classifyName } }) : []
      this.projectOptions = projects
      this.classifyOptions = classifys
      this.queryForms.push({ title: '项目', key: 'projectId', type: 'select', options: projects })
      this.queryForms.push({ title: '分类', key: 'classifyId', type: 'select', options: classifys })
      this.queryForms.push({ title: '点位名称', key: 'targetName' })
      this.queryForms.push({ title: '语言', key: 'language', type: 'select', options: this.languageOptions })
    })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      this.pointId = params.row.id
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
