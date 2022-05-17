/**
 * http配置
 */
import axios from 'axios'

import qs from 'qs'

import { Message, LoadingBar } from 'view-design'

import { getToken, removeToken } from '@/cookie'

const baseURL = process.env.NODE_ENV === 'production'
  ? '/api' : '/api'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
// axios.defaults.headers.post['Content-Type'] = 'application/json'

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
    config.headers.token = token
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
      if (data && response.config.url === '/house/lease/report/export') {
        return data
      }
      if (data && data.code === 1) {
        return data.data
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
      if (error.response.status === 401) {
        Message.error('登录信息过期，请重新登录！')
        removeToken()
        setTimeout(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        }, 500)
      } else {
        Message.error('错误代码：' + error.response.status)
        return Promise.reject(error)
      }
    }
  })

export const get = (uri, params) => axios.get(uri, { params })
export const post = (uri, params) => axios.post(uri, qs.stringify(params))
export const download = (uri, params, method, filename) => {
  return new Promise((resolve, reject) => {
    axios({ method, url: uri, responseType: 'blob', params }).then((res) => {
      const aLink = document.createElement('a')
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      aLink.href = URL.createObjectURL(blob)
      aLink.download = filename
      document.body.appendChild(aLink)
      aLink.click()
      resolve(filename)
    }).catch(res => reject(res))
  })
}
