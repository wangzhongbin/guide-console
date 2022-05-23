<template>
  <div class="menu">
    <div class="menu-box">
      <ul class="menu-group" v-for="menu in visitedMenus" :key="menu.id">
        <div v-if="menu.items && menu.items.length > 0">
          <li class="menu-tip">{{menu.label}}</li>
          <ul v-if="menu.items">
            <li>
              <router-link class="menu-item" v-for="item in menu.items" :to="item.path" :key="item.id" :class="currentMenu === item.id ? 'menu-item-active' : ''">
                <div class="inline-box">
                  <!-- <Icon class="item-box" :type="item.icon || 'md-cube'" /> -->
                  <Icon class="item-box" type="md-cube" />
                  <span class="item-box">{{item.label}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="menu.path">
          <router-link class="menu-item" :to="menu.path" :class="currentMenu === menu.id ? 'menu-item-active' : ''">
            <div class="inline-box">
              <!-- <Icon class="item-box" :type="menu.icon" /> -->
              <Icon class="item-box" type="md-cube" />
              <span class="item-box">{{menu.label}}</span>
            </div>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  computed: {
    visitedMenus: (me) => {
      const menus = me.$store.state.menu.menus
      const topMenu = menus.find(e => e.id === me.currentTopMenu)
      return topMenu && topMenu.items.length > 0 ? topMenu.items : []
    },
    currentTopMenu: (me) => me.$store.state.menu.currentTopMenu,
    menus: (me) => me.$store.state.menu.menus,
    currentMenu: (me) => me.$store.state.menu.currentMenu
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.menu {
  height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}
.menu-box {
  height: calc(100vh - 60px);
  padding: 8px 0;
  overflow-y: auto;
  background-color: #fff;
  width: 220px;
  font-size: 15px;
  position: relative;
  z-index: 1;
}
.menu-group {
  .menu-tip {
    padding: 16px;
    display: flex;
    color: #909399;
    font-size: 12px;
  }
  .menu-item {
    cursor: pointer;
    display: flex;
    padding: 16px 24px;
    color: #181818;
  }
  .menu-item:hover {
    color: #1890ff;
  }
  .menu-item-active {
    color: #1890ff;
    background-image: linear-gradient(to right, #f0faff 98%, #1890ff 2%);
  }
}
</style>
