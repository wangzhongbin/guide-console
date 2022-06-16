
import { post, get } from '@/config/http'

/**
 * 修改
 */
export const programUpdate = (data) => post('/manange/wxParams/modify', data)

/**
 * 新增
 */
export const programAdd = (data) => post('/manange/wxParams/add', data)

/**
 * 删除
 */
export const programRemove = (id) => get('/manange/wxParams/del/' + id)
