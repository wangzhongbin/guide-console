<template>
  <div>
    <CheckboxGroup v-model="accountRoleIds">
      <div class="group-box">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">流程角色</div>
        </div>
        <div class="box">
          <Checkbox class="check-box-item" v-for="item in processRoles" :key="item.id" :label="item.id">{{item.name}}</Checkbox>
        </div>
      </div>
      <div class="group-box">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">菜单角色</div>
        </div>
        <div class="box">
          <Checkbox class="check-box-item" v-for="item in roles" :key="item.id" :label="item.id">{{item.name}}</Checkbox>
        </div>
      </div>
    </CheckboxGroup>
  </div>
</template>
<script>

import { loadRoles } from '@/api/sys/role'

import { accountView } from '@/api/sys/account'

export default {
  props: {
    accountId: [Number, String]
  },
  data () {
    return {
      processRoles: [],
      roles: [],
      accountRoleIds: []
    }
  },
  watch: {
    accountId (val) {
      this.processRoles = []
      this.roles = []
      this.accountRoleIds = []
      if (val) {
        Promise.all([loadRoles(), accountView(val)]).then(res => {
          this.processRoles = res[0].list.filter(e => e.processed === 1)
          this.roles = res[0].list.filter(e => e.processed === 0)
          this.accountRoleIds = res[1].roles.map(e => e.id)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.check-box-item {
  width: 180px;
  padding: 0 16px 16px 0;
}
</style>
