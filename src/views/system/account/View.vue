<template>
  <ViewDrawer title="账号详情" @close="close" :value="show" width="800">
    <div class="drawer-body">
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">账号信息</div>
      </div>
      <div class="group-box">
        <ViewItem title="员工姓名" :value="data.name" />
        <ViewItem title="登录名" :value="data.loginName" />
        <ViewItem title="所在部门" :value="data.deptName" />
      </div>
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">角色信息</div>
      </div>
      <div class="group-box">
        <div class="view-tags-box inline-box" v-if="roles && roles.length > 0">
          <Tag v-for="role in roles" :key="role.id" class="view-tag-item" size="large" color="success" type="dot">{{role.name}}</Tag>
        </div>
        <div v-else class="inline-box text-info">
          <Icon type="md-information-circle" class="item-box" />
          <div class="item-box">暂无角色信息</div>
        </div>
      </div>
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">菜单信息</div>
      </div>
      <div class="box">
        <ViewMenuTable :menus="menus" />
      </div>
    </div>
  </ViewDrawer>
</template>
<script>

import ViewMenuTable from '../menu/ViewMenuTable'

export default {
  components: { ViewMenuTable },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    data: Object,
    roles: Array,
    menus: Array
  },
  methods: {
    close () {
      this.$emit('change', false)
    }
  }
}
</script>
