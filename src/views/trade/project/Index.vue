<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <ProjectEdit v-model="showEdit" :project-id="projectId" @success="loadData" :tenant-options="tenantOptions" :type-options="typeOptions" :map-type-options="mapTypeOptions" />
  </div>
</template>
<script>

import { loadTenants } from '@/api/trade/tenant'

import MediaShow from '@/components/ui/MediaShow'

import ProjectEdit from './Edit'

import { projectView, changeStatus } from '@/api/trade/project'

export default {
  components: { ProjectEdit },
  computed: {
    multiTenant: (me) => me.$store.state.account.multiTenant
  },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { type: 'update', name: '修改状态', click: (params) => this.change(params) }]
    const columns = [
      { title: '项目名称', key: 'projectName' },
      { title: 'logo', width: 100, render: (h, params) => h(MediaShow, { props: { src: params.row.projectLogo } }) },
      { title: '手机号码', key: 'phoneNo' },
      { title: '省份', key: 'provinceName' },
      { title: '城市', key: 'cityName' },
      { title: '地址', key: 'areaName' },
      { title: '地址', key: 'projectType' },
      { title: '行业类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.projectType, this.typeOptions) },
      { title: '地图类型', width: 100, render: (h, params) => this.$ColumnDictText(h, params.row.mapShowType, this.mapTypeOptions) }]
    return {
      url: '/manage/project/list',
      showEdit: false,
      projectId: 0,
      // showView: false,
      // viewData: {},
      queryForms: [],
      buttons: [{ type: 'primary', fun: () => { this.projectId = 0; this.showEdit = true }, icon: 'md-add', name: '新增项目' }],
      actions,
      columns,
      tenantOptions: [],
      mapTypeOptions: [{ value: 0, label: '手绘图' }, { value: 1, label: '图片' }, { value: 2, label: '3D' }],
      typeOptions: [{ value: 0, label: '景区' }, { value: 1, label: '商场' }]
    }
  },
  created () {
    loadTenants().then(res => {
      const tenants = res.data && res.data.length > 0 ? res.data.map(e => {
        return { value: e.tenantId, label: e.tenantName }
      }) : []
      this.queryForms.push({ title: '项目名称', key: 'projectName' })
      this.queryForms.push({ title: '租户', key: 'tenantId', type: 'select', options: tenants })
      if (this.multiTenant) {
        this.queryForms.push({ title: '租户', key: 'tenantId', type: 'select', options: tenants })
      }
      this.tenantOptions = tenants
    })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    update (params) {
      this.projectId = params.row.projectId
      this.showEdit = true
    },
    change (params) {
      changeStatus({ projectId: params.row.projectId }).then(() => {
        this.$Message.success('修改成功')
        this.loadData()
      })
    },
    view (params) {
      projectView(params.row.projectId).then(res => {
        this.viewData = res.data
        this.showView = true
      })
    }
  }
}
</script>
