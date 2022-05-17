<template>
  <div v-if="text && showDivider" class="form-item-line">
    <Divider size="small" orientation="left">{{text}}</Divider>
  </div>
</template>
<script>
export default {
  name: 'EditFormItem',
  props: {
    text: String,
    show: Function,
    editData: Object
  },
  data () {
    return {
      showDivider: false
    }
  },
  watch: {
    editData: {
      handler (newValue, oldValue) {
        if (this.show) {
          this.showDivider = this.show(newValue)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item-line {
  width: 960px !important;
}
</style>
