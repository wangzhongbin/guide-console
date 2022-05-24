<template>
  <ViewDrawer title="角色详情" @close="close" :value="show" width="800">
    <div class="drawer-body">
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">角色信息</div>
      </div>
      <div class="group-box">
        <ViewItem title="角色名称" :value="data.name" />
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
    menus: Array
  },
  methods: {
    close () {
      this.$emit('change', false)
    }
  }
}
</script>
