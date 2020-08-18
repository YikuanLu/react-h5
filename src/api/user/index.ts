import { AxiosPromise } from 'axios'
import { DataProps, httpGet } from '@/utils/axios'

// 文章编辑-标签列表
export function getUserDetail<R = DataProps>(data: {
  id: string
}): AxiosPromise<R> {
  return httpGet<{ id: string }, R>(
    `/behavior/userBehavior/findDetail/${data.id}`
  )
}
