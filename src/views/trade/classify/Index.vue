<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改分类' : '新增分类'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { loadProjects } from '@/api/trade/project'

import { classifyView, classifyAdd, classifyUpdate, classifyRemove } from '@/api/trade/classify'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', click: (params) => this.remove(params) }]
    const columns = [
      { title: '分类名称', key: 'classifyName' },
      { title: '排序', width: 100, key: 'sortNum' },
      { title: '分类图标', render: (h, params) => h(MediaShow, { props: { src: params.row.classifyLogoUrl } }) },
      { title: '分类选中图标', render: (h, params) => h(MediaShow, { props: { src: params.row.selectLogoUrl } }) },
      { title: '语言', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.language, this.languageOptions) }]
    return {
      url: '/manage/classify/list',
      showEdit: false,
      editData: {},
      editForms: [],
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增分类' }],
      actions,
      columns,
      languageOptions: [{ value: 1, label: '中文' }, { value: 2, label: '英文' }, { value: 3, label: '俄文' }, { value: 4, label: '日文' }, { value: 5, label: '韩文' }]
    }
  },
  created () {
    loadProjects().then(res => {
      const projects = res.data && res.data.length > 0 ? res.data.map(e => { return { value: e.projectId + '', label: e.projectName } }) : []
      this.queryForms.push({ title: '项目', key: 'projectId', type: 'select', options: projects })
      this.queryForms.push({ title: '分类名称', key: 'classifyName' })
      this.queryForms.push({ title: '语言', key: 'language', type: 'select', options: this.languageOptions })

      this.editForms.push({ title: '项目', key: 'projectId', type: 'select', options: projects, span: 2 })
      this.editForms.push({ title: '分类名称', key: 'classifyName', required: true, span: 2 })
      this.editForms.push({ title: '排序', type: 'number', key: 'sortNum', required: true, span: 2 })
      this.editForms.push({ title: '语言', type: 'select', key: 'language', required: true, span: 2, options: this.languageOptions })
      this.editForms.push({ title: '分类图标', key: 'classifyLogo', type: 'file', fileType: 1, span: 2, required: true })
      this.editForms.push({ title: '选中图标', key: 'selectLogo', type: 'file', fileType: 1, span: 2, required: true })
    })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        classifyUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        classifyAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      classifyView(params.row.id).then(res => {
        this.editData = res.data
        this.showEdit = true
      })
    },
    remove (params) {
      classifyRemove(params.row.id).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
