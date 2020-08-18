export type ArticleType = 'PICTURE' | 'VIDEO' | 'INFORMATION'
export type SexType = 'MAN' | 'WOMAN' | 'UNKNOWN'

// 用户信息
export interface UserInfor {
  avatar: string
  birthDay?: string
  cityCode?: number
  cityName?: string
  createTime?: string
  id?: number
  mobile?: string
  nickName: string
  provinceCode?: number
  provinceName?: string
  regionCode?: number
  regionName?: string
  sex?: SexType
  sign?: string
}

// 文章段落
export interface ArticleParagraph {
  type: 'VIDEO' | 'IMG' | 'TEXT'
  value: StoreValue
}

// 视频信息
export interface VideoInfor {
  duration: string
  fileName: string
  format: string
  height: string
  url: string
  videoCover: string
  width: string
}

// 文章详情
export interface ArticleItem {
  articlesType: ArticleType
  authorUserAo: UserInfor
  commentNum: number
  content: ArticleParagraph[]
  give: boolean
  giveNum: number
  id: number
  releaseTime: string
  reprintPlatform: string
  sourceLink: string
  title: string
  videoCover: string
  videoInfos: VideoInfor[]
}

// 文章组件props
export interface ArticlePageProps {
  data?: ArticleItem
}
