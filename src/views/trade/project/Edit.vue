<template>
  <EditModal :title="data.id ? '修改项目' : '新增项目'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
  </EditModal>
</template>
<script>

import { projectView, projectAdd, projectUpdate } from '@/api/trade/project'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    projectId: Number,
    mapTypeOptions: Array,
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
        projectView(val).then(res => {
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '角色名称', key: 'roleName', required: true, span: 1 })
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = {
        tenantId: fromData.tenantId || '',
        roleName: fromData.roleName,
        roleId: fromData.roleId
      }
      console.log(data)
      if (data.roleId) {
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
