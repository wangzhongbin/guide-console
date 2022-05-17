<template>
  <FormItem :label="label" :prop="prop" v-show="showItem" :class="span | spanClass" :rules="editData | itemRules(rule, required, label, type)">
    <slot />
  </FormItem>
</template>
<script>
export default {
  name: 'EditFormItem',
  props: {
    label: String,
    prop: String,
    type: String,
    show: Function,
    rule: [Object, Array],
    required: {
      type: Boolean,
      default: () => false
    },
    span: [Number, String],
    editData: Object
  },
  data () {
    return {
      showItem: true
    }
  },
  watch: {
    editData: {
      handler (newValue, oldValue) {
        if (this.show) {
          this.showItem = this.show(newValue)
        }
      },
      deep: true
    }
  },
  filters: {
    spanClass (span) {
      if (span === 1) return 'form-item-span_1'
      else if (span === 3) return 'form-item-span_3'
      else if (span === 4) return 'form-item-span_4'
      else return ''
    },
    itemRules (data, rule, required, title, type) {
      const message = rule && rule.message ? rule.message : '必填项不能为空'
      if (rule) {
        return { required: rule.requiredFun(data), message }
      } else {
        if (required) {
          return { required, message }
        } else {
          return {}
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ivu-form-item {
  width: 480px;
  margin: 0 !important;
  padding: 0 16px 32px 16px;
}
.form-item-span_1 {
  width: 960px !important;
}
.form-item-span_3 {
  width: 320px !important;
}
</style>
