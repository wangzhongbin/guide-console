
import { get, post } from '@/config/http'

const basePath = '/common'

/**
 * 列表查询
 */
export const loadPage = (data, url) => {
  return post(url, data)
}

/**
 * 删除
 */
export const commonDelete = (data, group) => {
  data.group = group
  return get(basePath + '/remove', data)
}
