<template>
  <EditModal :title="data.id ? '修改线路' : '新增线路'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">

  </EditModal>
</template>
<script>

import { lineView, lineEid } from '@/api/trade/line'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    lineId: Number,
    typeOptions: Array,
    projectOptions: Array
  },
  data () {
    return {
      data: {},
      forms: []
    }
  },
  watch: {
    lineId (val) {
      this.data = {}
      if (val) {
        lineView({ id: val }).then(res => {
          this.data = res.data
        })
      }
    },
    projectOptions (val) {
      this.forms.push({ title: '项目', key: 'projectId', type: 'select', options: val, required: true, span: 2 })
      this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions, required: true, span: 2 })
      this.forms.push({ title: '线路名称', key: 'lineName', required: true, span: 2 })
      this.forms.push({ title: '线路类型', key: 'lineType', type: 'select', options: this.typeOptions, required: true, span: 2 })
      this.forms.push({ title: '线路概要', key: 'lineSummary', required: true, span: 2 })
      this.forms.push({ title: '排序', key: 'lineSort', type: 'int', required: true, span: 2 })
      this.forms.push({ title: '线路简介', key: 'lineDesc', type: 'textarea', required: true, span: 1 })
      this.forms.push({ title: '线路路径', key: 'linePath', required: true, span: 1 })
    }
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    addItem () {
      this.items.push({ resourceType: 0 })
    },
    delItem (index) {
      this.items.splice(index, 1)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      lineEid(data).then(() => {
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
