/**
 * http配置
 */
import axios from 'axios'

// import qs from 'qs'

import { Message, LoadingBar } from 'view-design'

import { getToken, removeToken } from '@/cookie'

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

LoadingBar.config({ color: '#f6ca9d', height: 3 })

let loading = null

// http request 拦截器
axios.interceptors.request.use(config => {
  LoadingBar.start()
  if (!loading) {
    loading = Message.loading({
      content: '加载中...',
      duration: 0,
      background: true
    })
  }
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
    LoadingBar.finish()
    if (loading) {
      loading()
      loading = null
    }
    if (response.status === 200) {
      const data = response.data
      if (data && data.code === 200) {
        return data
      } else if (data && data.code === 999) {
        Message.error('登录信息过期，请重新登录！')
        removeToken()
        setTimeout(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        }, 500)
      } else {
        if (data.msg) {
          Message.error(data.msg)
        }
        return Promise.reject(response)
      }
    } else {
      Message.error('错误代码：' + response.status)
      return Promise.reject(response)
    }
  }, error => {
    LoadingBar.error()
    if (loading) {
      loading()
      loading = null
    }
    if (error && error.response) {
      Message.error('错误代码：' + error.response.status)
      return Promise.reject(error)
    }
  })

export const get = (uri, params) => axios.get(uri, { params })
export const post = (uri, params) => axios.post(uri, params)
