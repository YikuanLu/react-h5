export interface SourceVideoItem {
  commentId: string
  duration: number
  fileName: string
  format: string
  height: number
  orderNum: number
  url: string
  videoCover: string
  width: number
}
export interface SourceImageItem {
  commentId: string
  fileName: string
  format: string
  height: number
  orderNum: number
  orientation: number
  url: string
  width: number
}
export interface ReplyItem {
  avatar: string
  businessId: string
  content: string
  createTime: string
  delete: boolean
  give: boolean
  giveNum: number
  id: string
  nickName: string
  parentCreateTime: string
  parentDelete: boolean
  parentGive: boolean
  parentGiveNum: number
  parentId: string
  parentReCommentNum: string
  pics: SourceImageItem[]
  reCommentNum: string
  reContent: string
  rePics: SourceImageItem[]
  reUserAvatar: string
  reUserId: string
  reUserNickName: string
  reVideos: SourceVideoItem[]
  userId: string
  videos: SourceVideoItem[]
}
