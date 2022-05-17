<template>
  <div>
    <div class="inline-box">
      <div class="image-box" v-for="(item, index) in images" :key="index" :style="{width: width ? width + 'px' : '60px', height: height ? height + 'px' : '60px'}">
        <img @click="previewImage(item)" :src="item | showUrl" :width="width" :height="height" />
      </div>
    </div>
    <Modal v-model="show" width="1000" :footer-hide="true">
      <div class="big-image">
        <img :src="bigImage | showUrl" object-fit="scale-down">
      </div>
    </Modal>
  </div>
</template>
<script>

export default {
  props: {
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
    images: (me) => {
      if (me.src) {
        let images = []
        if (me.src.indexOf(',') === -1) {
          images = [me.src]
        } else {
          images = me.src.split(',')
        }
        return images
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
    showUrl (src) {
      if (src) return 'https://oss.iqqqqq.com/' + src
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
</style>
