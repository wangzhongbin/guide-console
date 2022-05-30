import router from '.'

import { loadCurrentAccount, loadCurrentMenus } from '@/api/sys/account'

import store from '@/store'

import { getToken, getMultiTenant } from '@/cookie'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.menu.routes.length === 0) {
        Promise.all([loadCurrentAccount(), loadCurrentMenus()]).then(res => {
          const user = res[0].data.user
          user.multiTenant = getMultiTenant()
          const promiseAccount = store.dispatch('account/saveAccount', user)
          const promiseMenu = store.dispatch('menu/generateRoutes', res[1])
          Promise.all([promiseMenu, promiseAccount]).then(res => {
            router.addRoutes(res[0])
            next({ path: to.path })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
