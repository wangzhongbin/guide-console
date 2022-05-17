import router from '.'

import { loadCurrentInfo } from '@/api/sys/account'

import store from '@/store'

import { getToken } from '@/cookie'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.menu.routes.length === 0) {
        loadCurrentInfo().then(res => {
          const promiseMenu = store.dispatch('menu/generateRoutes', res.menus)
          const promiseAccount = store.dispatch('account/saveAccount', res.account)
          const promiseDict = store.dispatch('dict/setDict', res.dict)
          const promiseMerchant = store.dispatch('info/setMerchants', res.merchants)
          Promise.all([promiseMenu, promiseAccount, promiseDict, promiseMerchant]).then(res => {
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
