/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import WrapTitle from '@/components/common/wrapTitle'

import { getHotRecommendList } from '@/api/article'
import ResourceMask from '@/components/article/public/resourceMask'
import OpenAppBtn from '@/components/common/openAppBtn'
import { useLocation, useHistory } from 'umi'
import { LocationQuery } from '@/global'
import { secondToMinute } from '@/utils/publicFn'
import InformationRecommend from '@/components/common/informationRecommend'
import { RecommendItem } from '@/components/common/informationRecommend/type'
import style from './style.less'

interface HotRecommendationProps {
  className?: StyleSheet
  articleType?: string
}

const HotRecommendation: FC<HotRecommendationProps> = (
  props: HotRecommendationProps
) => {
  const { className, articleType = '' } = props
  const location = (useLocation() as unknown) as { query: LocationQuery }
  const { query } = location
  const history = useHistory()
  const [showList, setShowList] = useState<RecommendItem[]>([])
  const [warpTitle, setWarpTitle] = useState('')

  const getRecommend = (): void => {
    getHotRecommendList({ articleType }).then((res) => {
      const {
        data: { content }
      } = res
      setShowList(
        content
          .filter((item: RecommendItem): boolean => item.id !== query.id)
          .splice(0, 5)
      )
    })
  }

  useEffect((): void => {
    getRecommend()
    switch (articleType) {
      case 'PICTURE':
        setWarpTitle('更多热帖')
        break
      case 'VIDEO':
        setWarpTitle('更多视频')
        break
      case 'INFORMATION':
        setWarpTitle('更多精彩资讯')
        break
      default:
        setWarpTitle('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleType, query])

  const toOtheerPage = (data: RecommendItem): void => {
    const search = query.userid
      ? `?id=${data.id}&userid=${query.userid}`
      : `?id=${data.id}`
    history.push({
      pathname: `/article/${data.articleType.toLocaleLowerCase()}`,
      search
    })
  }

  const createPicEle = (): React.ReactElement => (
    <>
      {showList.map(
        (data: RecommendItem): React.ReactElement => {
          const {
            id,
            title,
            commentNum,
            giveNum,
            articleVideoList,
            articlePicList
          } = data
          const isSingleLine =
            articleVideoList.length > 0 && articlePicList.length > 0
          const titleStyle = isSingleLine
            ? style.articleSingleLineTitle
            : style.articleDoubleLineTitle
          return (
            <div
              key={id}
              onClick={(): void => {
                toOtheerPage(data)
              }}
              className={style.recommendationPicItem}
            >
              <p className={titleStyle}>{title}</p>
              <ResourceMask
                className={style.photoWall}
                videoList={articleVideoList}
                picList={articlePicList}
              />
              <div className={style.ReplylikeBox}>
                <span>{`${commentNum} 回复`}</span>
                <span>{`${giveNum} 点赞`}</span>
              </div>
            </div>
          )
        }
      )}
    </>
  )
  const createVideoEle = (): React.ReactElement => (
    <>
      {showList.map(
        (data: RecommendItem): React.ReactElement => {
          const {
            id,
            title,
            commentNum,
            giveNum,
            cover: { url = '' },
            articleVideoList
          } = data
          const duration = articleVideoList[0]
            ? articleVideoList[0].duration
            : 0
          return (
            <div
              key={id}
              onClick={(): void => {
                toOtheerPage(data)
              }}
              className={style.recommendationVideoItem}
            >
              <div className={style.leftWrap}>
                <div
                  className={style.cover}
                  style={{ backgroundImage: `url(${url})` }}
                />
                <span>{secondToMinute(duration)}</span>
              </div>
              <div className={style.rightWrap}>
                <p className={style.articleDoubleLineTitle}>{title}</p>
                <div className={style.ReplylikeBox}>
                  <span>{`${commentNum} 回复`}</span>
                  <span>{`${giveNum} 点赞`}</span>
                </div>
              </div>
            </div>
          )
        }
      )}
    </>
  )
  const createInformationEle = (): React.ReactElement => (
    <>
      {showList.map(
        (data: RecommendItem): React.ReactElement => (
          <InformationRecommend
            onClick={(): void => {
              toOtheerPage(data)
            }}
            data={data}
          />
        )
      )}
    </>
  )

  const dispathCreateEleFn = (): React.ReactElement => {
    switch (articleType) {
      case 'PICTURE':
        return createPicEle()
      case 'VIDEO':
        return createVideoEle()
      case 'INFORMATION':
        return createInformationEle()
      default:
        return createPicEle()
    }
  }

  return showList.length > 0 ? (
    <div className={`${className} ${style.wrap}`}>
      <WrapTitle title={warpTitle} />
      {dispathCreateEleFn()}
      <OpenAppBtn className={style.openAppBtn} />
    </div>
  ) : null
}

export default HotRecommendation
