import axios from 'axios'
import Vue from 'vue'
import { eventBus } from "@/mitt/eventBus";

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8888', // 你的后端接口地址
  timeout: 15000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果有 token，就在请求头带上
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      config.headers['satoken'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 统一处理成功响应
    const res = response.data
    if(res.code === 401){
      eventBus.emit("openLogin");
      eventBus.emit("openMask");
    }
    return res
  },
  error => {
    // 统一处理错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Vue.prototype.$message.error('未登录或登录过期，请重新登录')
          break
        case 403:
          Vue.prototype.$message.error('没有权限访问')
          break
        case 500:
          Vue.prototype.$message.error('服务器错误')
          break
        default:
          Vue.prototype.$message.error(error.response.data.message || '请求失败')
      }
    } else {
      Vue.prototype.$message.error('网络异常，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default service
