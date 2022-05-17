<template>
  <div class="home-box">
    <Menu />
    <div style="flex:1;">
      <Header />
      <Main />
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>

import Menu from '@/components/layout/Menu.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'

import { mapMutations } from 'vuex'
import { ADD_VIEW } from '@/store/menu/constants'

export default {
  name: 'Home',
  components: { Menu, Header, Main },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  created () {
    this[ADD_VIEW](this.$route)
  },
  watch: {
    $route (val) {
      this[ADD_VIEW](val)
    }
  },
  methods: {
    ...mapMutations('menu', [ADD_VIEW])
  }
}
</script>

<style lang="scss" scoped>
.home-box {
  display: flex;
}
</style>
