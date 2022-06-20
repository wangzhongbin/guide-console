<template>
  <EditModal :title="data.id ? '修改项目' : '新增项目'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
  </EditModal>
</template>
<script>

import { projectAdd, projectUpdate } from '@/api/trade/project'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    data: Object,
    typeOptions: Array,
    mapTypeOptions: Array
  },
  computed: {
    multiTenant: (me) => me.$store.state.account.multiTenant,
    tenants: (me) => me.$store.state.account.tenants
  },
  data () {
    return {
      forms: []
    }
  },
  created () {
    if (this.multiTenant) {
      this.forms.unshift({ title: '租户', key: 'tenantId', type: 'select', options: this.tenants, required: true, span: 1 })
    }
    this.forms.push({ title: '项目名称', key: 'projectName', required: true, span: 2 })
    this.forms.push({ title: '行业类型', key: 'projectType', type: 'radio', options: this.typeOptions, required: true, span: 2 })
    this.forms.push({ title: '所在地', key: 'placeCode', type: 'place', level: 3, required: true, span: 2 })
    this.forms.push({ title: '地图类型', key: 'mapShowType', type: 'radio', options: this.mapTypeOptions, required: true, span: 2 })
    this.forms.push({ title: '运营时间', key: 'openingHours', span: 2 })
    this.forms.push({ title: '热线电话', key: 'hotline', span: 2 })
    this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions, required: true, span: 2 })
    this.forms.push({ title: '地址', key: 'address', required: true, span: 2 })
    this.forms.push({ title: '项目logo', key: 'projectLogo', type: 'file', fileType: 1, span: 1, required: true })
    this.forms.push({ title: '语音介绍', key: 'voiceExplain', type: 'file', fileType: 2, span: 1 })
    this.forms.push({ title: '地图地址', key: 'mapUrl', span: 1 })
    this.forms.push({ title: '详情描述', key: 'details', type: 'textarea', span: 1 })
    this.forms.push({ line: true, title: '安卓端地图参数设置', show: () => true })
    this.forms.push({ title: '默认层级', key: 'androidDefaultRank', type: 'int', span: 3 })
    this.forms.push({ title: '最大层级', key: 'androidMaxRank', type: 'int', span: 3 })
    this.forms.push({ title: '最小层级', key: 'androidMinRank', type: 'int', span: 3 })
    this.forms.push({ line: true, title: '小程序端地图参数设置', show: () => true })
    this.forms.push({ title: '默认层级', key: 'appletDefaultRank', type: 'int', span: 3 })
    this.forms.push({ title: '最大层级', key: 'appletMaxRank', type: 'int', span: 3 })
    this.forms.push({ title: '最小层级', key: 'appletMinRank', type: 'int', span: 3 })
    this.forms.push({ line: true, title: '地图范围坐标', show: () => true })
    this.forms.push({ title: '中心点', key: 'centerPoint', mapId: 'centerPointMap', type: 'map', required: true, span: 1 })
    setTimeout(() => this.forms.push({ title: '左上角', key: 'topLeftCorner', mapId: 'topLeftCornerMap', type: 'map', required: true, span: 1 }), 1000)
    setTimeout(() => this.forms.push({ title: '右下角', key: 'lowerRightCorner', mapId: 'lowerRightCornerMap', type: 'map', required: true, span: 1 }), 2000)
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      const codes = fromData.placeCode.split(',')
      data.provinceCode = codes[0]
      data.cityCode = codes[1]
      data.areaCode = codes[2]
      delete data.placeCode
      if (data.projectId) {
        projectUpdate(data).then(() => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        projectAdd(data).then(() => {
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
