<template>
  <Drawer :title="title" @on-close="close" :value="value" :width="width || 600">
    <div class="edit-drawer-body">
      <slot />
    </div>
    <div class="edit-drawer-footer">
      <Button class="btn" @click="close">关闭</Button>
    </div>
  </Drawer>
</template>
<script>

export default {
  name: 'ViewDrawer',
  props: {
    title: String,
    value: Boolean,
    width: [String, Number]
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 12px 16px;
  background: #fff;
  text-align: right;
  .btn {
    width: 120px;
  }
  .btn + .btn {
    margin-left: 8px;
  }
}
.edit-drawer-body {
  height: calc(100vh - 150px);
  overflow-y: auto;
}
</style>
