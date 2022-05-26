import Vue from 'vue'
import Vuex from 'vuex'

import menuModule from './menu'
import accountModule from './account'
import dictModule from './dict'
import infoModule from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menu: menuModule,
    account: accountModule,
    dict: dictModule,
    info: infoModule
  }
})
