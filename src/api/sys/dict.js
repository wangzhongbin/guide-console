
import { post, get } from '@/config/http'

const basePath = '/sys/dict'

/**
  * 新增
  */
export const dictAdd = (data) => post(basePath + '/add', data)

/**
   * 修改
   */
export const dictUpdate = (data) => post(basePath + '/update', data)

/**
 * 字典分组查询
 */
export const loadGroups = () => get(basePath + '/groups')
