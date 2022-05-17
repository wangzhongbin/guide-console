
import { post, get } from '@/config/http'

const basePath = '/info/type/'

/**
 * 新增
 */
export const typeAdd = (data) => post(basePath + 'add', data)

/**
 * 修改
 */
export const typeUpdate = (data) => post(basePath + 'update', data)

/**
 * 启用、停用
 */
export const typePaused = (data) => post(basePath + 'paused', data)

/**
 * 查询有效商品类目
 */
export const goodsTypes = () => get(basePath + 'list')
