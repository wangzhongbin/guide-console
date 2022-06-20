<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改参数' : '新增参数'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" width="600" />
  </div>
</template>
<script>

import { programAdd, programUpdate, programRemove } from '@/api/sys/program'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', click: (params) => this.remove(params) }]
    const columns = [
      { title: '项目名称', key: 'projectName' },
      { title: 'appid', key: 'appid' },
      { title: '类型', render: (h, params) => this.$ColumnDictText(h, params.row.type, this.typeOptions) }]
    return {
      url: '/manage/wxParams/list',
      showEdit: false,
      editData: {},
      editForms: [],
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增参数' }],
      actions,
      columns,
      typeOptions: [{ value: 1, label: '小程序' }, { value: 2, label: '公众号' }]
    }
  },
  created () {
    this.queryForms.push({ title: '项目', key: 'projectId', type: 'project' })

    this.editForms.push({ title: '项目', key: 'projectId', type: 'project', required: true })
    this.editForms.push({ title: 'appId', key: 'appid', required: true })
    this.editForms.push({ title: 'appSecret', key: 'appsecret', required: true })
    this.editForms.push({ title: '类型', key: 'type', type: 'select', required: true, options: this.typeOptions })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        programUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        programAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      this.editData = params.row
      this.showEdit = true
    },
    remove (params) {
      programRemove(params.row.id).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
