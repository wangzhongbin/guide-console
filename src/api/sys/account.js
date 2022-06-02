
import { post, get } from '@/config/http'

import { menuData } from '@/data/menus'

// import { accountData } from '@/data/account'

const basePath = '/sys/account'

/**
  * 图片验证码
  */
export const captcha = () => get('/captcha/')

/**
   * 登录
   */
export const login = (data) => post('/auth/login', data)

/**
 * 查询登录账号信息
 */
export const loadCurrentAccount = () => get('/manage/user/getInfo')

/**
 * 查询当前账号菜单
 */
// export const loadCurrentMenus = () => get('/menu/getRouters')
export const loadCurrentMenus = () => {
  return new Promise((resolve, reject) => {
    resolve(menuData)
  })
}

/**
 * 用户详情查询
 */
export const accountView = (id) => get('/manage/user/' + id)

/**
  * 新增
  */
export const accountAdd = (data) => post('/manage/user/add', data)

/**
  * 修改
  */
export const accountUpdate = (data) => post('/manage/user/edit', data)

/**
 * 删除
 */
export const accountRemove = (id) => get('/manage/user/remove/' + id)

/**
  * 修改密码
  */
export const changePassword = (data) => post(basePath + '/password', data)

/**
  * 重置密码
  */
export const resetPassword = (data) => post('/manage/user/resetPwd', data)
