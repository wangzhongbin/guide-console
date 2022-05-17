
import { post, get } from '@/config/http'

const basePath = '/sys/account'

/**
  * 图片验证码
  */
export const captcha = () => get('/captcha')

/**
   * 登录
   */
export const login = (data) => post('/auth/oauth/token', data)

/**
 * 查询登录信息
 */
export const loadCurrentInfo = () => get(basePath + '/current/info')

/**
 * 信息查询
 */
export const accountView = (id) => get(basePath + '/view', { id })

/**
  * 新增
  */
export const accountAdd = (data) => post(basePath + '/add', data)

/**
  * 修改
  */
export const accountUpdate = (data) => post(basePath + '/update', data)

/**
  * 修改密码
  */
export const changePassword = (data) => post(basePath + '/password', data)

/**
  * 重置密码
  */
export const resetPassword = (data) => post(basePath + '/reset', data)

/**
  * 配置角色
  */
export const updateAccountRole = (data) => post(basePath + '/config', data)

/**
 *  部门会签人查询
 */
export const loadCompanyAccounts = (data) => post(basePath + '/company/list', data)
