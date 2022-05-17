<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="editData.id ? '修改字典数据' : '新增字典数据'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import { dictAdd, dictUpdate, loadGroups } from '@/api/sys/dict'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', fun: 'remove' }]
    const columns = [
      { title: '字典名称', key: 'label' },
      { title: '字典数据', key: 'value' },
      { title: '分组代码', key: 'groupCode' },
      { title: '分组名称', key: 'groupName' }]
    return {
      group: 'DICT',
      showEdit: false,
      editData: {},
      editForms: [],
      queryForms: [],
      groups: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增数据' }],
      actions,
      columns
    }
  },
  created () {
    loadGroups().then(res => {
      this.groups = res.list
      this.queryForms.push({ title: '分组', type: 'select', key: 'groupCode', options: res.list })
      this.queryForms.push({ title: '字典名称', key: 'label' })
      this.editForms.push({ title: '字典名称', key: 'label', required: true })
      this.editForms.push({ title: '字典数据', key: 'value', required: true })
      this.editForms.push({ title: '分组', type: 'select', key: 'groupCode', options: res.list, required: true })
    })
  },
  methods: {
    ok (fromData, callback, closeLoading) {
      fromData.groupName = this.groups.find(e => e.value === fromData.groupCode).label
      if (fromData.id) {
        dictUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        dictAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      this.editData = {
        id: params.row.id,
        label: params.row.label,
        value: params.row.value,
        groupCode: params.row.groupCode,
        groupName: params.row.groupName
      }
      this.showEdit = true
    }
  }
}
</script>
