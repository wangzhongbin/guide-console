
import { get } from '@/config/http'

/**
 * 列表查询
 */
export const loadPage = (url, data) => get(url, data)

/**
 * 删除
 */
export const commonDelete = (url) => get(url)

/**
 * 省份查询
 */
export const loadProvinces = () => get('/manage/proCity/province')

/**
 * 城市查询
 */
export const loadCitys = (data) => get('/manage/proCity/city', data)

/**
 * 去写查询
 */
export const loadCountys = (data) => get('/manage/proCity/county', data)
