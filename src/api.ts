import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_VIP_DOMAIN

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
})

// 请求拦截器，添加 Token
axiosInstance.interceptors.request
  .use
  /*(config: AxiosRequestConfig) => {
    console.log('header1', config.headers)

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('header', config.headers)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }*/
  ()

// 公共的 HTTP POST 方法，可以在这里追加自定义头部
export async function httpPost<T>(
  url: string,
  data: any,
  customHeaders: Record<string, string> = {},
): Promise<AxiosResponse<T>> {
  if (!customHeaders) {
    customHeaders = {}
  }

  const token = localStorage.getItem('token')
  if (token) {
    customHeaders['Authorization'] = `Bearer ${token}`
  }

  /*const headers = {
    ...axiosInstance.defaults.headers, // 复制原始请求头信息
    //...customHeaders, // 添加自定义头部
  };

  //Object.assign(headers.common, customHeaders);
  if (token) {
    headers.common['Authorization'] = `Bearer ${token}`;
  }

  console.log('headers', headers)*/
  return axiosInstance.post<T>(url, data /*, { headers }*/)
}

// 公共的 HTTP GET 方法，可以在这里追加自定义头部
export async function httpGet<T>(
  url: string,
  data: any,
  customHeaders: Record<string, string> = {},
): Promise<AxiosResponse<T>> {
  if (!customHeaders) {
    customHeaders = {}
  }

  const token = localStorage.getItem('token')
  if (token) {
    customHeaders['Authorization'] = `Bearer ${token}`
  }

  /*const headers = {
    ...axiosInstance.defaults.headers, // 复制原始请求头信息
    //...customHeaders, // 添加自定义头部
  };

  //Object.assign(headers.common, customHeaders);
  if (token) {
    headers.common['Authorization'] = `Bearer ${token}`;
  }

  console.log('headers', headers)*/
  return axiosInstance.get<T>(url, data /*, { headers }*/)
}
