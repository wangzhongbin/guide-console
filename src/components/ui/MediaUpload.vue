<template>
  <div>
    <div v-if="multiple">
      <Button loading v-if="loading" class="box">正在上传中...</Button>
      <Upload class="box" v-else :accept="accept" :format="format" :on-format-error="handleFormatError" :show-upload-list="false" :action="uploadUrl" :headers="uploadHeaders" :data="uploadData" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-exceeded-size="handleMaxSize">
        <Button icon="md-cloud-upload">{{ type | uploadText(multiple)}}</Button>
      </Upload>
      <div class="box" v-if="values && values.length > 0">
        <div class="item-box inline-box" v-for="(item, index) in values" :key="index">
          <MediaShow :src="item" :type="type" class="box" />
          <Poptip class="box" transfer confirm title="确认删除?" @on-ok="del(index)">
            <Icon type="md-close-circle" size="20" />
          </Poptip>
        </div>
      </div>
    </div>
    <div v-else>
      <Button loading v-if="loading" class="box">正在上传中...</Button>
      <Upload class="box" v-else :accept="accept" :format="format" :on-format-error="handleFormatError" :show-upload-list="false" :action="uploadUrl" :headers="uploadHeaders" :data="uploadData" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-exceeded-size="handleMaxSize">
        <Button icon="md-cloud-upload">{{ type | uploadText}}</Button>
      </Upload>
      <div class="box inline-box" v-show="value">
        <MediaShow :src="value" :type="type" class="box" />
        <Poptip class="box" transfer confirm title="确认删除?" @on-ok="del()">
          <Icon type="md-close-circle" size="20" />
        </Poptip>
      </div>
    </div>
  </div>
</template>
<script>

import { uploadApi } from '@/api/sys/media'
import { getToken } from '@/cookie'

export default {
  model: {
    prop: 'value',
    event: 'success'
  },
  data () {
    return {
      loading: false
    }
  },
  props: {
    /** 1-图片 2-音频 3-视频 */
    type: {
      type: Number,
      default: () => (1)
    },
    multiple: Boolean,
    value: String
  },
  name: 'MediaUpload',
  computed: {
    values () {
      if (this.multiple && this.value) {
        return this.value.split(',')
      } else {
        return []
      }
    },
    format () {
      // return ['jpg', 'jpeg', 'gif', 'png']
      return []
    },
    accept () {
      // return 'jpg,jpeg,gif,png'
      return ''
    },
    uploadHeaders () {
      return { Authorization: 'Bearer ' + getToken() }
    },
    uploadData () {
      return { fileKey: 'file' }
    },
    uploadUrl () {
      return uploadApi()
    }
  },
  methods: {
    handleFormatError (file) {
      this.$Message.warning(file.name + '文件类型错误')
    },
    handleMaxSize (file) {
      this.$Message.warning(file.name + '文件过大')
    },
    del (index) {
      if (this.multiple) {
        const values = this.value.split(',')
        values.splice(index, 1)
        this.$emit('success', values.join(','))
      } else {
        this.$emit('success', '')
      }
    },
    uploadProgress () {
      this.loading = true
    },
    uploadSuccess (res) {
      this.loading = false
      if (res.code === 200) {
        this.$Message.success('上传成功')
        if (this.multiple && this.value) {
          const values = this.value.split(',')
          values.push(res.data.fileName)
          this.$emit('success', values.join(','))
        } else {
          this.$emit('success', res.data.fileName)
        }
      } else {
        this.$Message.error('上传失败')
      }
    }
  },
  filters: {
    uploadText (type, multiple) {
      let text = ''
      if (type === 1) {
        text = '选择图片'
      } else if (type === 2) {
        text = '选择音频'
      } else if (type === 3) {
        text = '选择视频'
      }
      if (multiple) {
        text = text + '（可上传多个）'
      }
      return text
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
