<template>
  <div class="header">
    <div class="header-content cell-box border-bottom">
      <transition-group name="breadcrumb">
        <span class="breadcrumb-item inline-box" v-for="(item, index) in breadcrumbs" :key="item.title">
          <router-link class="inline-box" :class="item.path ? 'breadcrumb-path' : ''" :to="item.path">
            <Icon :type="item.icon" class="gap-box" />
            <span class="gap-box">{{item.title}}</span>
          </router-link>
          <span class="breadcrumb-separator" v-show="index !== breadcrumbs.length - 1">/</span>
        </span>
      </transition-group>
      <Dropdown class="box" trigger="click" placement="bottom-end" @on-click="clickDropdown">
        <div class="inline-box top-bar">
          <Avatar class="item-box avatar-primary" size="small" icon="md-person" />
          <div class="item-box inline-box">
            <div class="gap-box">{{accountName}}</div>
            <Icon type="md-arrow-dropdown" class="gap-box" size="20" />
          </div>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem name="info">
            <div class="box inline-box">
              <Icon type="md-alert" class="gap-box" />
              <div class="gap-box">我的信息</div>
            </div>
          </DropdownItem>
          <DropdownItem name="password">
            <div class="box inline-box">
              <Icon type="md-key" class="gap-box" />
              <div class="gap-box">修改密码</div>
            </div>
          </DropdownItem>
          <DropdownItem name="logout">
            <div class="box inline-box logout-btn">
              <Icon type="md-power" class="gap-box" />
              <div class="gap-box">退出登录</div>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="tag-box">
      <router-link class="tag-item border-box inline-box" :class="currentView.path === tag.path ? 'tag-item-active' : ''" v-for="(tag, index) in tagViews" :to="tag.path" :key="index">
        <div class="inline-box item-box">
          <Icon :color="currentView.path === tag.path ? '#19be6b':'#495060'" :type="tag.icon" class="gap-box" />
          <div class="gap-box">{{tag.title}}</div>
        </div>
        <Icon v-show="tag.id !== 1" class="item-box" type="md-close-circle" @click.prevent.stop="closeView(tag)" />
      </router-link>
    </div>

    <EditModal width="550" title="修改密码" :forms="editForms" @ok="ok" v-model="showEdit" />

    <ViewDrawer title="我的信息" @close="showInfo=false" :value="showInfo" width="480">
      <div class="box cell-box">
        <div class="text-info">登录名</div>
        <div class="text-title-small">{{loginName}}</div>
      </div>
      <div class="box cell-box">
        <div class="text-info">员工姓名</div>
        <div class="text-title-small">{{accountName}}</div>
      </div>
      <div class="box cell-box">
        <div class="text-info">所在部门</div>
        <div class="text-title-small">{{deptName}}</div>
      </div>
      <div class="box cell-box" v-if="companyName">
        <div class="text-info">所在公司</div>
        <div class="text-title-small">{{companyName}}</div>
      </div>
      <div class="box cell-box" v-if="companyCityName">
        <div class="text-info">所在市公司</div>
        <div class="text-title-small">{{companyCityName}}</div>
      </div>
    </ViewDrawer>

  </div>
</template>

<script>

import { mapMutations } from 'vuex'

import { DEL_VIEW, EMPTY_MENUS } from '@/store/menu/constants'

import { EMPTY_ACCOUNT } from '@/store/account/constants'

import { EMPTY_DICT } from '@/store/dict/constants'

import { EMPTY_MERCHANTS } from '@/store/info/constants'

import { removeToken } from '@/cookie'

import { changePassword } from '@/api/sys/account'

export default {
  name: 'Header',
  data () {
    return {
      showInfo: false,
      showEdit: false,
      editForms: [
        { title: '原账户密码', key: 'oldPassword', type: 'password', required: true },
        { title: '新账户密码', key: 'password', type: 'password', required: true },
        { title: '新密码确认', key: 'confirmPassword', type: 'password', required: true }],
      int: null
    }
  },
  computed: {
    breadcrumbs: (me) => {
      const breadcrumbs = []
      breadcrumbs.push({ title: '首页', icon: 'md-home', path: '/home/index' })
      if (me.$route.name !== 'HomeIndex') {
        const currentView = me.$store.state.menu.currentView
        // breadcrumbs.push({ title: currentView.parentTitle, icon: currentView.parentIcon, path: '' })
        breadcrumbs.push({ title: currentView.title, icon: currentView.icon, path: '' })
      }
      return breadcrumbs
    },
    currentView: (me) => me.$store.state.menu.currentView,
    tagViews: (me) => me.$store.state.menu.tagViews,
    accountName: (me) => me.$store.state.account.accountName,
    loginName: (me) => me.$store.state.account.loginName,
    deptName: (me) => me.$store.state.account.deptName,
    companyName: (me) => me.$store.state.account.companyName,
    companyCityName: (me) => me.$store.state.account.companyCityName
  },
  methods: {
    ...mapMutations('menu', [DEL_VIEW, EMPTY_MENUS]),
    ...mapMutations('account', [EMPTY_ACCOUNT]),
    ...mapMutations('info', [EMPTY_MERCHANTS]),
    ...mapMutations('dict', [EMPTY_DICT]),
    ok (fromData, callback, closeLoading) {
      const { oldPassword, password, confirmPassword } = fromData
      if (confirmPassword !== password) {
        this.$Message.error('两次新密码输入不一致！')
        closeLoading()
      } else {
        changePassword({ oldPassword, password }).then(() => {
          callback()
          this.$Message.success('修改成功')
        }).catch(() => { closeLoading() })
      }
    },
    closeView (tag) {
      const index = this.tagViews.findIndex(v => v.path === tag.path)
      if (index >= 0) {
        this[DEL_VIEW](index)
        if (this.$route.path === tag.path) {
          if (index > this.tagViews.length - 1) {
            const nextView = this.tagViews[this.tagViews.length - 1]
            this.$router.push({ path: nextView.path })
          } else {
            const nextView = this.tagViews[index]
            this.$router.push({ path: nextView.path })
          }
        }
      }
    },
    clickDropdown (name) {
      if (name === 'logout') {
        removeToken()
        this[EMPTY_MENUS]()
        this[EMPTY_ACCOUNT]()
        this[EMPTY_MERCHANTS]()
        this[EMPTY_DICT]()
        this.$router.push({ path: '/login' })
      }
      if (name === 'info') {
        this.showInfo = true
      }
      if (name === 'password') {
        this.showEdit = true
      }
    },
    handleWait (name) {
      if (name === 'lease-sign') this.$router.push({ name: 'LeaseSignIndex' })
      if (name === 'lease-task') this.$router.push({ name: 'LeaseTaskIndex' })
      if (name === 'borrow-sign') this.$router.push({ name: 'BorrowSignIndex' })
      if (name === 'borrow-task') this.$router.push({ name: 'BorrowTaskIndex' })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  align-items: center;
  .header-content {
    padding: 16px;
    align-items: center;
    .breadcrumb-item {
      display: inline-flex;
      color: #999;
      font-size: 14px;
      line-height: 22px;
      a {
        color: #999;
      }
    }
    .breadcrumb-path {
      color: #131313 !important;
    }
    .breadcrumb-separator {
      margin: 0 12px;
      font-weight: 800;
      color: #c0c4cc;
      font-size: 16px;
    }
  }
  .tag-box {
    padding: 4px 16px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .tag-item {
      padding: 4px 12px;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      color: #495060;
      border-radius: 4px;
    }
    .tag-item + .tag-item {
      margin-left: 4px;
    }
    .tag-item-active {
      color: #fff;
      background: #1890ff;
    }
  }

  .top-bar {
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: #131313;
  }

  .logout-btn {
    color: #ed4014;
  }
}
.avatar-primary {
  background-color: #1890ff;
}
.avatar-error {
  background-color: #ed4014;
}
</style>
