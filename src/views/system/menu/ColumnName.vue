<template>
  <div class="inline-box" style="display: inline-flex;padding-left:8px;">
    <Icon :type="row.icon" class="item-box" />
    <div class="item-box">{{row.title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
