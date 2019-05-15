import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.0.105:82/api/v1',
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  return response
},
error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        MessageBox({
          title: '消息',
          confirmButtonText: '确定',
          message: '身份验证失败，请重新登录!',
          type: 'error'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            window.location.reload()
          })
        })
        break
      case 403:
        Message({
          showClose: true,
          message: '你没有权限访问该资源!',
          type: 'warning'
        })
        break
      case 400:
        Message({
          showClose: true,
          message: error.response.data.value.error,
          type: 'error'
        })
        break
      case 404:
        Message({
          showClose: true,
          message: error.response.data.value.error,
          type: 'error'
        })
        break
      case 422:
        Message({
          showClose: true,
          message: error.response.data.errors,
          type: 'error'
        })
        break
      case 500:
        Message({
          showClose: true,
          message: '服务器发生内部错误，请稍后再试',
          type: 'error'
        })
        break
    }
  } else {
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
  }
  return Promise.reject(error.response.data)
}
)

export default service
