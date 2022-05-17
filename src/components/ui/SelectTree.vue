<template>
  <div>
    <div class="select-tree-box" ref="select-tree">
      <div class="ivu-input-icon" v-show="value" @click="clearSelect">
        <Icon type="ios-close-circle" color="#808695" />
      </div>
      <Poptip :width="width > 500 ? width : 500" v-model="visible" transfer placement="bottom">
        <div class="input-box" :style="{width: width || 308 + 'px'}">
          <div v-if="value">{{selectTreeText}}</div>
          <div v-else class="input-placeholder">{{placeholder}}</div>
        </div>
        <div slot="content" class="tree-box">
          <Tree :load-data="loadData" :data="options" @on-select-change="selectNode" />
        </div>
      </Poptip>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SelectTree',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    width: [String, Number],
    value: [String, Number],
    options: Array,
    placeholder: String,
    clearable: Boolean,
    loadData: Function
  },
  computed: {
    children () {
      return this.getChildren(this.options)
    }
  },
  watch: {
    value (val) {
      if (val) {
        const node = this.children.find(e => e.id === val)
        if (node) {
          this.selectTreeText = node.title
        } else {
          this.selectTreeText = ''
        }
      } else {
        this.selectTreeText = ''
      }
    }
  },
  data () {
    return {
      selectTreeText: '',
      poptipWidth: 160,
      visible: false
    }
  },
  methods: {
    clearSelect () {
      this.$emit('change', undefined)
    },
    getChildren (nodes) {
      if (nodes && nodes.length > 0) {
        const children = nodes.reduce((arr, e) => {
          if (e.children) {
            arr.push(...this.getChildren(e.children))
          } else {
            arr.push(e)
          }
          return arr
        }, [])
        return children
      } else {
        return []
      }
    },
    selectNode (nodes) {
      if (nodes && nodes.length === 1) {
        if (!nodes[0].children) {
          this.$emit('change', nodes[0].id)
          this.visible = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-tree-box {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  height: 32px;
}
.input-placeholder {
  color: #c5c8ce;
}
.input-box {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 22px;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
}
.ivu-input-icon {
  cursor: pointer;
}
.tree-box {
  height: 500px;
  overflow: auto;
}
</style>
