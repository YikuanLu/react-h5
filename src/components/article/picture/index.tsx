import React, { FC, useState, useCallback } from 'react'

import { useLocation } from 'umi'

import Author from '@/components/article/public/author'
import ArtContent from '@/components/article/public/content'
import Mask from '@/components/article/public/mask'

import { ArticlePageProps } from '@/pages/article/types'

import style from './style.less'

const ArtPicture: FC<ArticlePageProps> = (props: ArticlePageProps) => {
  const { data } = props
  const location = useLocation()
  const [isOpen, setisOpen] = useState(false)

  const maxHeight = '33vh'

  const inforBox = useCallback(
    (node) => {
      if (node !== null) {
        const clientHeight = window.screen.height
        const { height } = node.getBoundingClientRect()
        if (height <= clientHeight * 0.33) {
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

export default ArtPicture
