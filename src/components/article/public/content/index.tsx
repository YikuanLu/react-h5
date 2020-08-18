import React, { FC, ReactElement, useEffect, useState } from 'react'
import { ArticleParagraph } from '@/pages/article/types'

import ImageBox from '@/components/common/imageBox'

import PreviewImage from '@/components/common/imagePreview'
import style from './style.less'

export interface ArtContentProps {
  content: ArticleParagraph[]
}

const ArtContent: FC<ArtContentProps> = (props: ArtContentProps) => {
  const [isPreview, setsPreview] = useState<boolean>(false)
  const [imagelist, setImagelist] = useState<string[]>([])
  const [imageIndex, setmageIndex] = useState<number>(0)
  const { content } = props
  useEffect(() => {
    const imgList = content
      .filter((item) => item.type === 'IMG')
      .map((item) => item.value.url)
    setImagelist(imgList)
  }, [content])

  const createParagraph = (p: ArticleParagraph): ReactElement | null => {
    const { type } = p
    switch (type) {
      case 'IMG':
        return (
          <ImageBox
            onClick={(): void => {
              const i = imagelist.findIndex((item) => item === p.value.url)
              setmageIndex(i)
              setsPreview(true)
            }}
            data={p.value}
          />
        )
      case 'TEXT':
        return <span className={style.text}>{p.value}</span>
      default:
        return null
    }
  }

  return (
    <div className={style.artContent}>
      {content.map((item: ArticleParagraph, index: number) => {
        const key = `${item.type}${index}`
        return (
          <div className={style.paragraph} key={key}>
            {createParagraph(item)}
          </div>
        )
      })}
      {/* 预览组件 */}
      <PreviewImage
        source={imagelist}
        index={imageIndex}
        visible={isPreview}
        changeIndex={(val): void => {
          setmageIndex(val)
        }}
        onHide={(): void => {
          setsPreview(false)
        }}
      />
    </div>
  )
}

export default ArtContent
