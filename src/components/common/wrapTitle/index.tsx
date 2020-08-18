import React, { FC } from 'react'

import style from './style.less'

interface WrapTitleProps {
  title: string
}

const WrapTitle: FC<WrapTitleProps> = (
  props: WrapTitleProps
): React.ReactElement => {
  const { title } = props
  return <div className={style.contentTitle}>{title}</div>
}

export default WrapTitle
