<template>
  <EditModal :title="data.id ? '修改项目' : '新增项目'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
  </EditModal>
</template>
<script>

import { pointView, pointAdd, pointUpdate } from '@/api/trade/point'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    pointId: Number,
    projectOptions: Array,
    classifyOptions: Array,
    languageOptions: Array
  },
  data () {
    return {
      data: {},
      forms: []
    }
  },
  watch: {
    projectId (val) {
      this.data = {}
      if (val) {
        pointView(val).then(res => {
          this.data = res.data
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '项目', key: 'projectId', type: 'select', options: this.projectOptions, span: 2 })
    this.forms.push({ title: '分类', key: 'targetClassify', type: 'select', options: this.classifyOptions, span: 2 })

    this.forms.push({ title: '点位名称', key: 'targetName', required: true, span: 2 })
    this.forms.push({ title: '简称', key: 'nickName', type: 'select', options: this.typeOptions, required: true, span: 2 })
    this.forms.push({ title: '点位图标', key: 'targetIcon', type: 'file', fileType: 1, span: 1, required: true })

    this.forms.push({ title: '点位坐标', key: 'targetLocation', required: true, span: 2 })
    this.forms.push({ title: '点位标签', key: 'targetLabel', required: true, span: 2 })
    this.forms.push({ title: '楼层', key: 'targetFloor', type: 'int', required: true, span: 3 })
    this.forms.push({ title: '显示层级', key: 'displayRank', type: 'int', required: true, span: 3 })
    this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.languageOptions, required: true, span: 2 })
    this.forms.push({ title: '点位详情介绍', key: 'mapUrl', required: true, span: 1 })
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      if (data.id) {
        pointUpdate(data).then(() => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        pointAdd(data).then(() => {
          callback()
          this.$Message.success('新增成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
