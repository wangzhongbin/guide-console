
import { post } from '@/config/http'

const basePath = '/info/swiper/'

/**
 * 新增
 */
export const swiperAdd = (data) => post(basePath + 'add', data)

/**
 * 修改
 */
export const swiperUpdate = (data) => post(basePath + 'update', data)

/**
 * 启用、停用
 */
export const swiperPaused = (data) => post(basePath + 'paused', data)
