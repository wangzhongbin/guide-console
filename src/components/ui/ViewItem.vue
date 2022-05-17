<template>
  <div class="view-item-box inline-box">
    <div class="view-label item-box">{{title}}</div>
    <div class="view-value item-box">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'ViewItem',
  props: {
    title: String,
    value: String
  }
}
</script>
<style lang="scss" scoped>
.view-item-box {
  margin-bottom: 16px;
  width: 100%;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  font-weight: 400;
}
.view-label {
  width: 100px;
}
.view-value {
  flex: 1;
  color: #000;
}
</style>
