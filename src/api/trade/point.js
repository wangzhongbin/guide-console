
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const pointView = (id) => get('/manage/projectTarget/' + id)

/**
  * 新增
  */
export const pointAdd = (data) => post('/manage/projectTarget/add', data)

/**
 * 修改
 */
export const pointUpdate = (data) => post('/manage/projectTarget/modify', data)

/**
 * 删除
 */
export const pointRemove = (id) => get('/manage/projectTarget/remove/' + id)

/**
  * 点位多语言设置
  */
export const multilingual = (data) => post('/manage/projectTarget/multilingual', data)

/**
  * 点位多语言设置
  */
export const multilingualView = (id) => post('/manage/projectTarget/multilingual/info/' + id)
