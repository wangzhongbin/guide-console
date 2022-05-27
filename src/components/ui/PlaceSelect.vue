<template>
  <Cascader transfer :data="data" :load-data="loadData" :value="values" @on-change="change"></Cascader>
</template>
<script>

// import { loadProvinces, loadCitys, loadCountys } from '@/api/common'
import { loadProvinces, loadCitys } from '@/api/common'

export default {
  name: 'PlaceSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      data: []
    }
  },
  props: {
    value: String
  },
  computed: {
    values () {
      if (this.value) {
        return this.value.split(',')
      } else {
        return []
      }
    }
  },
  created () {
    loadProvinces().then(res => {
      this.data = res.data.map(e => {
        return { code: e.code, value: e.code, label: e.name, level: 1, children: [], loading: false }
      })
    })
  },
  methods: {
    loadData (item, callback) {
      item.loading = true
      if (item.level === 1) {
        loadCitys({ provinceCode: item.code }).then(res => {
          item.children = res.data.map(e => {
            return { code: e.code, value: e.code, label: e.name, level: 2 }
          })
          item.loading = false
          callback()
        }).catch(() => {
          item.loading = false
          callback()
        })
      }
      // if (item.level === 2) {
      //   loadCountys({ cityCode: item.code }).then(res => {
      //     item.children = res.data.map(e => {
      //       return { code: e.code, value: e.code, label: e.name }
      //     })
      //     item.loading = false
      //     callback()
      //   }).catch(() => {
      //     item.loading = false
      //     callback()
      //   })
      // }
    },
    change (values) {
      this.$emit('change', values.join(','))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
