import React, { FC } from 'react'
import { RecommendItem } from '@/components/common/informationRecommend/type'
import bgCover from '@/assets/image/bgCover.png'
import { formatNumber } from '@/utils/publicFn'
import style from './style.less'

interface InformationRecommendProps {
  data: RecommendItem
  key?: string | number
  onClick?: () => void
}

const InformationRecommend: FC<InformationRecommendProps> = (
  props: InformationRecommendProps
) => {
  const { data, onClick } = props
  const {
    id,
    title,
    commentNum,
    giveNum,
    cover,
    articlePicList,
    articleVideoList,
  } = data

  const getCoverUrl = (): string => {
    if (cover && cover.url) {
      return cover.url
    }
    if (articlePicList && articlePicList.length > 0) {
      return articlePicList[0].url
    }
    if (articleVideoList && articleVideoList.length > 0) {
      return articleVideoList[0].videoCover
    }
    return bgCover
  }

  return (
    <div
      onClick={(): void => {
        if (onClick) {
          onClick()
        }
      }}
      key={id}
      className={style.recommendationInformationItem}
    >
      <div className={style.leftWrap}>
        <p className={style.articleDoubleLineTitle}>{title}</p>
        <div className={style.ReplylikeBox}>
          <span>{`${formatNumber(commentNum)} 回复`}</span>
          <span>{`${formatNumber(giveNum)} 点赞`}</span>
        </div>
      </div>
      <div className={style.rightWrap}>
        <div
          className={style.cover}
          style={{ backgroundImage: `url(${getCoverUrl()})` }}
        />
      </div>
    </div>
  )
}

export default InformationRecommend
