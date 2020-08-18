import React, { FC, useState, useEffect } from 'react'
import { ArticlePageProps } from '@/pages/article/types'

import iconUnfold from '@/assets/image/icon_unfold.png'

import Author from '@/components/article/public/author'
import ArtContent from '@/components/article/public/content'
import VideoPlayer from '@/components/common/videoPlayer'
import OpenAppBtn from '@/components/common/openAppBtn'

import style from './style.less'

const ArtVideo: FC<ArticlePageProps> = (props: ArticlePageProps) => {
  const { data } = props
  const [isOpen, setisOpen] = useState(false)
  const iconRotate = isOpen ? style.rotate : ''
  useEffect((): void => {
    setisOpen(false)
  }, [data])
  if (data) {
    return (
      <>
        <VideoPlayer
          url={data.videoInfos[0].url}
          videoCover={data.videoCover || data.videoInfos[0].videoCover}
        />
        <OpenAppBtn className={style.openApp} />
        <div className="articleBox">
          <div className={style.authorContainer}>
            <Author data={data.authorUserAo} releaseTime={data.releaseTime} />
          </div>
          <div
            className={style.title}
            onClick={(): void => {
              setisOpen(!isOpen)
            }}
          >
            <span>{data.title}</span>
            {data.content.length > 0 && (
              <span className={style.iconBox}>
                <img className={iconRotate} src={iconUnfold} alt="" />
              </span>
            )}
          </div>
          {isOpen && <ArtContent content={data.content} />}
        </div>
      </>
    )
  }
  return null
}

export default ArtVideo
