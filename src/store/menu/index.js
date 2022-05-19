
import Home from '@/views/Home.vue'

import { SET_MENUS, OPEN_ALL_MENU, SET_ROUTES } from './constants'

import mutations from './mutations'

const state = {
  routes: [],
  menus: [],
  currentView: {},
  tagViews: [],
  currentMenu: 0,
  openMenus: []
}

const actions = {
  generateRoutes ({ commit }, menus) {
    return new Promise(resolve => {
      const routes = menus.map(e => assembleRouter(e))
      const route = {
        path: '',
        component: Home,
        children: routes
      }
      commit(SET_ROUTES, route)
      menus.unshift({ id: 1, title: '首页', icon: 'md-home', code: 'HomeIndex', path: '/home/index' })
      commit(SET_MENUS, menus)
      commit(OPEN_ALL_MENU, menus)
      resolve([route])
    })
  }
}

const assembleRouter = (menu) => {
  const router = {
    path: menu.path,
    name: menu.code,
    component: loadView(menu.component),
    meta: {
      id: menu.id,
      title: menu.name,
      icon: menu.icon,
      parentId: menu.parentId
    }
  }
  if (menu.children && menu.children.length > 0) {
    router.children = menu.children.map(e => assembleRouter(e))
  }
  return router
}

const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
