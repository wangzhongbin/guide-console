
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const classifyView = (id) => get('/manage/classify/' + id)

/**
  * 新增
  */
export const classifyAdd = (data) => post('/manage/classify/add', data)

/**
  * 修改
  */
export const classifyUpdate = (data) => post('/manage/classify/modify', data)

/**
 * 删除
 */
export const classifyRemove = (id) => get('/manage/classify/remove/' + id)
