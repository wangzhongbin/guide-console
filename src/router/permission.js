import Vue from 'vue'

import router from '.'

import AMapLoader from '@amap/amap-jsapi-loader'

import { loadCurrentAccount, loadCurrentMenus } from '@/api/sys/account'

import store from '@/store'

import { getToken, getMultiTenant } from '@/cookie'

import { loadTenants } from '@/api/trade/tenant'

const AMapKey = '4ffc3076f691997d55c31989ea58bed1'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.menu.routes.length === 0) {
        AMapLoader.load({
          key: AMapKey,
          version: '2.0',
          AMapUI: {
            version: '1.1',
            plugins: ['misc/PoiPicker']
          }
        }).then((AMap) => {
          Vue.prototype.$AMap = AMap
          Promise.all([loadCurrentAccount(), loadCurrentMenus()]).then(res => {
            const user = res[0].data.user
            const ossDomain = res[0].data.ossDomain
            const multiTenant = getMultiTenant()
            user.multiTenant = multiTenant
            const promiseAccount = store.dispatch('account/saveAccount', user)
            const promiseMenu = store.dispatch('menu/generateRoutes', res[1].data)
            const promiseDomain = store.dispatch('info/setDomain', ossDomain)
            Promise.all([promiseMenu, promiseAccount, promiseDomain]).then(res => {
              router.addRoutes(res[0])
              if (multiTenant) {
                loadTenants().then(res => {
                  const tenants = res.data && res.data.length > 0 ? res.data.map(e => {
                    return { value: e.tenantId, label: e.tenantName }
                  }) : []
                  store.dispatch('account/saveTenants', tenants).then(() => {
                    next({ path: to.path })
                  })
                })
              } else {
                next({ path: to.path })
              }
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
