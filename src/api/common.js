
import { get } from '@/config/http'

// import { accountList } from '@/data/account'

/**
 * 列表查询
 */
export const loadPage = (url, data) => get(url, data)
// export const loadPage = (url, data) => {
//   return new Promise((resolve, reject) => {
//     resolve(accountList)
//   })
// }

/**
 * 删除
 */
export const commonDelete = (url) => get(url)
