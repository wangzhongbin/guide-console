import { ADD_VIEW, DEL_VIEW, DEL_OTHERS_VIEWS, DEL_ALL_VIEWS, SET_MENUS, OPEN_ALL_MENU, SET_ROUTES, EMPTY_MENUS } from './constants'

export default {
  [ADD_VIEW] (state, view) {
    if (state.tagViews.length === 0) {
      state.tagViews.push({ id: 1, name: 'HomeIndex', path: '/home/index', code: 'HomeIndex', icon: 'md-home', title: '首页' })
    }
    if (!state.tagViews.some(v => v.path === view.path)) {
      state.tagViews.push({ id: view.meta.id, name: view.name, path: view.path, title: view.meta.title, icon: view.meta.icon, parentTitle: view.meta.parentTitle, parentIcon: view.meta.parentIcon })
    }
    state.currentView = { id: view.meta.id, name: view.name, path: view.path, title: view.meta.title, icon: view.meta.icon, parentTitle: view.meta.parentTitle, parentIcon: view.meta.parentIcon }
    if (!state.openMenus.some(m => m === view.meta.parentId)) {
      state.openMenus.push(view.meta.parentId)
    }
    state.currentMenu = view.meta.id
  },
  [OPEN_ALL_MENU] (state, menus) {
    state.openMenus = menus.filter(e => !e.path && e.level === 1).map(e => e.id)
  },
  [SET_ROUTES] (state, routes) {
    state.routes = routes
  },
  [DEL_VIEW] (state, index) {
    state.tagViews.splice(index, 1)
  },
  [DEL_OTHERS_VIEWS] (state, view) {
  },
  [DEL_ALL_VIEWS] (state, view) {
  },
  [SET_MENUS] (state, menus) {
    state.menus = menus
  },
  [EMPTY_MENUS] (state, menus) {
    state.routes = []
    state.menus = []
    state.currentView = {}
    state.tagViews = []
    state.currentMenu = 0
    state.openMenus = []
  }
}
