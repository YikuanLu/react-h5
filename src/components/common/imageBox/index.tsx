import React, { FC, useState, useEffect } from 'react'

import { StoreValue } from '@/global'
import style from './style.less'

interface ImageBoxProps {
  data: StoreValue
  onClick: () => void
}

const ImageBox: FC<ImageBoxProps> = (props: ImageBoxProps) => {
  const { data, onClick } = props
  const [isLoaded, setisLoaded] = useState(false)
  const [imgStyle, setimgStyle] = useState('')
  const [showType, setShowType] = useState('')
  useEffect(() => {
    const img = document.createElement('img')
    img.src = data.url
    const imgWidth = img.width
    const imgHeight = img.height
    const { format, url } = data
    if (imgWidth / imgHeight <= 0.3) {
      setShowType('长图')
      setimgStyle(style.verticallImageBox)
    } else if (imgWidth / imgHeight > 1.77) {
      setimgStyle(style.horizontalLongImageBox)
    } else {
      setimgStyle(style.horizontalImageBox)
    }

    const imgNameArr = url.split('.')
    const imgType = imgNameArr[imgNameArr.length - 1]
    if ((format && format === 'gif') || imgType === 'gif') {
      setShowType('GIF')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])
  return (
    <div
      className={`${style.imageBox} ${imgStyle}`}
      onClick={(): void => {
        onClick()
      }}
    >
      <img
        onLoad={(): void => {
          setisLoaded(true)
        }}
        src={data.url}
        alt=""
      />
      {showType && <div className={style.tip}>{showType}</div>}
    </div>
  )
}

export default ImageBox
