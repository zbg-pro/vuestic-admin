import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_VIP_DOMAIN

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 20000,
})

/*// 请求拦截器，添加 Token 和其他自定义请求头
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 在这里添加其他自定义请求头
    config.headers['X-Custom-Header'] = 'Custom Value';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

axiosInstance.interceptors.response.use(
  (response) => {
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果没有 token，跳转到指定页面
      window.location.href = '/auth/login' // 这里替换成你的指定页面路径
    }

    // 在响应之后做一些处理
    // 检查返回的数据是否包含 code=10001，如果是，跳转到指定页面
    if (response.data && response.data.code === 10001) {
      window.location.href = '/auth/login' // 这里替换成你的指定页面路径
    }
    return response
  },
  (error) => {
    // 在响应出错时做一些处理
    return Promise.reject(error)
  },
)

// 公共的 HTTP POST 方法，可以在这里追加自定义头部
export async function httpPost<T>(url: string, data: any): Promise<AxiosResponse<T>> {
  /*const customHeaders = {
    'Custom-Header2': 'custom-value',
    // 添加其他请求头...
  };

  const mergedHeaders = {
    ...axiosInstance.defaults.headers,  // 复制原有的请求头信息
    ...customHeaders,                    // 添加额外的请求头信息
  };*/
  const token = localStorage.getItem('token')
  if (token) {
    const separator = url.includes('?') ? '&' : '?'
    // Append the token parameter to the URL
    url = url + separator + 'token=' + token
  }

  return axiosInstance.post<T>(url, data /*, { headers: mergedHeaders }*/)
}

// 公共的 HTTP GET 方法，可以在这里追加自定义头部
export async function httpGet<T>(url: string, data: any): Promise<AxiosResponse<T>> {
  const token = localStorage.getItem('token')

  if (!data) {
    data = {}
  }
  data.token = token
  console.log('data:', data)
  return axiosInstance.get<T>(url, data)
}
