<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import '@/assets/styles/border.scss'
import '@/assets/styles/box.scss'
import '@/assets/styles/transform.scss'
import '@/assets/styles/text.scss'

export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  background: #fafafa;
  line-height: 22px;
}
div,
p,
a,
span,
ul,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  width: 100%;
  height: 100%;
}

#app {
  color: #000;
}

.ivu-btn {
  border-radius: 2px !important;
}

.ivu-btn-circle {
  border-radius: 50% !important;
}

.ivu-modal-content {
  border-radius: 0 !important;
}

.edit-modal {
  .ivu-modal-body {
    padding: 16px 8px !important;
  }
}

.ivu-row + .ivu-row {
  margin-top: 16px;
}

.view-tags-box {
  flex-wrap: wrap;
}
.view-tag-item {
  margin: 0 8px 8px 0 !important;
  width: 140px;
}
.ivu-transfer-list {
  .ivu-transfer-list-header {
    border-radius: 0 !important;
  }
  .ivu-transfer-list-body {
    border-radius: 0 !important;
  }
}

.view-table {
  width: 840px;
  position: relative;
  border-spacing: 0 !important;
}
.view-table tr {
  position: relative;
  height: 48px;
  width: 100%;
}
.view-table tr td {
  position: relative;
  height: 48px;
  width: 140px;
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  line-height: 24px;
  font-weight: 400;
}

.view-table:after,
.view-table tr td:after {
  position: absolute;
  box-sizing: border-box;
  transform-origin: center;
  content: ' ';
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid #c7c7c7;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}

.view-table:after {
  border-width: 0 1px 1px 0;
}

.view-table tr td:after {
  border-width: 1px 0 0 1px;
}

.view-value {
  color: #000 !important;
  font-weight: 500 !important;
}
</style>
