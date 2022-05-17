<template>
  <div class="main-box">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  computed: {
    key: (me) => me.$route.path
  }
}
</script>

<style scoped lang="scss">
.main-box {
  padding: 16px;
  height: calc(100vh - 105px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
