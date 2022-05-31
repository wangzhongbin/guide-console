<template>
  <div class="inline-box" style="height: 60px;">
    <div class="box">
      <Button loading v-if="loading" class="box">正在上传中...</Button>
      <Upload v-else :max-size="1024 * 2" :accept="accept" :format="format" :on-format-error="handleFormatError" :show-upload-list="false" :action="uploadUrl" :headers="uploadHeaders" :data="uploadData" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-exceeded-size="handleMaxSize">
        <Button icon="md-cloud-upload">{{ type | uploadText}}</Button>
      </Upload>
    </div>
    <div class="box">
      <MediaShow :src="value.resFileName" :type="type" />
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
    value: Object
  },
  name: 'MediaUploadPoint',
  computed: {
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
    uploadProgress () {
      this.loading = true
    },
    uploadSuccess (res) {
      this.loading = false
      if (res.code === 200) {
        this.$Message.success('上传成功')
        const file = res.data
        const data = this.value
        data.duration = file.duration
        data.resFileName = file.fileName
        data.height = file.height
        data.width = file.width
        if (this.type === 1) {
          data.resourceCategory = 1
        }
        this.$emit('success', data)
      } else {
        this.$Message.error('上传失败')
      }
    }
  },
  filters: {
    uploadText (type) {
      let text = ''
      if (type === 1) {
        text = '选择图片'
      } else if (type === 2) {
        text = '选择音频'
      } else if (type === 3) {
        text = '选择视频'
      }
      return text
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
