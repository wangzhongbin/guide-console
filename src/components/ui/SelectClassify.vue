<template>
  <Select transfer clearable multiple :value="ids" placeholder="根据项目和语言选择分类" @on-change="change">
    <Option v-for="opt in options" :key="'s' + opt.id" :value="opt.id + ''">{{opt.classifyName}}</Option>
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
    value: String
  },
  watch: {
    projectId () { this.loadData() },
    language () { this.loadData() }
  },
  computed: {
    ids (me) {
      return me.value ? me.value.split(',') : []
    }
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
      this.$emit('change', value.join(','))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
