<template>
  <div class="query-form-box" v-if="forms && forms.length > 0">
    <div class="form-item" v-for="(item, index) in forms" :key="index">
      <div class="item-label">{{item.title}}</div>
      <div class="item-content" v-if="item.type === 'date'">
        <DatePicker :clearable="true" v-model="queryData[item.key]" format="yyyy年MM月dd日" type="date" :placeholder="item.title | placeholderText(item.type)" />
      </div>
      <div class="item-content item-content_daterange" v-else-if="item.type === 'daterange'">
        <DatePicker :clearable="true" v-model="queryData[item.key]" format="yyyy年MM月dd日" type="daterange" :placeholder="item.title | placeholderText(item.type)" />
      </div>
      <div class="item-content" v-else-if="item.type === 'radio' && item.options && item.options.length > 0">
        <RadioGroup v-model="queryData[item.key]" type="button">
          <Radio v-for="opt in item.options" :key="'r' + opt.value" :label="opt.value">{{opt.label}}</Radio>
        </RadioGroup>
      </div>
      <div class="item-content" v-else-if="item.type === 'select'">
        <Select :clearable="true" v-model="queryData[item.key]" :placeholder="item.title | placeholderText(item.type)">
          <Option v-for="opt in item.options" :key="'s' + opt.value" :value="opt.value">{{opt.label}}</Option>
        </Select>
      </div>
      <div class="item-content item-content_tree" v-else-if="item.type === 'tree' && item.options && item.options.length > 0">
        <SelectTree v-model="queryData[item.key]" :load-data="item.loadData" :options="item.options" :placeholder="item.title | placeholderText(item.type)" />
      </div>
      <div class="item-content" v-else-if="item.type === 'place'">
        <SelectPlace v-model="queryData[item.key]" :level="item.level" />
      </div>
      <div class="item-content" v-else-if="item.type === 'project'">
        <SelectProject v-model="queryData[item.key]" />
      </div>
      <div class="item-content" v-else-if="item.type === 'classify'">
        <SelectClassify v-model="queryData[item.key]" :project-id="queryData.projectId" :language="queryData.language" />
      </div>
      <div class="item-content" v-else-if="item.type === 'label'">
        <SelectLabel v-model="queryData[item.key]" :project-id="queryData.projectId" :language="queryData.language" />
      </div>
      <div class="item-content" v-else>
        <Input v-model="queryData[item.key]" :placeholder="item.title | placeholderText(item.type)" :clearable="true" />
      </div>
    </div>
    <div class="form-item">
      <Button class="form-btn" type="success" icon="md-search" @click="query">查询</Button>
      <Button icon="md-refresh" @click="reset">重置</Button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'QueryFrom',
  props: {
    forms: Array,
    queryData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    treeClose (key, labelKey) {
      this.queryData[key] = ''
      this.queryData[labelKey] = ''
      this.$forceUpdate()
    },
    selectNode (nodes) {
      if (nodes && nodes.length === 1) {
        const { type, key, labelKey, id, title } = nodes[0]
        if (type === 2) {
          this.queryData[key] = id
          this.queryData[labelKey] = title
          this.visible = false
        }
      }
    },
    reset () {
      this.forms.map(e => { this.queryData[e.key] = ''; return e })
      this.$emit('reset')
      this.$emit('query', {})
    },
    query () {
      const data = {}
      Object.assign(data, this.queryData)
      const key = Object.keys(data).find(e => data[e] instanceof Array && data[e][0] instanceof Date)
      if (key) {
        const form = this.forms.find(e => e.key === key)
        if (form) {
          data[form.key0 ? form.key0 : 'startDate'] = this.$FormatTime.yyyyMMdd(data[key][0])
          data[form.key1 ? form.key1 : 'endDate'] = this.$FormatTime.yyyyMMdd(data[key][1])
        }
      }
      this.$emit('query', data)
    }
  },
  filters: {
    placeholderText (title, type) {
      if (['date', 'daterange', 'select', 'tree'].includes(type)) {
        return '选择' + title + '进行查询'
      } else {
        return '输入' + title + '进行查询'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.query-form-box {
  .form-item {
    display: inline-block;
    margin: 0 24px 16px 0;
    .item-label {
      margin-right: 16px;
      font-weight: 500;
    }
    .item-content {
      width: 200px;
    }
    .item-content_tree {
      width: 308px;
      position: relative;
    }
    .item-content_daterange {
      width: 280px;
      .ivu-date-picker {
        width: 100%;
      }
    }
    .item-label,
    .item-content {
      display: inline-block;
    }
  }
  .form-btn {
    margin-right: 16px;
  }
}
</style>
