
import { get, post } from '@/config/http'

const basePath = '/common'

/**
 * 列表查询
 */
export const loadPage = (data, group) => {
  data.group = group
  return post(basePath + '/page', data)
}

/**
 * 删除
 */
export const commonDelete = (data, group) => {
  data.group = group
  return get(basePath + '/remove', data)
}
