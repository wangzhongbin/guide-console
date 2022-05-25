<template>
  <ViewDrawer title="账号详情" @close="close" :value="show" width="800">
    <div class="drawer-body">
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">账号信息</div>
      </div>
      <div class="group-box">
        <ViewItem title="用户名" :value="data.userName" />
        <ViewItem title="登录名" :value="data.loginName" />
        <ViewItem title="姓名" :value="data.nickName" />
        <ViewItem title="手机号码" :value="data.phonenumber" />
        <ViewItem title="邮箱" :value="data.email" />
      </div>
      <div class="box inline-box">
        <div class="text-line item-box" />
        <div class="item-box">角色信息</div>
      </div>
      <div class="group-box">
        <div class="view-tags-box inline-box" v-if="data.roles && data.roles.length > 0">
          <Tag v-for="role in data.roles" :key="role.id" class="view-tag-item" size="large" color="success" type="dot">{{role.roleName}}</Tag>
        </div>
        <div v-else class="inline-box text-info">
          <Icon type="md-information-circle" class="item-box" />
          <div class="item-box">暂无角色信息</div>
        </div>
      </div>
    </div>
  </ViewDrawer>
</template>
<script>

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    data: Object
  },
  methods: {
    close () {
      this.$emit('change', false)
    }
  }
}
</script>
