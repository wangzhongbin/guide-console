
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
    console.log(data)
    return new Promise(resolve => {
      const menus = data.map(e => assembleMenus(e))
      const topMenus = data.filter(e => e.menuType === 'M').map(e => assembleTopMenus(e))
      const allMenus = data.reduce((arr, e) => arr.concat(getAllMenus(e)), [])
      const routes = allMenus.filter(e => e.path && e.component && e.code).map(e => assembleRouter(e))
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

const getAllMenus = (menu) => {
  const arr = []
  arr.push(menu)
  if (menu.children && menu.children.length > 0) {
    const children = menu.children.reduce((a, e) => a.concat(getAllMenus(e)), [])
    arr.push(...children)
  }
  return arr
}

const assembleRouter = (menu) => {
  const router = {
    path: menu.path,
    name: menu.code,
    title: menu.name,
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
    code: data.menuId,
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
