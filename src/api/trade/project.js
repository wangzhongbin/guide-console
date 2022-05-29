
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const projectView = (id) => get('/manage/project/' + id)

/**
  * 新增
  */
export const projectAdd = (data) => post('/manage/project/add', data)

/**
  * 修改
  */
export const projectUpdate = (data) => post('/manage/project/modify', data)

/**
 * 修改状态
 */
export const changeStatus = (data) => get('/manage/project/changeStatus', data)
