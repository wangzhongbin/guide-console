import Vue from 'vue'

import router from '.'

import AMapLoader from '@amap/amap-jsapi-loader'

import { loadCurrentAccount, loadCurrentMenus } from '@/api/sys/account'

import store from '@/store'

import { getToken, getMultiTenant } from '@/cookie'

const AMapKey = '14ff59bcf6861a3ba126adc6e6522ef5'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.menu.routes.length === 0) {
        AMapLoader.load({ key: AMapKey, version: '2.0' }).then((AMap) => {
          Vue.prototype.$AMap = AMap
          Promise.all([loadCurrentAccount(), loadCurrentMenus()]).then(res => {
            const user = res[0].data.user
            const ossDomain = res[0].data.ossDomain
            user.multiTenant = getMultiTenant()
            const promiseAccount = store.dispatch('account/saveAccount', user)
            const promiseMenu = store.dispatch('menu/generateRoutes', res[1].data)
            const promiseDomain = store.dispatch('info/setDomain', ossDomain)
            Promise.all([promiseMenu, promiseAccount, promiseDomain]).then(res => {
              router.addRoutes(res[0])
              next({ path: to.path })
            })
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
