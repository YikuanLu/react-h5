import {
  ReplyItem,
  SourceVideoItem,
  SourceImageItem
} from '@/components/article/hotReply/type'

export interface ArticlePicItem extends SourceImageItem {
  articleId: string
}

export interface RecommendItem {
  articlePicList: ArticlePicItem[]
  articleType: string
  articleVideoList: SourceVideoItem[]
  authorAvatar: string
  authorId: string
  authorName: string
  clickNum: number
  commentList: ReplyItem[]
  commentNum: number
  content: string
  cover: ArticlePicItem
  createTime: string
  give: boolean
  giveNum: number
  id: string
  lightCommentNum: number
  seasonName: string
  shareNum: number
  subjectId: string
  subjectName: string
  title: string
}
