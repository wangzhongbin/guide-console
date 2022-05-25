
import { post, get } from '@/config/http'

// import { roleData } from '@/data/account'

const basePath = '/sys/role'

/**
 * 全部角色查询
 */
export const loadRoles = () => get('/manage/role/optionSelect')
// export const loadRoles = () => {
//   return new Promise((resolve, reject) => {
//     resolve(roleData)
//   })
// }

/**
 * 查询
 */
export const roleView = (id) => get('/manage/role/' + id)

/**
 * 修改
 */
export const roleUpdate = (data) => post(basePath + '/update', data)

/**
 * 新增
 */
export const roleAdd = (data) => post(basePath + '/add', data)

/**
 * 修改
 */
export const updateRoleMenus = (data) => post(basePath + '/config', data)
