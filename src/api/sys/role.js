
import { post, get } from '@/config/http'

/**
 * 全部角色查询
 */
export const loadRoles = () => get('/manage/role/optionSelect')

/**
 * 查询
 */
export const roleView = (id) => get('/manage/role/' + id)

/**
 * 修改
 */
export const roleUpdate = (data) => post('/manage/role/edit', data)

/**
 * 新增
 */
export const roleAdd = (data) => post('/manage/role/add', data)

/**
 * 删除
 */
export const roleRemove = (id) => get('/manage/role/remove/' + id)
