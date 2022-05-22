
import Home from '@/views/Home.vue'

import { SET_MENUS, SET_TOP_MENUS, OPEN_ALL_MENU, SET_ROUTES } from './constants'

import mutations from './mutations'

const state = {
  routes: [],
  topMenus: [],
  menus: [],
  currentView: {},
  tagViews: [],
  currentMenu: 0,
  currentTopMenu: 0,
  openMenus: []
}

const actions = {
  generateRoutes ({ commit }, data) {
    const topMenus = data.filter(e => e.parentId === 0).map(e => assembleTopMenus(e))
    const menus = data.map(e => assembleMenus(e))
    commit(SET_TOP_MENUS, topMenus)
    return new Promise(resolve => {
      const routes = menus.map(e => assembleRouter(e))
      const route = {
        path: '',
        component: Home,
        children: routes
      }
      commit(SET_ROUTES, route)
      // menus.unshift({ id: 1, title: '首页', icon: 'md-home', code: 'HomeIndex', path: '/home/index' })
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
    title: menu.name,
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

const assembleMenus = (data) => {
  const menu = {
    id: data.id,
    label: data.name,
    code: data.code,
    icon: data.icon,
    path: data.path,
    items: data.children ? data.children.map(e => assembleMenus(e)) : []
  }
  return menu
}

const assembleTopMenus = (data) => {
  const menu = {
    id: data.id,
    name: data.name
  }
  return menu
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
