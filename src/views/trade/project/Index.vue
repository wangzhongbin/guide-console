<template>
  <div>
    <ViewPage ref="view-page" :url="url" :buttons="buttons" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <ProjectEdit v-model="showEdit" :project-id="roleId" @success="loadData" :map-type-options="mapTypeOptions" :language-options="languageOptions" />
  </div>
</template>
<script>

import MediaShow from '@/components/ui/MediaShow'

import ProjectEdit from './Edit'

// import { loadProvinces } from '@/api/common'

import { projectView, projectRemove, changeStatus } from '@/api/trade/project'

export default {
  components: { ProjectEdit },
  data () {
    const actions = [
      { button: 'update', click: (params) => { this.update(params) } },
      { type: 'update', name: '修改状态', click: (params) => this.change(params) },
      { button: 'remove', click: (params) => this.remove(params) }]
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
      buttons: [{ type: 'primary', fun: () => { this.projectId = 0; this.showEdit = true }, icon: 'md-add', name: '新增租户' }],
      actions,
      columns,
      mapTypeOptions: [{ value: 0, label: '手绘图' }, { value: 1, label: '图片' }, { value: 1, label: '3D' }],
      typeOptions: [{ value: 0, label: '景区' }, { value: 1, label: '商场' }],
      languageOptions: [{ value: 1, label: '中文' }, { value: 2, label: '英文' }, { value: 3, label: '俄文' }, { value: 4, label: '日文' }, { value: 5, label: '韩文' }]
    }
  },
  created () {
    // loadProvinces().then(res => {
    //   const provinces = res.data.map(e => {
    //     return { value: e.code, label: e.name }
    //   })
    //   this.queryForms.push({ title: '省份', key: 'provinceCode', type: 'select', options: provinces })
    // })
    this.queryForms.push({ title: '项目名称', key: 'projectName' })
  },
  methods: {
    loadData () {
      this.$refs['view-page'].loadData()
    },
    // ok (fromData, callback, closeLoading) {
    //   const codes = fromData.placeCode.split(',')
    //   fromData.provinceCode = codes[0]
    //   fromData.cityCode = codes[1]
    //   if (fromData.projectId) {
    //     projectUpdate(fromData).then(res => {
    //       callback()
    //       this.$Message.success('修改成功')
    //       this.$refs['view-page'].loadData()
    //     }).catch(() => { closeLoading() })
    //   } else {
    //     projectAdd(fromData).then(res => {
    //       callback()
    //       this.$Message.success('新增成功')
    //       this.$refs['view-page'].loadData()
    //     }).catch(() => { closeLoading() })
    //   }
    // },
    update (params) {
      // projectView(params.row.projectId).then(res => {
      //   const project = res.data
      //   const placeCode = project.provinceCode + ',' + project.cityCode
      //   project.placeCode = placeCode
      //   this.editData = project
      //   this.showEdit = true
      // })
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
    },
    remove (params) {
      projectRemove(params.row.projectId).then(() => {
        this.$Message.success('删除成功')
        this.loadData()
      })
    }
  }
}
</script>
