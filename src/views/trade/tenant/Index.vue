<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="editData.id ? '修改租户' : '新增租户'" :forms="editForms" :edit-data="editData" @ok="ok" v-model="showEdit" />
  </div>
</template>
<script>

import { tenantView, tenantAdd, tenantUpdate, tenantRemove } from '@/api/trade/tenant'

export default {
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { type: 'primary', name: '重置密码', click: (params) => this.reset(params) },
      { button: 'remove', name: '注销', click: (params) => this.remove(params) }
      // { button: 'view', click: (params) => this.view(params) }
    ]
    const columns = [
      { title: '租户名称', key: 'tenantName' },
      { title: '联系人', key: 'contacts' },
      { title: '手机号码', key: 'phoneNo' },
      { title: '状态', key: 'status' },
      { title: '省份', key: 'provinceName' },
      { title: '城市', key: 'cityName' },
      { title: '地址', key: 'tenantAddress' },
      { title: '状态', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.status, this.statusOptions) }]
    return {
      url: '/manage/user/list',
      showEdit: false,
      editData: {},
      showView: false,
      viewData: {},
      editForms: [],
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增租户' }],
      actions,
      columns,
      statusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '注销' }]
    }
  },
  created () {
    this.queryForms.push({ title: '租户名称', key: 'tenantName' })
    this.queryForms.push({ title: '手机号码', type: 'phoneNo' })
    this.queryForms.push({ title: '省份', type: 'provinceCode' })
    this.editForms.push({ title: '员工姓名', key: 'name', required: true })
    this.editForms.push({ title: '登录名', key: 'loginName', required: true })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    ok (fromData, callback, closeLoading) {
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
        this.editData = res.data
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
