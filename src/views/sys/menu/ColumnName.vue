<template>
  <div class="inline-box table-column">
    <Icon :type="row.icon || 'logo-codepen'" class="item-box" />
    <div class="item-box">{{row.label}}</div>
    <!-- <div class="inline-box handle-box"> -->
    <!-- <Button class="item-box" type="success" size="small" @click="add" icon="md-add" /> -->
    <!-- <Button class="item-box" type="primary" size="small" @click="update" icon="md-settings" />
      <Button class="item-box" type="error" size="small" @click="remove" icon="md-trash" /> -->
    <!-- </div> -->
  </div>
</template>
<script>

export default {
  props: {
    row: Object
  },
  methods: {
    // add () {
    //   this.$emit('add', this.row)
    // },
    // edit () {
    //   this.$emit('on-edit', this.row)
    // },
    // remove () {
    //   this.$emit('on-remove', this.row)
    // }
  }
}
</script>
<style lang="scss" scoped>
.table-column {
  display: inline-flex;
  padding-left: 8px;
}
.handle-box {
  position: absolute;
  left: 500px;
}
</style>
