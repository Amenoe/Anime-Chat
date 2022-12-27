import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import localCache from '@/utils/cache'

export default class AxiosUtils {
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.requestInterceptor()
    this.responseInterceptor()
  }
  /**
   * 全局请求拦截器
   */
  private requestInterceptor() {
    if (this.instance === null) return
    this.instance.interceptors.request.use((request) => {
      //可以用来添加请求验证
      const token = localCache.getCache('token')
      if (token) {
        if (request && request.headers) {
          request.headers.Authorization = `Bearer ${token}`
        }
      }
      return request
    })
  }
  /**
   * 全局响应拦截器
   */
  private responseInterceptor() {
    if (this.instance === null) return
    this.instance.interceptors.response.use(
      (response) => {
        //拦截服务器发送的错误代码
        if (response.data.code != 200) {
          console.log('弹出错误')
          ElNotification({
            type: 'error',
            title: `请求错误 ${response.data.code}`,
            message: response.data.message,
          })
        } else {
          return response.data.data
        }
      },
      (error) => {
        console.log(error)
        //拦截服务器发送的错误代码
        if (error.response.status === 500) {
          ElNotification({
            type: 'error',
            title: `请求错误 ${error.response.status}`,
            message: '服务器出现问题，请稍等QAQ',
          })
        } else {
          ElNotification({
            type: 'error',
            title: `请求错误 ${error.response.data.code}`,
            message: error.response.data.message,
          })
        }
        return Promise.reject()
      },
    )
  }
  /**
   * 调用实例的请求
   * @param config 请求参数
   * @returns Promise
   */
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, method: 'POST' })
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, method: 'DELETE' })
  }
}
