<template>
  <div class="header inline-box">
    <div class="logo-box inline-box">
      <!-- <img :src="logo" class="box logo-image" /> -->
      <Icon type="md-map" class="item-box" size="20" />
      <div class="item-box">后台管理系统</div>
    </div>
    <div class="icon-button">
      <Icon type="ios-home" size="20" />
    </div>
    <div class="header-menu">
      <div class="menu-box inline-box" :class="currentTopMenu === item.id ? 'menu-active' : ''" v-for="item in topMenus" :key="item.id" @click="clickTopMenu(item.id)">
        <Icon class="item-box" :type="item.icon" />
        <!-- <Icon class="item-box" type="ios-paper" /> -->
        <div class="item-box">{{item.name}}</div>
      </div>
    </div>
    <Dropdown class="box" trigger="click" placement="bottom-end" @on-click="clickDropdown">
      <div class="inline-box top-bar">
        <Avatar class="item-box avatar-primary" size="small" icon="md-person" />
        <div class="item-box inline-box">
          <div class="gap-box">{{account.nickName}}</div>
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
        <!-- <DropdownItem name="password">
          <div class="box inline-box">
            <Icon type="md-key" class="gap-box" />
            <div class="gap-box">修改密码</div>
          </div>
        </DropdownItem> -->
        <DropdownItem name="logout">
          <div class="box inline-box logout-btn">
            <Icon type="md-power" class="gap-box" />
            <div class="gap-box">退出登录</div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <EditModal width="550" title="修改密码" :forms="editForms" @ok="ok" v-model="showEdit" />

    <ViewDrawer title="我的信息" @close="showInfo=false" :value="showInfo" width="480">
      <div class="box cell-box">
        <div class="text-info">登录名</div>
        <div class="text-title-small">{{account.userName}}</div>
      </div>
      <div class="box cell-box">
        <div class="text-info">姓名</div>
        <div class="text-title-small">{{account.nickName}}</div>
      </div>
      <div class="box cell-box">
        <div class="text-info">手机号码</div>
        <div class="text-title-small">{{account.phonenumber}}</div>
      </div>
      <div class="box cell-box">
        <div class="text-info">邮箱</div>
        <div class="text-title-small">{{account.email}}</div>
      </div>
    </ViewDrawer>

  </div>
</template>

<script>

import { mapMutations } from 'vuex'

import { EMPTY_MENUS, SET_CURRENT_TOP_MENU } from '@/store/menu/constants'

import { EMPTY_ACCOUNT } from '@/store/account/constants'

import { EMPTY_DICT } from '@/store/dict/constants'

import { removeToken } from '@/cookie'

// import { changePassword } from '@/api/sys/account'

import logo from '@/assets/images/logo.png'

export default {
  name: 'Header',
  data () {
    return {
      logo,
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
    topMenus: (me) => me.$store.state.menu.topMenus,
    currentTopMenu: (me) => me.$store.state.menu.currentTopMenu,
    account: (me) => me.$store.state.account
  },
  methods: {
    ...mapMutations('menu', [EMPTY_MENUS, SET_CURRENT_TOP_MENU]),
    ...mapMutations('account', [EMPTY_ACCOUNT]),
    ...mapMutations('dict', [EMPTY_DICT]),
    ok (fromData, callback, closeLoading) {
      // const { oldPassword, password, confirmPassword } = fromData
      // if (confirmPassword !== password) {
      //   this.$Message.error('两次新密码输入不一致！')
      //   closeLoading()
      // } else {
      // changePassword({ oldPassword, password }).then(() => {
      //   callback()
      //   this.$Message.success('修改成功')
      // }).catch(() => { closeLoading() })
      // }
    },
    clickTopMenu (id) {
      this[SET_CURRENT_TOP_MENU](id)
    },
    clickDropdown (name) {
      if (name === 'logout') {
        removeToken()
        this[EMPTY_MENUS]()
        this[EMPTY_ACCOUNT]()
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
  border-bottom: 1px solid #ebedf0;
  background: #fff;
  z-index: 999;
  align-items: center;
  .logo-box {
    width: 220px;
    height: 60px;
    font-size: 16px;
    color: #120d09;
    padding: 8px;
    .logo-image {
      width: 20px;
      height: 20px;
    }
  }
  .icon-button {
    padding: 18px 20px;
    color: #495060;
    cursor: pointer;
    border-radius: 2px;
  }
  .icon-button:hover {
    background: #f0faff;
  }
  .header-menu {
    display: flex;
    flex: 1;
    padding: 0 8px;
    .menu-box {
      padding: 18px 20px;
      cursor: pointer;
    }
    .menu-box:hover {
      color: #1a73e8;
    }
    .menu-active {
      background-image: linear-gradient(to top, #f0faff 92%, #1a73e8 8%);
      color: #1a73e8;
    }
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
