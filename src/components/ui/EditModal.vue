<template>
  <Modal :title="title" class-name="edit-modal" :value="show" :width="width || 1000" @on-ok="ok" @on-cancel="close">
    <div class="edit-modal-body">
      <EditFrom v-if="forms && forms.length > 0" ref="edit-from" :forms="forms" :edit-data="editData" />
      <slot />
    </div>
    <div slot="footer" class="edit-modal-footer">
      <Button class="btn" @click="close">取消</Button>
      <Button type="primary" class="btn" :loading="loading" @click="ok">确定</Button>
    </div>
  </Modal>
</template>
<script>

export default {
  name: 'EditModal',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    top: [String, Number],
    title: String,
    show: Boolean,
    width: [String, Number],
    forms: Array,
    editData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    close () {
      this.loading = false
      this.$emit('change', false)
      this.$emit('close')
    },
    ok () {
      this.loading = true
      if (this.forms && this.forms.length > 0) {
        this.$refs['edit-from'].getData().then((res) => {
          const callback = () => {
            this.loading = false
            this.forms.map(e => { this.editData[e.key] = ''; return e })
            this.$emit('change', false)
            this.$emit('close')
          }
          const closeLoading = () => {
            this.loading = false
          }
          this.$emit('ok', res, callback, closeLoading)
        }).catch(() => {
          this.loading = false
        })
      } else {
        const callback = () => {
          this.loading = false
          this.$emit('change', false)
          this.$emit('close')
        }
        const closeLoading = () => {
          this.loading = false
        }
        this.$emit('ok', callback, closeLoading)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-modal-footer {
  .btn {
    width: 120px;
  }
  .btn + .btn {
    margin-left: 8px;
  }
}
.edit-modal-body {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
