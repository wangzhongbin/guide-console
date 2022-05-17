<template>
  <div>
    <div v-if="multiple">
      <Button loading v-if="loading" class="box">正在上传中...</Button>
      <Upload class="box" v-else :max-size="1024 * 2" :accept="accept" :format="format" :on-format-error="handleFormatError" :show-upload-list="false" :action="uploadUrl" :headers="uploadHeaders" :data="uploadData" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-exceeded-size="handleMaxSize">
        <Button icon="md-cloud-upload">选择图片（可上传多张）</Button>
      </Upload>
      <div class="box" v-if="values && values.length > 0">
        <div class="item-box inline-box" v-for="(item, index) in values" :key="index">
          <MediaShow :src="item" class="box" />
          <Poptip class="box" transfer confirm title="确认删除该投图片?" @on-ok="del(index)">
            <Icon type="md-close-circle" size="20" />
          </Poptip>
        </div>
      </div>
    </div>
    <div v-else>
      <Button loading v-if="loading" class="box">正在上传中...</Button>
      <Upload class="box" v-else :max-size="1024 * 2" :accept="accept" :format="format" :on-format-error="handleFormatError" :show-upload-list="false" :action="uploadUrl" :headers="uploadHeaders" :data="uploadData" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-exceeded-size="handleMaxSize">
        <Button icon="md-cloud-upload">选择图片</Button>
      </Upload>
      <div class="box inline-box" v-show="value">
        <MediaShow :src="value" class="box" />
        <Poptip class="box" transfer confirm title="确认删除该投图片?" @on-ok="del()">
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
      return ['jpg', 'jpeg', 'gif', 'png']
    },
    accept () {
      return 'jpg,jpeg,gif,png'
    },
    uploadHeaders () {
      return { token: getToken() }
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
      if (res.code === 1) {
        this.$Message.success('上传成功')
        if (this.multiple && this.value) {
          const values = this.value.split(',')
          values.push(res.data.uri)
          this.$emit('success', values.join(','))
        } else {
          this.$emit('success', res.data.uri)
        }
      } else {
        this.$Message.error('上传失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
