
import { SET_DICT } from './constants'

import mutations from './mutations'

const state = {
  dict: []
}

const actions = {
  setDict ({ commit }, dict) {
    commit(SET_DICT, dict)
  }
}

const getters = {
  borrowTypeDict: state => state.dict.filter(e => e.groupCode === 'BORROW_TYPE'),
  companyRegionDict: state => state.dict.filter(e => e.groupCode === 'COMPANY_REGION'),
  houseSectionDict: state => state.dict.filter(e => e.groupCode === 'HOUSE_SECTION'),
  houseTypeDict: state => state.dict.filter(e => e.groupCode === 'HOUSE_TYPE'),
  houseWayDict: state => state.dict.filter(e => e.groupCode === 'HOUSE_WAY'),
  rentMerchantDict: state => state.dict.filter(e => e.groupCode === 'RENT_MERCHANT'),
  deptTypeDict: state => state.dict.filter(e => e.groupCode === 'DEPT_TYPE'),
  deptLevelDict: state => state.dict.filter(e => e.groupCode === 'DEPT_LEVEL')
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
