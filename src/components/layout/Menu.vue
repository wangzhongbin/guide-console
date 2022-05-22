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
                  <Icon class="item-box" :type="item.icon" />
                  <span class="item-box">{{item.label}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="menu.path">
          <router-link class="menu-item" :to="menu.path" :class="currentMenu === menu.id ? 'menu-item-active' : ''">
            <div class="inline-box">
              <Icon class="item-box" :type="menu.icon" />
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
    return {
      // visitedMenus: []
    }
  },
  computed: {
    visitedMenus: (me) => {
      const menus = me.$store.state.menu.menus
      console.log(menus)
      console.log(me.currentTopMenu)
      const topMenu = menus.find(e => e.id === me.currentTopMenu)
      console.log(topMenu)
      return topMenu && topMenu.items.length > 0 ? topMenu.items : []
    },
    currentTopMenu: (me) => me.$store.state.menu.currentTopMenu,
    menus: (me) => me.$store.state.menu.menus,
    currentMenu: (me) => me.$store.state.menu.currentMenu,
    openMenus: (me) => me.$store.state.menu.openMenus
  },
  watch: {
    // currentTopMenu (val) {
    //   if (val > 0) {
    //     const topMenu = this.menus.find(e => e.id === val)
    //     const visitedMenus = topMenu && topMenu.items.length > 0 ? topMenu.items : []
    //     this.visitedMenus = visitedMenus
    //     console.log(visitedMenus)
    //   }
    // }
  },
  methods: {
    openMenu (id) {
      const index = this.openMenus.findIndex(m => m === id)
      if (index >= 0) {
        this.openMenus.splice(index, 1)
      } else {
        this.openMenus.push(id)
      }
    }
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
