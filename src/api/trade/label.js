
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const labelView = (id) => get('/manage/label/' + id)

/**
  * 新增
  */
export const labelAdd = (data) => post('/manage/label/add', data)

/**
  * 修改
  */
export const labelUpdate = (data) => post('/manage/label/modify', data)

/**
 * 删除
 */
export const labelRemove = (id) => get('/manage/label/remove/' + id)
