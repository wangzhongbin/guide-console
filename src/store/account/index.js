
import mutations from './mutations'

import { SET_ACCOUNT } from './constants'

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
  phonenumber: ''
}

const actions = {
  saveAccount ({ commit }, account) {
    commit(SET_ACCOUNT, account)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
