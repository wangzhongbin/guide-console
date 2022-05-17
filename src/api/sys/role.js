
import { post, get } from '@/config/http'

const basePath = '/sys/role'

/**
 * 查询
 */
export const roleView = (id) => get(basePath + '/view', { id })

/**
 * 角色列表查询
 */
export const loadRoles = () => get(basePath + '/list')

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
