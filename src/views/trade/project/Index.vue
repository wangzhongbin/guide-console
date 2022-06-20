<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <ProjectEdit v-model="showEdit" :data="editData" @success="loadData" :type-options="typeOptions" :map-type-options="mapTypeOptions" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import ProjectEdit from './Edit'

import { projectView, changeStatus } from '@/api/trade/project'

export default {
  components: { ProjectEdit },
  computed: {
    multiTenant: (me) => me.$store.state.account.multiTenant,
    tenants: (me) => me.$store.state.account.tenants
  },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { button: 'remove', name: '修改状态', click: (params) => this.change(params) }]
    const columns = [
      { title: '项目名称', key: 'projectName' },
      { title: 'logo', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.projectLogo } }) },
      { title: '省份', key: 'provinceName' },
      { title: '城市', key: 'cityName' },
      { title: '地址', key: 'areaName' },
      { title: '状态', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.status, this.statusOptions) },
      { title: '行业类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.projectType, this.typeOptions) },
      { title: '地图类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.mapShowType, this.mapTypeOptions) }]
    return {
      url: '/manage/project/list',
      showEdit: false,
      editData: {},
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.editData = {}; this.showEdit = true }, icon: 'md-add', name: '新增项目' }],
      actions,
      columns,
      mapTypeOptions: [{ value: 0, label: '手绘图' }, { value: 1, label: '图片' }, { value: 2, label: '3D' }],
      typeOptions: [{ value: 0, label: '景区' }, { value: 1, label: '商场' }],
      statusOptions: [{ value: 0, label: '未发布' }, { value: 1, label: '已发布' }]
    }
  },
  created () {
    this.queryForms.push({ title: '项目名称', key: 'projectName' })
    if (this.multiTenant) {
      this.queryForms.push({ title: '租户', key: 'tenantId', type: 'select', options: this.tenants })
    }
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      projectView({ projectId: params.row.projectId, language: params.row.language }).then(res => {
        const project = res.data
        const { provinceCode, cityCode, areaCode } = project
        project.placeCode = [provinceCode, cityCode, areaCode].join(',')
        this.editData = project
        this.showEdit = true
      })
    },
    change (params) {
      changeStatus({ projectId: params.row.projectId }).then(() => {
        this.$Message.success('修改成功')
        this.loadData()
      })
    },
    view (params) {
      projectView({ projectId: params.row.projectId, language: params.row.language }).then(res => {
        this.viewData = res.data
        this.showView = true
      })
    }
  }
}
</script>
