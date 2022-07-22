<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="500" :title="editData.id ? '修改标签' : '新增标签'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import { labelView, labelAdd, labelUpdate, labelRemove } from '@/api/trade/label'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', click: (params) => this.remove(params) }]
    const columns = [
      { title: '项目名称', key: 'projectName' },
      { title: '标签名称', key: 'labelName' },
      { title: '语言', width: 100, render: (h, params) => this.$ColumnLanguageText(h, params.row.language) }]
    return {
      url: '/manage/label/list',
      showEdit: false,
      editData: {},
      editForms: [],
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增标签' }],
      actions,
      columns
    }
  },
  created () {
    this.queryForms.push({ title: '项目', key: 'projectId', type: 'project' })
    this.queryForms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions })

    this.editForms.push({ title: '项目', key: 'projectId', type: 'project', required: true })
    this.editForms.push({ title: '标签名称', key: 'labelName', required: true })
    this.editForms.push({ title: '语言', type: 'select', key: 'language', required: true, options: this.$LanguageOptions })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        labelUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        labelAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      labelView(params.row.id).then(res => {
        this.editData = res.data
        this.showEdit = true
      })
    },
    remove (params) {
      labelRemove(params.row.id).then(() => {
        this.$Message.success('注销成功')
        this.loadData()
      })
    }
  }
}
</script>
