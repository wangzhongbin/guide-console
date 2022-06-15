import { ADD_VIEW, DEL_VIEW, DEL_OTHERS_VIEWS, DEL_ALL_VIEWS, SET_MENUS, SET_TOP_MENUS, SET_CURRENT_TOP_MENU, SET_ALL_MENUS, SET_ROUTES, EMPTY_MENUS } from './constants'

export default {
  [ADD_VIEW] (state, view) {
    if (state.tagViews.length === 0) {
      state.tagViews.push({ id: -1, name: 'HomeIndex', path: '/home/index', code: 'HomeIndex', icon: 'md-home', title: '首页' })
    }
    if (!state.tagViews.some(v => v.path === view.path)) {
      state.tagViews.push({ id: view.meta.id, name: view.name, path: view.path, title: view.meta.title, icon: view.meta.icon, parentTitle: view.meta.parentTitle, parentIcon: view.meta.parentIcon })
    }
    state.currentView = { id: view.meta.id, name: view.name, path: view.path, title: view.meta.title, icon: view.meta.icon, parentTitle: view.meta.parentTitle, parentIcon: view.meta.parentIcon }
    state.currentMenu = view.meta.id
    if (view.meta.id === -1) {
      state.currentTopMenu = state.topMenus[0].id
    } else {
      let pid = view.meta.parentId
      let parentMenu = {}
      do {
        parentMenu = state.allMenus.find(e => e.menuId === pid)
        pid = parentMenu.parentId
      } while (pid !== 0)
      state.currentTopMenu = parentMenu.menuId
    }
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
  [SET_TOP_MENUS] (state, menus) {
    state.topMenus = menus
  },
  [SET_ALL_MENUS] (state, menus) {
    state.allMenus = menus
  },
  [SET_CURRENT_TOP_MENU] (state, menuId) {
    state.currentTopMenu = menuId
  },
  [EMPTY_MENUS] (state) {
    state.routes = []
    state.menus = []
    state.currentView = {}
    state.tagViews = []
    state.currentMenu = 0
  }
}
