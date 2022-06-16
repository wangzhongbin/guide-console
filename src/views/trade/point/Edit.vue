<template>
  <EditModal :title="data.id ? '修改点位' : '新增点位'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show" />
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
    language: Number,
    projectOptions: Array,
    actionOptions: Array
  },
  data () {
    return {
      positions: [],
      data: { language: 1 },
      forms: []
    }
  },
  watch: {
    pointId (val) {
      this.data = {}
      if (val) {
        pointView({ targetId: val, language: this.language }).then(res => {
          const point = res.data
          point.audio = point.audio ? point.audio.name : ''
          point.video = point.video ? point.video.name : ''
          point.image = point.image ? point.image.map(e => e.name).join(',') : ''
          this.data = point
        })
      }
    },
    projectOptions (val) {
      this.forms.push({ title: '项目', key: 'projectId', type: 'select', options: val, required: true, span: 2 })
      this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions, required: true, span: 2 })
      this.forms.push({ title: '分类', key: 'targetClassify', type: 'classify', required: true, span: 1 })
      this.forms.push({ title: '点位标签', key: 'targetLabel', type: 'label', span: 1 })
      this.forms.push({ title: '点位名称', key: 'targetName', required: true, span: 2 })
      this.forms.push({ title: '简称', key: 'nickName', required: true, span: 2 })
      this.forms.push({ title: '操作类型', key: 'action', type: 'select', options: this.actionOptions, required: true, span: 2 })
      this.forms.push({ title: '楼层', key: 'targetFloor', type: 'int', span: 2 })
      this.forms.push({ title: '显示层级', key: 'displayRank', type: 'int', required: true, span: 2 })
      this.forms.push({ title: '点位详情', key: 'targetDesc', type: 'textarea', required: true, span: 1 })
      this.forms.push({ title: '点位图标', key: 'targetIcon', type: 'file', fileType: 1, span: 1, required: true })
      this.forms.push({ title: '语音', key: 'audio', type: 'file', fileType: 2, span: 1 })
      this.forms.push({ title: '视频', key: 'video', type: 'file', fileType: 3, span: 1 })
      this.forms.push({ title: '图片', key: 'image', type: 'file', fileType: 1, span: 1, multiple: true })
      this.forms.push({ title: '点位坐标', key: 'targetLocation', type: 'map', mapId: 'pointMap', required: true })
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
      data.audio = data.audio ? { name: data.audio, duration: 0 } : {}
      data.video = data.video ? { name: data.video, duration: 0 } : {}
      data.image = data.image ? data.image.split(',').map(e => { return { name: e, resourceCategory: 1 } }) : []
      if (data.id) {
        data.targetId = data.id
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
