
import { post, get } from '@/config/http'

const basePath = '/trade/refund/'

/**
 * 订单退款
 */
export const startRefund = (data) => post(basePath + 'start', data)

/**
 * 退款查询
 */
export const queryRefund = (id) => post(basePath + 'query', { id })

/**
 * 退款详情
 */
export const loadRefund = (id) => get(basePath + 'view', { id })
