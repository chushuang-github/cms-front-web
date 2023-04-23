import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus'
// 导入axios.create创建的实例类型，这个类型是什么编译器会提示的
// axios库内部会提供对应的类型，这个类型在axios库内部index.d.ts文件里面声明好了
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loadingInstance?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 如果this.showIoading为null或undefined时，config.showLoading=true
    this.showLoading = config.showLoading ?? true
    // 请求拦截器和响应拦截器(下面的拦截器是针对每一个HYRequest类实例的)
    // 创建实例时单独传进来的函数作为每一个实例单独的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 创建的所有的实例都有的拦截器(全局拦截)
    // 请求拦截器：先添加的拦截器后执行，后添加的拦截器先执行
    // 响应拦截器：先添加的拦截器先执行，后添加的拦截器后执行
    this.instance.interceptors.request.use(
      (config) => {
        // 加载
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: 'loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 关闭加载
        this.loadingInstance?.close()
        return res.data
      },
      (err) => {
        this.loadingInstance?.close()
        // 这里用到是if，真实的开发中可以使用switch语句
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独的对每一个请求进行拦截器处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}
export default HYRequest
