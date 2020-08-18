import React, { FC, useState, useEffect } from 'react'

import {
  SourceImageItem,
  SourceVideoItem
} from '@/components/article/hotReply/type'
import { secondToMinute } from '@/utils/publicFn'
import style from './style.less'

interface ResourceMaskProps {
  picList?: SourceImageItem[]
  videoList?: SourceVideoItem[]
  className?: StyleSheet
}

const ResourceMask: FC<ResourceMaskProps> = (props: ResourceMaskProps) => {
  const { picList = [], videoList = [], className } = props
  const [showList, setShowList] = useState<SourceImageItem[]>([])
  const [showVideoList, setVideoList] = useState<SourceVideoItem[]>([])
  useEffect((): void => {
    // console.log(picList, videoList)
    if (JSON.stringify(picList.slice(0, 3)) !== JSON.stringify(showList)) {
      setShowList(picList.slice(0, 3))
    }
    if (JSON.stringify(videoList) !== JSON.stringify(showVideoList)) {
      setVideoList(videoList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picList, videoList])

  const createGifImgEle = (
    data: SourceImageItem,
    index: number
  ): React.ReactElement => {
    const { url, height, width } = data
    let type = 'useHeight'
    const isLast = index === 2

    console.log(React.createElement('div', { src: url }))
    const laveItem = picList.length + videoList.length - index - 1
    if (height > width) {
      type = 'useWidth'
    }
    return (
      <div key={url} className={style.sourceItem}>
        <img className={style[type]} src={url} alt="" />
        <span className={style.sourceType}>GIF</span>
        {isLast && laveItem > 0 && (
          <span className={style.sourceMask}>{`+${laveItem}`}</span>
        )}
      </div>
    )
  }
  const createStaticImgEle = (
    data: SourceImageItem,
    index: number
  ): React.ReactElement => {
    const { url, height, width } = data
    let type = ''
    let styleType = 'useHeight'
    const isLast = index === 2 // 判断是否到了第三张显示剩余张数
    const laveItem = picList.length + videoList.length - index - 1
    if (height > width) {
      styleType = 'useWidth'
    }
    if (width / height <= 0.3) {
      type = '长图'
    }
    return (
      <div key={url} className={style.sourceItem}>
        <img className={style[styleType]} src={url} alt="" />
        {type && <span className={style.sourceType}>{type}</span>}
        {isLast && laveItem > 0 && (
          <span className={style.sourceMask}>{`+${laveItem}`}</span>
        )}
      </div>
    )
  }
  const disptchCreateEle = (
    data: SourceImageItem,
    index: number
  ): React.ReactElement => {
    const { format } = data
    switch (format) {
      case 'jpg':
        return createStaticImgEle(data, index)

      case 'gif':
        return createGifImgEle(data, index)

      default:
        return createStaticImgEle(data, index)
    }
  }
  const createVideoEle = (
    data: SourceVideoItem,
    index: number
  ): React.ReactElement => {
    const { videoCover, duration } = data
    const imgIndex = showList.length
    const isLast = index + imgIndex === 2 // 判断是否到了第三张显示剩余张数
    const laveItem = showVideoList.length - index - 1
    return (
      <div
        key={videoCover}
        className={style.sourceItem}
        style={{ backgroundImage: `url(${videoCover})` }}
      >
        <span className={style.time}>{secondToMinute(duration)}</span>
        {isLast && laveItem > 0 && (
          <span className={style.sourceMask}>{`+${laveItem}`}</span>
        )}
      </div>
    )
  }
  return showList.length > 0 || videoList.length > 0 ? (
    <div className={`${className} ${style.imgWrap}`}>
      {showList.map(
        (item: SourceImageItem, index: number): React.ReactElement =>
          disptchCreateEle(item, index)
      )}
      {showList.length < 3 &&
        showVideoList.map(
          (item: SourceVideoItem, index: number): React.ReactElement =>
            createVideoEle(item, index)
        )}
    </div>
  ) : null
}

export default ResourceMask
