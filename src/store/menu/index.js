
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
      const routes = assembleRouter(menus)
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

const assembleRouter = (menus) => {
  const routes = menus.filter(e => e.path && e.component && e.code)
  return routes.map(e => {
    const parent = menus.find(m => m.id === e.parentId)
    return {
      path: e.path,
      name: e.code,
      component: loadView(e.component),
      meta: {
        id: e.id,
        title: e.title,
        icon: e.icon,
        parentId: parent ? parent.id : '',
        parentTitle: parent ? parent.title : '',
        parentIcon: parent ? parent.icon : ''
      }
    }
  })
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
