<template>
  <EditModal :title="data.id ? '修改角色' : '新增角色'" :forms="forms" :edit-data="data" @close="close" @ok="ok" :show="show">
    <div class="group-box border-top">
      <div class="box ">菜单选择</div>
      <Tree ref="menu-tree" :data="menuTree" show-checkbox multiple />
    </div>
  </EditModal>
</template>
<script>

import { accountAdd, accountUpdate, accountView } from '@/api/sys/account'

import MenuTreeTitle from './MenuTreeTitle'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    accountId: Number,
    roles: Array
  },
  data () {
    return {
      forms: [],
      data: {},
      accountRoleIds: []
    }
  },
  watch: {
    accountId (val) {
      this.data = {}
      this.accountRoleIds = []
      if (val) {
        accountView(val).then(res => {
          this.accountRoleIds = res.roleIds
          this.data = res.user
        })
      }
    }
  },
  created () {
    this.forms.push({ title: '帐号', key: 'userName', required: true, span: 2 })
    this.forms.push({ title: '姓名', key: 'nickName', required: true, span: 2 })
    this.forms.push({ title: '手机号码', key: 'phonenumber', required: true, span: 2 })
    this.forms.push({ title: '密码', key: 'password', required: true, span: 2 })
    this.forms.push({ title: '电子邮件', key: 'email', span: 2 })
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
        accountUpdate(data).then(res => {
          callback()
          this.$Message.success('修改成功')
          this.$emit('success')
        }).catch(() => { closeLoading() })
      } else {
        accountAdd(data).then(res => {
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
