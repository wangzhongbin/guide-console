
import { loadWaitCount } from '@/api/act/task'

import mutations from './mutations'

import { REFRESH_COUNT } from './constants'

const state = {
  leaseTaskCount: 0,
  leaseSignCount: 0,
  borrowTaskCount: 0,
  borrowSignCount: 0
}

const actions = {
  refreshCount ({ commit }) {
    loadWaitCount().then(res => commit(REFRESH_COUNT, res))
  }
}

const getters = {
  waitCount: state => state.leaseTaskCount + state.leaseSignCount + state.borrowTaskCount + state.borrowSignCount
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
