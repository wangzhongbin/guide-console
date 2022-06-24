<template>
  <div class="menu">
    <div class="logo-box inline-box">
      <Icon type="logo-codepen" class="item-box" />
      <div class="item-box">后台管理系统</div>
    </div>
    <!-- <div class="menu-box">
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
    </div> -->
    <div class="menu-box">
      <ul class="menu-group" v-for="menu in visitedMenus" :key="menu.id">
        <div v-if="menu.items && menu.items.length > 0">
          <div class="menu-content">
            <li class="menu-item cell-box" @click="openMenu(menu.id)">
              <div class="inline-box">
                <Icon class="item-box" :type="menu.icon" />
                <span class="item-box">{{menu.label}}</span>
              </div>
              <div class="t-transform" :style="{transform: openMenus.findIndex(m => m === menu.id) >= 0 ? 'rotate(-180deg)' : 'rotate(0deg)'}">
                <Icon type="ios-arrow-down" />
              </div>
            </li>
          </div>
          <div v-if="menu.items" class="t-max-height" :style="{maxHeight: openMenus.findIndex(m => m === menu.id) >= 0 ? menu.items.length * 60 + 'px': '0px'}">
            <ul class="menu-group-box menu-content">
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
        </div>
        <div v-else-if="menu.path" class="menu-content">
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
    currentMenu: (me) => me.$store.state.menu.currentMenu,
    openMenus: (me) => me.$store.state.menu.openMenus
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
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.logo-box {
  height: 60px;
  background-color: #1d1e23;
  border-bottom: 2px solid #e0b712;
  color: #e0b712;
  font-weight: 500;
  font-size: 16px;
  padding: 8px;
  .logo-image {
    width: 16px;
    height: 16px;
  }
}
.menu-box {
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #1d1e23;
  width: 220px;
  font-size: 15px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}
.menu-group {
  .menu-content {
    padding: 4px;
  }
  .menu-item {
    padding: 16px;
    cursor: pointer;
    display: flex;
    color: #ddd;
  }
  .menu-group-box {
    background-color: #101117;
    .menu-item {
      padding: 16px 24px;
    }
  }
  .menu-item:hover {
    color: #fff;
  }
  .menu-item-active {
    color: #fff;
    background-color: #1890ff;
  }
}
</style>
