
import { post, get } from '@/config/http'

const basePath = '/info/express/'

/**
 * 新增
 */
export const expressAdd = (data) => post(basePath + 'add', data)

/**
 * 修改
 */
export const expressUpdate = (data) => post(basePath + 'update', data)

/**
 * 启用、停用
 */
export const expressPaused = (data) => post(basePath + 'paused', data)

/**
 * 查询有效快递公司
 */
export const expresses = () => get(basePath + 'list')
