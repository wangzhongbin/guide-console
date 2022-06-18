
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const pointView = (data) => get('/manage/projectTarget/info', data)

/**
  * 新增
  */
export const pointAdd = (data) => post('/manage/projectTarget/add', data)

/**
 * 修改
 */
export const pointUpdate = (data) => post('/manage/projectTarget/edit', data)

/**
 * 删除
 */
export const pointRemove = (id) => get('/manage/projectTarget/remove/' + id)

/**
 * 根据项目和语言查询点位
*/
export const loadPinots = (data) => get('/manage/projectTarget/selectByProjectId', data)

/**
  * 点位多语言设置
  */
export const multilingual = (data) => post('/manage/projectTarget/multilingual', data)

/**
  * 点位多语言设置
  */
export const multilingualView = (id) => post('/manage/projectTarget/multilingual/info/' + id)
