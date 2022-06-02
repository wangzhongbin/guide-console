<template>
  <div>
    <div class="map-box" id="container"></div>
  </div>
</template>
<script>

export default {
  name: 'MapView',
  data () {
    return {
      map: null
    }
  },
  props: {
  },
  watch: {
  },
  mounted () {
    const map = new this.$AMap.Map('container', { zoom: 15, zooms: [6, 18] })
    map.on('click', this.clickMap)
    this.map = map
  },
  methods: {
    clickMap (e) {
      const icon = new this.$AMap.Icon({ size: new this.$AMap.Size(40, 40), image: 'https://oss.iqqqqq.com/map_icon.png' })
      const marker = new this.$AMap.Marker({ position: [e.lnglat.lng, e.lnglat.lat], offset: new this.$AMap.Pixel(-20, -40), icon: icon })
      this.map.add(marker)
    }
  }
}
</script>
<style lang="scss" scoped>
.map-box {
  width: 500px;
  height: 300px;
}
</style>
