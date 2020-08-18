import React, { FC, useState, useCallback } from 'react'

import { useLocation } from 'umi'

import Author from '@/components/article/public/author'
import ArtContent from '@/components/article/public/content'
import Mask from '@/components/article/public/mask'

import VideoPlayer from '@/components/common/videoPlayer'
import OpenAppBtn from '@/components/common/openAppBtn'

import { ArticlePageProps } from '@/pages/article/types'

import style from './style.less'

const ArtInformation: FC<ArticlePageProps> = (props: ArticlePageProps) => {
  const { data } = props
  const location = useLocation()
  const [isOpen, setisOpen] = useState(false)

  const maxHeight = '150vh'

  const inforBox = useCallback(
    (node) => {
      if (node !== null) {
        const clientHeight = window.screen.height
        const { height } = node.getBoundingClientRect()
        if (height <= clientHeight * 1.5) {
          setisOpen(true)
        } else {
          setisOpen(false)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search]
  )

  if (data) {
    return (
      <>
        <div className="articleBox">
          <div className={style.inforBox}>
            <div ref={inforBox}>
              <div className={style.title}>{data.title}</div>
              <Author data={data.authorUserAo} releaseTime={data.releaseTime} />
              {data.videoInfos && (
                <div className={style.videoContainer}>
                  <VideoPlayer
                    url={data.videoInfos[0].url}
                    videoCover={
                      data.videoCover || data.videoInfos[0].videoCover
                    }
                  />
                  <div className={style.toAppBtn}>
                    <OpenAppBtn />
                  </div>
                </div>
              )}
              <div
                style={{
                  maxHeight: isOpen === false ? maxHeight : ''
                }}
                className={style.contentBox}
              >
                <ArtContent content={data.content} />
              </div>
            </div>
          </div>
          {isOpen === false && (
            <Mask
              open={(): void => {
                setisOpen(true)
              }}
            />
          )}
        </div>
      </>
    )
  }
  return null
}

export default ArtInformation
