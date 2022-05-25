
import { get } from '@/config/http'

/**
 * 查询
 */
export const loadMenus = () => get('/manage/menu/treeselect')
