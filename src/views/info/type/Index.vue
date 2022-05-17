<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="editData.id ? '修改商品类目' : '新增商品类目'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { typeAdd, typeUpdate, typePaused } from '@/api/info/type'

export default {
  data () {
    const actions = [
      { type: 'success', name: '启用', poptip: true, click: (params) => this.pause(params, 0), checkDisabled: (params) => params.row.paused === 0 },
      { type: 'success', name: '停用', poptip: true, click: (params) => this.pause(params, 1), checkDisabled: (params) => params.row.paused === 1 },
      { button: 'update', click: (params) => { this.update(params) }, checkDisabled: (params) => params.row.paused === 0 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.paused === 0 }]
    const columns = [
      { title: '类目名称', key: 'name' },
      { title: '排序', key: 'sort' },
      { title: '类目图标', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.icon } }) },
      { title: '状态', render: (h, params) => h('span', params.row.paused === 0 ? '启用' : '停用') }]
    return {
      group: 'GOODS_TYPE',
      showEdit: false,
      editData: {},
      queryForms: [{ title: '类目名称', key: 'name' }],
      editForms: [
        { title: '类目名称', key: 'name', required: true },
        { title: '排序', key: 'sort', type: 'number', required: true },
        { title: '类目图标', key: 'icon', type: 'file', required: true }],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增类目' }],
      actions,
      columns
    }
  },
  methods: {
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        typeUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        typeAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      this.editData = {
        id: params.row.id,
        name: params.row.name,
        icon: params.row.icon,
        sort: params.row.sort
      }
      this.showEdit = true
    },
    pause (params, paused) {
      typePaused({ id: params.row.id, paused }).then(() => {
        this.$Message.success(paused === 0 ? '启用成功' : '停用成功')
        this.$refs['view-page'].loadData()
      })
    }
  }
}
</script>
