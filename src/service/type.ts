import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 定义接口
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 定义接口对AxiosRequestConfig接口类型进行扩展
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
export interface IDataType<T = any> {
  data: T
  code: number
}
