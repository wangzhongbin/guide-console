import { SET_ACCOUNT, EMPTY_ACCOUNT } from './constants'

export default {
  [SET_ACCOUNT] (state, account) {
    state.accountId = account.accountId
    state.accountName = account.accountName
    state.loginName = account.loginName
    state.deptId = account.deptId
    state.deptName = account.deptName
    state.companyName = account.companyName
    state.companyCityName = account.companyCityName
  },
  [EMPTY_ACCOUNT] (state) {
    state.accountId = ''
    state.accountName = ''
    state.loginName = ''
    state.deptId = ''
    state.deptName = ''
    state.companyName = ''
    state.companyCityName = ''
  }
}
