<template>
  <Modal title="项目授权" class-name="edit-modal" :value="show" :width="1000" @on-ok="ok" @on-cancel="close">
    <CheckboxGroup class="box" v-model="selectIds">
      <div v-for="(item, index) in projects" :key="'t' + index">
        <div class="group-box">
          <div class="box text-title">{{item.tenantName}}</div>
          <div class="box">
            <Checkbox border v-for="(p, index) in item.tpList" :key="'p' + index" :label="p.projectId">{{p.projectName}}</Checkbox>
          </div>
        </div>
      </div>
    </CheckboxGroup>
    <div slot="footer" class="edit-modal-footer">
      <Button class="btn" @click="close">取消</Button>
      <Button type="primary" class="btn" :loading="loading" @click="ok">确定</Button>
    </div>
  </Modal>
</template>
<script>

import { loadAuthProjects, changeAuthProject } from '@/api/trade/project'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    accountId: Number
  },
  data () {
    return {
      loading: false,
      projects: [],
      selectIds: []
    }
  },
  watch: {
    accountId (val) {
      this.projects = []
      this.selectIds = []
      if (val) {
        loadAuthProjects({ userId: val }).then(res => {
          this.projects = res.data.projects
          this.selectIds = res.data.selectIds
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('change', false)
    },
    ok () {
      changeAuthProject({ userId: this.accountId, projectIds: this.selectIds }).then(() => {
        this.$Message.success('配置成功')
        this.loading = false
        this.close()
        this.$emit('success')
      }).catch(() => { this.loading = false })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
