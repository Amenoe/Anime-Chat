import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

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
        if (response.data.code != 0) {
          ElNotification({
            type: 'error',
            title: `请求错误 ${response.data.code}`,
            message: response.data.msg,
          })
        } else {
          return response.data.data
        }
      },
      (error) => {
        const status = error.toString()
        console.log(status)
        if (
          ['timeout ', 'Invalid URL', '401', '403', '404', '500', 'Network Error'].some((item) => {
            return status.includes(item)
          })
        ) {
          // store.dispatch('logout')
          ElNotification({
            type: 'error',
            title: '资源获取错误',
            message: '请求源存在问题，请检查或修改 服务器地址',
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
