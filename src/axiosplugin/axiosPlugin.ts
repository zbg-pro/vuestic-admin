// axiosPlugin.ts
import axios, { AxiosInstance } from 'axios'

export default function createAxiosInstance(): AxiosInstance {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8084',
    //baseURL: import.meta.env.VITE_BACKEND_VIP_DOMAIN,
    timeout: 5000,
  })

  // 请求拦截器，添加 Token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}
