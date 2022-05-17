
import { post, get } from '@/config/http'

const basePath = '/info/goods/'

/**
 * 新增
 */
export const goodsAdd = (data) => post(basePath + 'add', data)

/**
 * 修改
 */
export const goodsUpdate = (data) => post(basePath + 'update', data)

/**
 * 启用、停用
 */
export const goodsPaused = (data) => post(basePath + 'paused', data)

/**
 * 设置精选、取消精选
 */
export const goodsChoice = (data) => post(basePath + 'choice', data)

/**
 * 查询详情
 */
export const goodsView = (id) => get(basePath + 'view', { id })
