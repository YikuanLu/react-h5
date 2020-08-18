import { AxiosPromise } from 'axios'
import { DataProps, httpGet } from '@/utils/axios'

// 文章编辑-标签列表
export function getArticDetail<P = {}, R = DataProps>(
  data: P
): AxiosPromise<R> {
  return httpGet<P, R>('/information/app/articles/findAPPArticlesInfoSo', data)
}

// 文章详情-查找最亮评论
export function getRepltList<P = {}, R = DataProps>(data: P): AxiosPromise<R> {
  return httpGet<P, R>('/behavior/comment/h5Brightest', data)
}

// 文章详情-更多精彩推荐
export function getHotRecommendList<P = {}, R = DataProps>(
  data: P
): AxiosPromise<R> {
  return httpGet<P, R>('/search/article/findRecommend', data)
}
