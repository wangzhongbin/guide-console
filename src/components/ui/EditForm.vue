<template>
  <div v-if="forms && forms.length > 0">
    <Form ref="form" :model="editData" :label-width="100" label-position="left" inline class="edit-form-box">
      <div v-for="(item, index) in sortForms" :key="index">
        <EditFormItem v-if="item.key" :label="item.title" :prop="item.key" :type="item.type" :show="item.show" :edit-data="editData" :rule="item.rule" :required="item.required" :span="item.span">
          <div v-if="item.type === 'select' && item.options && item.options.length > 0">
            <Select transfer clearable v-model="editData[item.key]" :placeholder="item.title | placeholderText(item.type)">
              <Option v-for="opt in item.options" :key="'s' + opt.value" :value="opt.value">{{opt.label}}</Option>
            </Select>
          </div>
          <div v-else-if="item.type === 'date'">
            <DatePicker transfer :clearable="true" v-model="editData[item.key]" format="yyyy年MM月dd日" type="date" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'daterange'">
            <DatePicker transfer :clearable="true" v-model="editData[item.key]" format="yyyy年MM月dd日" type="daterange" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'radio' && item.options && item.options.length > 0">
            <RadioGroup transfer v-model="editData[item.key]">
              <Radio border v-for="opt in item.options" :key="'r' + opt.value" :label="opt.value">{{opt.label}}</Radio>
            </RadioGroup>
          </div>
          <div v-else-if="item.type === 'tree' && item.options && item.options.length > 0">
            <SelectTree v-model="editData[item.key]" :load-data="item.loadData" :options="item.options" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'textarea'">
            <Input v-model="editData[item.key]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'int'">
            <!-- <InputNumber :max="item.max || 10" :min="item.min || 0" v-model="editData[item.key]" :placeholder="item.title | placeholderText(item.type)" /> -->
            <Input v-model="editData[item.key]" type="number" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'number'">
            <Input v-model="editData[item.key]" type="number" :placeholder="item.title | placeholderText(item.type)" />
          </div>
          <div v-else-if="item.type === 'file'">
            <MediaUpload v-model="editData[item.key]" :multiple="item.multiple" />
          </div>
          <div v-else-if="item.type === 'password'">
            <Input v-model="editData[item.key]" type="password" :disabled="item.disabled" :placeholder="item.title | placeholderText(item.type)" :clearable="true" />
          </div>
          <div v-else-if="item.type === 'read'">
            <div>{{editData[item.key]}}</div>
          </div>
          <div v-else-if="item.type === 'image'">
            <MediaShow :src="editData[item.key]" width="100" height="100" />
          </div>
          <div v-else>
            <Input v-model="editData[item.key]" :disabled="item.disabled" :placeholder="item.title | placeholderText(item.type)" :clearable="true" />
          </div>
        </EditFormItem>
        <div v-else-if="item.line">
          <EditFormDivider :show="item.show" :text="item.title" :edit-data="editData" />
        </div>
      </div>
    </Form>
  </div>
</template>
<script>

export default {
  name: 'EditForm',
  props: {
    rule: Object,
    forms: Array,
    editData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    sortForms () {
      const forms = this.forms.map(e => { return { ...e } })
      return forms.sort((f, n) => f.sort - n.sort)
    }
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            const data = {}
            Object.assign(data, this.editData)
            const key = Object.keys(data).find(e => data[e] instanceof Array && data[e][0] instanceof Date)
            if (key) {
              const form = this.forms.find(e => e.key === key)
              if (form) {
                data[form.key0 ? form.key0 : 'startDate'] = this.$FormatTime.yyyyMMdd(data[key][0])
                data[form.key1 ? form.key1 : 'endDate'] = this.$FormatTime.yyyyMMdd(data[key][1])
              }
            }
            resolve(data)
          } else {
            reject(new Error('请输入必填项'))
          }
        })
      })
    }
  },
  filters: {
    placeholderText (title, type) {
      if (['date', 'daterange', 'select'].includes(type)) {
        return '选择' + title
      } else {
        return '输入' + title
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-form-box {
  display: flex;
  flex-wrap: wrap;
  .ivu-date-picker,
  .ivu-input-number {
    width: 100% !important;
  }
  .ivu-form-item-label {
    padding: 10px 0 !important;
  }
}
</style>
