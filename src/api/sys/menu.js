
import { get } from '@/config/http'

const basePath = '/sys/menu'

/**
 * 查询
 */
export const loadMenus = () => get(basePath + '/list')
