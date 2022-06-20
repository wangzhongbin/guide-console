
import mutations from './mutations'

import { SET_ACCOUNT, SET_TENANTS } from './constants'

const state = {
  multiTenant: false,
  userId: '',
  deptId: '',
  tenantId: '',
  projectId: '',
  userName: '',
  nickName: '',
  userType: '',
  email: '',
  phonenumber: '',
  tenants: []
}

const actions = {
  saveAccount ({ commit }, account) {
    commit(SET_ACCOUNT, account)
  },
  saveTenants ({ commit }, tenants) {
    commit(SET_TENANTS, tenants)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
