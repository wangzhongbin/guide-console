
import { post, get } from '@/config/http'

/**
 * 详情查询
 */
export const projectView = (data) => get('/manage/project/info', data)

/**
 * 选择列表查询
 */
export const loadProjects = () => get('/manage/select/projects')

/**
  * 新增
  */
export const projectAdd = (data) => post('/manage/project/add', data)

/**
  * 修改
  */
export const projectUpdate = (data) => post('/manage/project/modify', data)

/**
 * 修改状态
 */
export const changeStatus = (data) => get('/manage/project/changeStatus', data)

/**
 * 用户授权项目查询
 */
export const loadAuthProjects = (data) => get('/manage/proAuth/authList', data)

/**
 * 新增修改用户授权项目
 */
export const changeAuthProject = (data) => post('/manage/proAuth/addAuth', data)
