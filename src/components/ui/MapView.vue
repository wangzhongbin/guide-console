<template>
  <div>
    <div class="inline-box" style="width: 830px;align-items: flex-start;">
      <div class="map-box box" id="container"></div>
      <div class="box">
        <div class="inline-box" v-for="(item, index) in positions" :key="index">
          <div class="item-box">{{item}}</div>
          <div class="item-box" style="cursor: pointer;" @click="remove(index)">
            <Icon type="ios-close-circle" size="16" />
          </div>
        </div>
      </div>
    </div>
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
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    isLine: {
      type: Boolean,
      default: () => (false)
    }
  },
  watch: {
    positions (val) {
      this.map.clearMap()
      if (val && val.length > 0) {
        const markers = val.map(e => {
          const icon = new this.$AMap.Icon({ size: new this.$AMap.Size(40, 40), image: 'https://oss.iqqqqq.com/map_icon.png' })
          const marker = new this.$AMap.Marker({ position: [e[0], e[1]], offset: new this.$AMap.Pixel(-20, -40), icon: icon })
          return marker
        })
        this.map.add(markers)
        if (this.isLine && val.length > 1) {
          console.log(val)
          const polyline = {
            // path: val,
            path: val,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 折线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50
          }
          this.map.add(polyline)
        }
      }
    }
  },
  computed: {
    positions () {
      if (this.value) {
        const positions = JSON.parse(this.value)
        return typeof positions === 'object' ? positions : []
      } else {
        return []
      }
    }
  },
  mounted () {
    const map = new this.$AMap.Map('container', { zoom: 15, zooms: [6, 18] })
    // const polyline = {
    //   // path: val,
    //   path: [new this.$AMap.LngLat(120.154477, 30.288941), new this.$AMap.LngLat(120.158726, 30.288534)],
    //   borderWeight: 2, // 线条宽度，默认为 1
    //   strokeColor: 'red', // 线条颜色
    //   lineJoin: 'round' // 折线拐点连接处样式
    // }
    // map.add(polyline)
    map.on('click', this.clickMap)
    this.map = map
  },
  methods: {
    remove (index) {
      if (this.isLine) {
        const positions = this.positions
        positions.splice(index, 1)
        this.$emit('change', JSON.stringify(positions))
      } else {
        this.$emit('change', '')
      }
    },
    clickMap (e) {
      const position = [e.lnglat.lng, e.lnglat.lat]
      if (this.isLine) {
        const positions = this.positions
        positions.push(position)
        this.$emit('change', JSON.stringify(positions))
      } else {
        this.$emit('change', JSON.stringify([position]))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.map-box {
  width: 600px;
  height: 300px;
}
</style>
