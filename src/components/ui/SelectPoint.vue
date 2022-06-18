<template>
  <Select transfer clearable multiple :value="ids" placeholder="根据项目和语言选择点位" @on-change="change">
    <Option v-for="opt in options" :key="'p' + opt.targetId" :value="opt.targetId + ''">{{opt.targetName}}</Option>
  </Select>
</template>
<script>

import { loadPinots } from '@/api/trade/point'

export default {
  name: 'SelectPoint',
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
    params () { this.loadData() }
  },
  computed: {
    params: (me) => [me.projectId, me.language],
    ids: (me) => me.value ? me.value.split(',') : []
  },
  methods: {
    loadData () {
      if (this.projectId && this.language) {
        this.options = []
        loadPinots({ projectId: this.projectId, language: this.language }).then(res => {
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
