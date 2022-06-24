<template>
  <div>
    <div class="tag-box border-left">
      <router-link class="tag-item border-box inline-box" :class="currentView.path === tag.path ? 'tag-item-active' : ''" v-for="(tag, index) in tagViews" :to="tag.path" :key="index">
        <div class="inline-box item-box">
          <Icon :color="currentView.path === tag.path ? '#19be6b':'#495060'" :type="tag.icon" class="gap-box" />
          <div class="gap-box">{{tag.title}}</div>
        </div>
        <Icon v-show="tag.id !== -1" class="item-box" type="md-close-circle" @click.prevent.stop="closeView(tag)" />
      </router-link>
    </div>
    <div class="main-box">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

import { DEL_VIEW } from '@/store/menu/constants'

export default {
  computed: {
    key: (me) => me.$route.path,
    currentView: (me) => me.$store.state.menu.currentView,
    tagViews: (me) => me.$store.state.menu.tagViews
  },
  methods: {
    ...mapMutations('menu', [DEL_VIEW]),
    closeView (tag) {
      const index = this.tagViews.findIndex(v => v.path === tag.path)
      if (index >= 0) {
        this[DEL_VIEW](index)
        if (this.$route.path === tag.path) {
          if (index > this.tagViews.length - 1) {
            const nextView = this.tagViews[this.tagViews.length - 1]
            this.$router.push({ path: nextView.path })
          } else {
            const nextView = this.tagViews[index]
            this.$router.push({ path: nextView.path })
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main-box {
  padding: 16px;
  height: calc(100vh - 110px);
  overflow-y: auto;
  overflow-x: hidden;
}
.tag-box {
  // background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 6px 16px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  .tag-item {
    padding: 4px 12px;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    color: #495060;
    border-radius: 4px;
  }
  .tag-item + .tag-item {
    margin-left: 4px;
  }
  .tag-item-active {
    color: #fff;
    background: #1890ff;
  }
}
</style>
