<template>
  <div>
    <div class="map-box" id="container"></div>
  </div>
</template>
<script>

import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapView',
  data () {
    return {
      map: null
    }
  },
  props: {
    positions: Array
  },
  watch: {
    positions (val) {
      // console.log(val)
      // if (val && val.length > 0) {
      //   const markers = val.map(e => {
      //     return new this.AMap.Marker({
      //       position: [e.lng, e.lat],
      //       icon: '//vdata.amap.com/icons/b18/1/2.png'
      //     })
      //   })
      //   this.map.add(markers[0])
      //   console.log(this.map)
      //   console.log(markers[0])
      // }
    }
  },
  mounted () {
    AMapLoader.load({
      key: '14ff59bcf6861a3ba126adc6e6522ef5', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Walking', 'AMap.MarkerClusterer', 'AMap.Geolocation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker']
      }
    }).then((AMap) => {
      console.log(AMap)
      this.map = new AMap.Map('container', {
        zoom: 15,
        zooms: [6, 18]
      })
      this.AMap = AMap
      this.map.on('click', this.clickMap)
    })
  },
  methods: {
    clickMap (e) {
      const marker = new this.AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        offset: new this.AMap.Pixel(-13, -30),
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
      })
      this.map.add(marker)
    }
  }
}
</script>
<style lang="scss" scoped>
.map-box {
  width: 100%;
  height: 300px;
}
</style>
