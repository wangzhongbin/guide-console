<template>
  <EditModal :title="data.id ? '修改线路' : '新增线路'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">

  </EditModal>
</template>
<script>

import { lineEdit } from '@/api/trade/line'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    data: Object,
    typeOptions: Array
  },
  data () {
    return {
      forms: []
    }
  },
  created () {
    this.forms.push({ title: '项目', key: 'projectId', type: 'project', required: true, span: 2 })
    this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions, required: true, span: 2 })
    this.forms.push({ title: '线路名称', key: 'lineName', required: true, span: 2 })
    this.forms.push({ title: '线路类型', key: 'lineType', type: 'select', options: this.typeOptions, required: true, span: 2 })
    this.forms.push({ title: '线路概要', key: 'lineSummary', required: true, span: 2 })
    this.forms.push({ title: '排序', key: 'lineSort', type: 'int', required: true, span: 2 })
    this.forms.push({ title: '途径景点', key: 'linePoint', type: 'point', required: true, span: 1 })
    this.forms.push({ title: '线路简介', key: 'lineDesc', type: 'textarea', required: true, span: 1 })
    this.forms.push({ title: '线路路径', key: 'linePath', type: 'map', isLine: true, mapId: 'lineMap', required: true })
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      lineEdit(data).then(() => {
        callback()
        this.$Message.success('修改成功')
        this.$emit('success')
      }).catch(() => { closeLoading() })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
