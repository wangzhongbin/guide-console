<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal :title="editData.id ? '修改租户' : '新增租户'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import { loadProvinces } from '@/api/common'

import { tenantView, tenantAdd, tenantUpdate, tenantRemove } from '@/api/trade/tenant'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', name: '注销', click: (params) => this.remove(params) }
      // { button: 'view', click: (params) => this.view(params) }
    ]
    const columns = [
      { title: '租户名称', key: 'tenantName' },
      { title: '联系人', key: 'contacts' },
      { title: '手机号码', key: 'phoneNo' },
      { title: '省份', key: 'provinceName' },
      { title: '城市', key: 'cityName' },
      { title: '地址', key: 'tenantAddress' },
      { title: '状态', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.status, this.statusOptions) }]
    return {
      url: '/manage/tenant/list',
      showEdit: false,
      editData: {},
      showView: false,
      viewData: {},
      editForms: [],
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增租户' }],
      actions,
      columns,
      statusOptions: [{ value: 0, label: '正常' }, { value: 1, label: '注销' }]
    }
  },
  created () {
    loadProvinces().then(res => {
      const provinces = res.data.map(e => {
        return { value: e.code, label: e.name }
      })
      this.queryForms.push({ title: '租户名称', key: 'tenantName' })
      this.queryForms.push({ title: '手机号码', key: 'phoneNo' })
      this.queryForms.push({ title: '省份', key: 'provinceCode', type: 'select', options: provinces })
      this.editForms.push({ title: '租户名称', key: 'tenantName', required: true, span: 2 })
      this.editForms.push({ title: '手机号码', key: 'phoneNo', required: true, span: 2 })
      this.editForms.push({ title: '所在地', key: 'placeCode', type: 'place', required: true, span: 2 })
      this.editForms.push({ title: '联系人姓名', key: 'contacts', span: 2 })
      this.editForms.push({ title: '地址', key: 'tenantAddress', span: 1 })
    })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
      const codes = fromData.placeCode.split(',')
      fromData.provinceCode = codes[0]
      fromData.cityCode = codes[1]
      if (fromData.tenantId) {
        tenantUpdate(fromData).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      } else {
        tenantAdd(fromData).then(res => {
          callback()
          this.$Message.success('新增成功')
          this.$refs['view-page'].loadData()
        }).catch(() => { closeLoading() })
      }
    },
    update (params) {
      tenantView(params.row.tenantId).then(res => {
        const tenant = res.data
        const placeCode = tenant.provinceCode + ',' + tenant.cityCode
        tenant.placeCode = placeCode
        this.editData = tenant
        this.showEdit = true
      })
    },
    view (params) {
      tenantView(params.row.tenantId).then(res => {
        this.viewData = res.data
        this.showView = true
      })
    },
    remove (params) {
      tenantRemove(params.row.tenantId).then(() => {
        this.$Message.success('注销成功')
        this.loadData()
      })
    }
  }
}
</script>
