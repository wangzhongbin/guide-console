
import { post, get } from '@/config/http'

const basePath = '/trade/order/'

/**
 * 查询订单支付状态
 */
export const queryOrder = (id) => post(basePath + 'query', { id })

/**
 * 订单发货
 */
export const shipOrder = (data) => post(basePath + 'ship', data)

/**
 * 订单详情
 */
export const loadOrder = (id) => get(basePath + 'view', { id })
