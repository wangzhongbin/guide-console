<template>
  <div>
    <ViewPage ref="view-page" :group="group" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改商品' : '新增商品'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import { goodsTypes } from '@/api/info/type'
import { goodsAdd, goodsUpdate, goodsPaused, goodsChoice } from '@/api/info/goods'

export default {
  data () {
    const actions = [
      { type: 'success', name: '上架', poptip: true, click: (params) => this.pause(params, 0), checkDisabled: (params) => params.row.paused === 0 },
      { type: 'success', name: '下架', poptip: true, click: (params) => this.pause(params, 1), checkDisabled: (params) => params.row.paused === 1 },
      { type: 'success', name: '设置精选', poptip: true, click: (params) => this.choose(params, 1), checkDisabled: (params) => params.row.choice === 1 || params.row.paused === 1 },
      { type: 'success', name: '取消精选', poptip: true, click: (params) => this.choose(params, 0), checkDisabled: (params) => params.row.choice === 0 || params.row.paused === 1 },
      { button: 'update', click: (params) => { this.update(params) }, checkDisabled: (params) => params.row.paused === 0 },
      { button: 'remove', fun: 'remove', checkDisabled: (params) => params.row.paused === 0 }]
    const columns = [
      { title: '商品编号', width: 120, key: 'code' },
      { title: '商品名称', key: 'name' },
      { title: '商品价格', width: 100, render: (h, params) => this.$ColumnDecimal(h, params.row.price) },
      { title: '商品类目', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.typeId, this.typeOptions) },
      { title: '商品图片', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.smallImage } }) },
      { title: '状态', width: 80, render: (h, params) => h('span', params.row.paused === 0 ? '上架' : '下架') },
      { title: '精选', width: 80, render: (h, params) => h('span', params.row.choice === 0 ? '否' : '是') }]
    return {
      group: 'GOODS',
      showEdit: false,
      editData: {},
      typeOptions: [],
      queryForms: [{ title: '商品名称', key: 'name' }],
      editForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增商品' }],
      actions,
      columns
    }
  },
  created () {
    goodsTypes().then(res => {
      const typeOptions = res.list.map(e => { return { value: e.id, label: e.name } })
      this.typeOptions = typeOptions
      this.queryForms.push({ title: '商品类目', key: 'typeId', type: 'select', options: typeOptions })
      this.editForms.push({ title: '商品名称', key: 'name', span: 1, required: true })
      this.editForms.push({ title: '商品类目', key: 'typeId', span: 2, type: 'select', options: typeOptions, required: true })
      this.editForms.push({ title: '商品价格', key: 'price', span: 2, type: 'number', required: true })
      this.editForms.push({ title: '数量说明', key: 'amountExplain', span: 2 })
      this.editForms.push({ title: '规格说明', key: 'speExplain', span: 2 })
      this.editForms.push({ title: '商品产地', key: 'place', span: 2 })
      this.editForms.push({ title: '保质期(天)', key: 'limitDay', span: 2, type: 'number' })
      this.editForms.push({ title: '商品图片', key: 'smallImage', type: 'file', span: 1, required: true })
      this.editForms.push({ title: '商品轮播图', key: 'bannerImages', type: 'file', span: 1, multiple: true, required: true })
      this.editForms.push({ title: '商品详情图', key: 'detailImages', type: 'file', span: 1, multiple: true })
    })
  },
  methods: {
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      data.price = Math.round(data.price * 100)
      if (data.id) {
        goodsUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        goodsAdd(data).then(res => {
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
        typeId: params.row.typeId,
        price: this.$Decimal(params.row.price),
        amountExplain: params.row.amountExplain,
        speExplain: params.row.speExplain,
        place: params.row.place,
        limitDay: params.row.limitDay,
        smallImage: params.row.smallImage,
        bannerImages: params.row.bannerImages,
        detailImages: params.row.detailImages
      }
      this.showEdit = true
    },
    pause (params, paused) {
      goodsPaused({ id: params.row.id, typeId: params.row.typeId, paused }).then(() => {
        this.$Message.success(paused === 0 ? '上架成功' : '下架成功')
        this.$refs['view-page'].loadData()
      })
    },
    choose (params, choice) {
      goodsChoice({ id: params.row.id, choice }).then(() => {
        this.$Message.success(choice === 0 ? '取消精选成功' : '设置精选成功')
        this.$refs['view-page'].loadData()
      })
    }
  }
}
</script>
