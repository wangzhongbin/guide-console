<template>
  <Select transfer clearable :value="value" placeholder="选择项目" @on-change="change" @on-open-change="open">
    <Option v-for="opt in options" :key="'s' + opt.projectId" :value="opt.projectId">{{opt.projectName}}</Option>
  </Select>
</template>
<script>

import { loadProjects } from '@/api/trade/project'

export default {
  name: 'SelectProject',
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
    value: [String, Number]
  },
  created () {
    this.loadData()
  },
  methods: {
    open (boo) {
      if (boo) {
        this.loadData()
      }
    },
    loadData () {
      this.options = []
      loadProjects().then(res => {
        this.options = res.data
      })
    },
    change (value) {
      this.$emit('change', value.join(','))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
