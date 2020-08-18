import React, { FC, useState } from 'react'

import brightBulb from '@/assets/image/brightBulb.png'
import darkBulb from '@/assets/image/darkBulb.png'
import { formatNumber } from '@/utils/publicFn'
import style from './style.less'

interface BulbProps {
  isBright: boolean
  brightNum: number
  className?: StyleSheet
}


const Bulb: FC<BulbProps> = (props: BulbProps) => {
  const { isBright, brightNum, className } = props
  const [isLight, setIsLight] = useState<boolean>(isBright)


  return (
    <div
      className={`${className} ${style.bulb} `}
      onClick={(): void => {
        setIsLight(false)
      }}
    >
      <img src={isLight ? brightBulb : darkBulb} alt="" />
      <span>{formatNumber(brightNum)}</span>
    </div>
  )
}

export default Bulb
