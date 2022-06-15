
import Home from '@/views/Home.vue'

import { SET_MENUS, SET_TOP_MENUS, SET_ALL_MENUS, SET_ROUTES } from './constants'

import mutations from './mutations'

const state = {
  routes: [],
  topMenus: [],
  allMenus: [],
  menus: [],
  currentView: {},
  tagViews: [],
  currentMenu: 0,
  currentTopMenu: 0
}

const actions = {
  generateRoutes ({ commit }, data) {
    return new Promise(resolve => {
      const menus = data.map(e => assembleMenus(e))
      const topMenus = data.filter(e => e.menuType === 'M').map(e => assembleTopMenus(e))
      const allMenus = data.reduce((arr, e) => arr.concat(getAllMenus(e, 0)), [])
      const routes = allMenus.filter(e => e.path && e.component && e.menuType === 'C').map(e => assembleRouter(e))
      const route = {
        path: '',
        component: Home,
        children: routes
      }
      commit(SET_MENUS, menus)
      commit(SET_TOP_MENUS, topMenus)
      commit(SET_ALL_MENUS, allMenus)
      commit(SET_ROUTES, route)
      // menus.unshift({ id: 1, title: '首页', icon: 'md-home', code: 'HomeIndex', path: '/home/index' })
      resolve([route])
    })
  }
}

const getAllMenus = (menu, pid) => {
  const arr = []
  menu.parentId = pid
  arr.push(menu)
  if (menu.children && menu.children.length > 0) {
    const children = menu.children.reduce((a, e) => a.concat(getAllMenus(e, menu.menuId)), [])
    arr.push(...children)
  }
  return arr
}

const assembleRouter = (menu) => {
  const code = menu.path.replaceAll('/', '') + 'Index'
  const router = {
    path: menu.path,
    name: code,
    component: loadView(menu.component),
    meta: {
      id: menu.menuId,
      title: menu.menuName,
      icon: menu.icon,
      parentId: menu.parentId
    }
  }
  return router
}

const assembleMenus = (data) => {
  const menu = {
    id: data.menuId,
    label: data.menuName,
    icon: data.icon,
    path: data.path,
    items: data.children ? data.children.map(e => assembleMenus(e)) : []
  }
  return menu
}

const assembleTopMenus = (data) => {
  const menu = {
    id: data.menuId,
    name: data.menuName
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
