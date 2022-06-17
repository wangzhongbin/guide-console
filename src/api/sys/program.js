
import { post, get } from '@/config/http'

/**
 * 修改
 */
export const programUpdate = (data) => post('/manage/wxParams/modify', data)

/**
 * 新增
 */
export const programAdd = (data) => post('/manage/wxParams/add', data)

/**
 * 删除
 */
export const programRemove = (id) => get('/manage/wxParams/del/' + id)
