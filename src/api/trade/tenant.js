
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const tenantView = (id) => get('/manage/tenant/' + id)

/**
 * 选择列表查询
 */
export const loadTenants = () => get('/manage/select/tenants')

/**
  * 新增
  */
export const tenantAdd = (data) => post('/manage/tenant/add', data)

/**
  * 修改
  */
export const tenantUpdate = (data) => post('/manage/tenant/modify', data)

/**
 * 删除
 */
export const tenantRemove = (id) => get('/manage/tenant/logOff/' + id)
