
export const accountList = {
  total: 2,
  list: [{
    userId: 1,
    deptId: 1,
    tenantId: 1,
    projectId: 1,
    userName: 'admin',
    nickName: '系统管理员',
    userType: 1,
    email: '',
    phonenumber: '13722223333',
    status: 0
  }, {
    userId: 2,
    deptId: 1,
    tenantId: 1,
    projectId: 1,
    userName: 'admin2',
    nickName: '系统管理员2',
    userType: 1,
    email: '',
    phonenumber: '13722222222',
    status: 0
  }]
}

export const accountData = {
  permissions: [],
  roleIds: [1, 2],
  roles: [],
  user: {
    userId: 1,
    deptId: 1,
    tenantId: 1,
    projectId: 1,
    userName: 'admin',
    nickName: '系统管理员',
    userType: 1,
    email: '',
    phonenumber: '13722223333',
    status: 0
  }
}

export const roleData = [{ roleId: 1, roleName: '超级管理员' }, { roleId: 2, roleName: '租户管理员角色' }, { roleId: 100, roleName: '系统角色' }]
