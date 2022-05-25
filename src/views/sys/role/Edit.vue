<template>
  <EditModal :title="data.id ? '修改角色' : '新增角色'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
    <div class="group-box border-top">
      <div class="box ">菜单选择</div>
      <Tree ref="menu-tree" :data="menuTree" show-checkbox multiple />
    </div>
  </EditModal>
</template>
<script>

import { roleView, roleUpdate, roleAdd } from '@/api/sys/role'

import MenuTreeTitle from './MenuTreeTitle'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    roleId: Number
  },
  data () {
    return {
      data: {},
      menuTree: [],
      forms: [],
      accountRoleIds: []
    }
  },
  watch: {
    roleId (val) {
      this.data = {}
      this.accountRoleIds = []
      if (val) {
        roleView(val).then(res => {
          console.log(res)
          // this.accountRoleIds = res.roleIds
          // this.data = res.user
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '角色名称', key: 'roleName', required: true, span: 1 })
  },
  methods: {
    assembleTree (nodes, menus, roleMenuIds) {
      return nodes.map(e => {
        e.expand = true
        e.checked = roleMenuIds.some(id => e.id === id)
        e.render = (h, { root, node, data }) => h(MenuTreeTitle, { props: { node: data } })
        const children = menus.filter(m => m.parentId === e.id)
        if (children && children.length > 0) {
          e.children = this.assembleTree(children, menus, roleMenuIds)
        }
        return e
      })
    },
    getRoleMenus () {
      return this.$refs['menu-tree'].getCheckedAndIndeterminateNodes()
    },
    close () {
      this.$emit('change', false)
    },
    ok (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      console.log(data)
      data.roleIds = this.accountRoleIds
      if (data.userId) {
        roleUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        roleAdd(data).then(res => {
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
