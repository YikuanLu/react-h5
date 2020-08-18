import Axios, {
  AxiosResponse, AxiosError, AxiosPromise, AxiosRequestConfig
} from 'axios'
import qs from 'qs'
import { StrMap, StoreValue } from '@/global'

interface HttpConfig {
  timeout: number;
}

export interface DataProps {
  [propsName: string]: StoreValue
}

const axiosConfig: HttpConfig = {
  timeout: 600000,
}

const instance = Axios.create(axiosConfig)

const encodeParams = (data: StrMap): string => Object.entries(data)
  .filter((([_, val]) => val !== undefined))
  .map(([key, val]) => `${key}=${val}`)
  .join('&')

// 请求前拦截
instance.interceptors.request.use(
  (req) => {
    // 序列化get请求参数
    if (req.method === 'get') {
      const encodeStr = encodeURI(encodeParams(req.params))
      req.url = encodeStr ? `${req.url}?${encodeStr}` : req.url
      req.params = {}
    }
    return req
  },
  err => Promise.reject(err)
)

function resolveFn(response: AxiosResponse<DataProps>): AxiosPromise<DataProps> {
  return Promise.resolve(response)
}

const rejectFn = (err: AxiosError): AxiosPromise => {
  if (err.response) {
    console.log(err.response)
  }
  return Promise.reject(err.response)
}

// 返回后拦截
instance.interceptors.response.use(resolveFn, rejectFn)

export function httpPost<P, T = DataProps>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
): AxiosPromise<T> {
  return instance.post<T>(url, data, config)
}

export function httpGet<P, T = DataProps>(
  url: string,
  data?: P
): AxiosPromise<T> {
  const params = data ? { ...data } : {}
  return instance.get<T>(url, { params })
}

export function httpPut<P, T = DataProps>(
  url: string,
  data?: P | string,
  toSerializer?: boolean // 是否序列号参数
): AxiosPromise<T> {
  let sentParams = data
  if (toSerializer) {
    sentParams = qs.stringify(data, { indices: false })
  }
  return instance.put<T>(url, sentParams)
}

export function httpDelete<P, T = DataProps>(
  url: string,
  data?: P,
  toSerializer?: boolean // 是否序列号参数
): AxiosPromise<T> {
  const paramsSerializer = toSerializer
    ? (params: StoreValue): string => qs.stringify(params, { indices: false })
    : undefined
  return instance.delete<T>(url, {
    params: data,
    paramsSerializer
  })
}
