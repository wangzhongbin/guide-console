<template>
  <Select transfer clearable multiple :value="value" placeholder="选择点位" @on-change="change">
    <Option v-for="opt in options" :key="'s' + opt.id" :value="opt.id">{{opt.classifyName}}</Option>
  </Select>
</template>
<script>

import { loadClassifys } from '@/api/trade/classify'

export default {
  name: 'SelectClassify',
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      options: []
    }
  },
  props: {
    projectId: [Number, String],
    language: [Number, String],
    value: [Number, String]
  },
  watch: {
    projectId () { this.loadData() },
    language () { this.loadData() }
  },
  methods: {
    loadData () {
      if (this.projectId && this.language) {
        this.options = []
        loadClassifys({ projectId: this.projectId, language: this.language }).then(res => {
          this.options = res.data
        })
      } else {
        this.options = []
      }
    },
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
