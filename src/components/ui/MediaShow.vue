<template>
  <div>
    <div class="inline-box">
      <div v-if="type === 1">
        <div class="image-box" v-for="(item, index) in medias" :key="index" :style="{width: width ? width + 'px' : '60px', height: height ? height + 'px' : '60px'}">
          <img @click="previewImage(item)" :src="item | showUrl(ossDomain)" :width="width" :height="height" />
        </div>
      </div>
      <div v-else-if="type === 2">
        <audio v-show="src" class="audio-box" :src="src | showUrl(ossDomain)" controls />
      </div>
    </div>
    <Modal v-model="show" width="1000" :footer-hide="true">
      <div class="big-image">
        <img :src="bigImage | showUrl(ossDomain)" object-fit="scale-down">
      </div>
    </Modal>
  </div>
</template>
<script>

export default {
  props: {
    type: {
      type: Number,
      default: () => (1)
    },
    src: String,
    width: [String, Number],
    height: [String, Number]
  },
  name: 'MediaShow',
  data () {
    return {
      show: false,
      bigImage: ''
    }
  },
  computed: {
    ossDomain: (me) => me.$store.state.info.ossDomain,
    medias: (me) => {
      if (me.src) {
        let medias = []
        if (me.src.indexOf(',') === -1) {
          medias = [me.src]
        } else {
          medias = me.src.split(',')
        }
        return medias
      } else {
        return []
      }
    }
  },
  methods: {
    previewImage (src) {
      this.show = true
      this.bigImage = src
    }
  },
  filters: {
    showUrl (src, ossDomain) {
      if (src) return ossDomain + '/' + src
      else return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.image-box {
  padding: 4px;
}
img {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  overflow: hidden;
}
.big-image {
  padding: 16px;
  width: 960px;
}
.audio-box {
  width: 360px;
  height: 40px;
}
</style>
