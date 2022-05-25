<template>
  <div class="inline-box" style="display: inline-flex;padding-left:8px;">
    <Icon :type="row.icon || 'logo-codepen'" class="item-box" />
    <div class="item-box">{{row.label}}</div>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
