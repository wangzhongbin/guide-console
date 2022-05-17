
import mutations from './mutations'

import { SET_ACCOUNT } from './constants'

const state = {
  accountId: '',
  accountName: '',
  loginName: '',
  deptId: '',
  deptName: '',
  companyName: '',
  companyCityName: ''
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
