<template>
  <div class="inline-box">
    <Icon :type="node.type === 1 ? 'md-cube' : 'md-desktop'" class="item-box" :color="node.type === 1 ? '#1890ff' : '#ed4014'" />
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
