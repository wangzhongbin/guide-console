import { SET_ACCOUNT, EMPTY_ACCOUNT } from './constants'

export default {
  [SET_ACCOUNT] (state, account) {
    state.multiTenant = account.multiTenant
    state.userId = account.userId
    state.deptId = account.deptId
    state.tenantId = account.tenantId
    state.projectId = account.projectId
    state.userName = account.userName
    state.nickName = account.nickName
    state.userType = account.userType
    state.email = account.email
    state.phonenumber = account.phonenumber
  },
  [EMPTY_ACCOUNT] (state) {
    state.multiTenant = false
    state.userId = ''
    state.deptId = ''
    state.tenantId = ''
    state.projectId = ''
    state.userName = ''
    state.nickName = ''
    state.userType = ''
    state.email = ''
    state.phonenumber = ''
  }
}
