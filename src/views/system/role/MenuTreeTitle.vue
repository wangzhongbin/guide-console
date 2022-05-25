<template>
  <div class="inline-box">
    <Icon :type="node.icon || 'logo-codepen'" class="item-box" />
    <div class="item-box">{{node.label}}</div>
  </div>
</template>
<script>
export default {
  props: {
    node: Object
  }
}
</script>
