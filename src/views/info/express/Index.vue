<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改快递' : '新增快递'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import { expressAdd, expressUpdate, expressPaused } from '@/api/info/express'

export default {
  data () {
    const actions = [
      { type: 'success', name: '上架', poptip: true, click: (params) => this.pause(params, 0), checkDisabled: (params) => params.row.paused === 0 },
      { type: 'success', name: '下架', poptip: true, click: (params) => this.pause(params, 1), checkDisabled: (params) => params.row.paused === 1 },
      { button: 'update', click: (params) => { this.update(params) }, checkDisabled: (params) => params.row.paused === 0 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.paused === 0 }]
    const columns = [
      { title: '快递名称', key: 'name' },
      { title: '状态', width: 80, render: (h, params) => h('span', params.row.paused === 0 ? '上架' : '下架') }]
    return {
      group: 'EXPRESS',
      showEdit: false,
      editData: {},
      queryForms: [{ title: '快递名称', key: 'name' }],
      editForms: [{ title: '快递名称', key: 'name', span: 1, required: true }],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增快递' }],
      actions,
      columns
    }
  },
  created () {
  },
  methods: {
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      if (data.id) {
        expressUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        expressAdd(data).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      this.editData = {
        id: params.row.id,
        name: params.row.name
      }
      this.showEdit = true
    },
    pause (params, paused) {
      expressPaused({ id: params.row.id, paused }).then(() => {
        this.$Message.success(paused === 0 ? '上架成功' : '下架成功')
        this.$refs['view-page'].loadData()
      })
    }
  }
}
</script>
