import { AxiosPromise } from 'axios'
import { DataProps, httpGet } from '@/utils/axios'
import { ListRes } from '@/global'

// 赛事详情-篮球赛事详情
export function getBasketballMatchDetail<P = {}, R = DataProps>(data: {
  id: string
}): AxiosPromise<R> {
  return httpGet<P, R>(`/sport/basketball/schedule/${data.id}`)
}

// 赛事详情-足球赛事详情
export function getFootballMatchDetail<P = {}, R = DataProps>(data: {
  id: string
}): AxiosPromise<R> {
  return httpGet<P, R>(`/sport/football/schedule/${data.id}`)
}

// 赛事详情-比赛资讯
export function getMatchInformation<P = {}, R = ListRes>(
  data: P
): AxiosPromise<R> {
  return httpGet<P, R>('/search/article/matchInfo', data)
}
