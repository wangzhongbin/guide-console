<template>
  <EditModal :title="data.id ? '修改点位' : '新增点位'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
    <MapView :positions="positions" />
    <div class="group-box" v-show="items.length > 0">
      <div class="box" v-for="(item, index) in items" :key="index">
        <div class="box inline-box">
          <Poptip transfer confirm title="确认删除?" @on-ok="delItem(index)">
            <Button type="error">删除</Button>
          </Poptip>
          <div class="text-title-small text-center" style="width:80px">素材{{index + 1}}</div>
          <RadioGroup transfer v-model="item.resourceType">
            <Radio border :label="1">图片</Radio>
            <Radio border :label="2">语音</Radio>
            <Radio border :label="3">视频</Radio>
          </RadioGroup>
        </div>
        <div class="box" v-show="item.resourceType" style="padding-left: 140px;">
          <MediaUploadPoint :type="item.resourceType" v-model="items[index]" />
        </div>
        <Divider />
      </div>
    </div>
    <div class="group-box">
      <Button type="success" @click="addItem">新增素材</Button>
    </div>
  </EditModal>
</template>
<script>

import MapView from '@/components/ui/MapView'

import { pointView, pointAdd, pointUpdate } from '@/api/trade/point'

import MediaUploadPoint from './MediaUploadPoint'

export default {
  components: { MediaUploadPoint, MapView },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    pointId: Number,
    language: Number,
    projectOptions: Array
  },
  data () {
    return {
      positions: [],
      data: { language: 1 },
      forms: [],
      items: []
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.positions = [{ lng: 120.748226, lat: 30.759518 }]
      }
    },
    pointId (val) {
      this.data = {}
      this.items = []
      if (val) {
        pointView({ targetId: val, language: this.language }).then(res => {
          this.data = res.data
        })
      }
    },
    projectOptions (val) {
      this.forms.push({ title: '项目', key: 'projectId', type: 'select', options: val, required: true, span: 2 })
      this.forms.push({ title: '语言', key: 'language', type: 'select', options: this.$LanguageOptions, required: true, span: 2 })
      this.forms.push({ title: '点位名称', key: 'targetName', required: true, span: 2 })
      this.forms.push({ title: '简称', key: 'nickName', type: 'select', options: this.typeOptions, required: true, span: 2 })
      this.forms.push({ title: '分类', key: 'targetClassify', type: 'classify', required: true, span: 2 })
      this.forms.push({ title: '点位标签', key: 'targetLabel', type: 'label', required: true, span: 2 })
      this.forms.push({ title: '楼层', key: 'targetFloor', type: 'int', required: true, span: 2 })
      this.forms.push({ title: '显示层级', key: 'displayRank', type: 'int', required: true, span: 2 })
      this.forms.push({ title: '点位详情', key: 'targetDesc', type: 'textarea', required: true, span: 1 })
      this.forms.push({ title: '点位图标', key: 'targetIcon', type: 'file', fileType: 1, span: 1, required: true })
      this.forms.push({ title: '点位坐标', key: 'targetLocation', required: true, span: 2 })
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
      data.resources = this.items.map(e => e)
      console.log(data)
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
