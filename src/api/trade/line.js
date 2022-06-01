
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const lineView = (id) => get('/manage/touringLine/' + id)

/**
  * 新增、修改
  */
export const lineEdit = (data) => post('/manage/touringLine/lineEdit', data)

/**
 * 删除
 */
export const lineRemove = (id) => get('/manage/touringLine/remove/' + id)

/**
  * 线路排序
  */
export const lineSort = (data) => get('/manage/touringLine/sort', data)
