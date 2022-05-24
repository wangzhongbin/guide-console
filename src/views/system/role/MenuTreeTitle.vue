<template>
  <div class="inline-box">
    <Icon :type="node.icon" class="item-box" />
    <div class="item-box">{{node.title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    node: Object
  }
}
</script>
