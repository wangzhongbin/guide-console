<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="editData.id ? '修改轮播图' : '新增轮播图'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { swiperAdd, swiperUpdate, swiperPaused } from '@/api/info/swiper'

export default {
  data () {
    const actions = [
      { type: 'success', name: '启用', poptip: true, click: (params) => this.pause(params, 0), checkDisabled: (params) => params.row.paused === 0 },
      { type: 'success', name: '停用', poptip: true, click: (params) => this.pause(params, 1), checkDisabled: (params) => params.row.paused === 1 },
      { button: 'update', click: (params) => { this.update(params) }, checkDisabled: (params) => params.row.paused === 0 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.paused === 0 }]
    const columns = [
      { title: '商品编号', key: 'goodsCode' },
      { title: '轮播图', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.image } }) },
      { title: '排序', key: 'sort' },
      { title: '状态', render: (h, params) => h('span', params.row.paused === 0 ? '启用' : '停用') }]
    return {
      group: 'SWIPER',
      showEdit: false,
      editData: {},
      queryForms: [{ title: '商品编号', key: 'goodsCode' }],
      editForms: [
        { title: '商品编号', key: 'goodsCode', required: true },
        { title: '排序', key: 'sort', type: 'number', required: true },
        { title: '轮播图', key: 'image', type: 'file', required: true }],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增轮播图' }],
      actions,
      columns
    }
  },
  methods: {
    ok (fromData, callback, closeLoading) {
      if (fromData.id) {
        swiperUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        swiperAdd(fromData).then(res => {
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
      swiperPaused({ id: params.row.id, paused }).then(() => {
        this.$Message.success(paused === 0 ? '启用成功' : '停用成功')
        this.$refs['view-page'].loadData()
      })
    }
  }
}
</script>
