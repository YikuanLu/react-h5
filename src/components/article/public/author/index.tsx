import React, { FC } from 'react'
import { UserInfor } from '@/pages/article/types'

import { computeTime } from '@/utils/publicFn'

import style from './style.less'

export interface AuthorProps {
  data?: UserInfor
  releaseTime?: string
  showText?: string
}

const Author: FC<AuthorProps> = (props: AuthorProps) => {
  const { data, releaseTime, showText } = props
  const firmNow = computeTime(releaseTime)
  if (data) {
    return (
      <div className={style.authorBox}>
        <div className={style.avatar}>
          <img src={data.avatar} alt="" />
        </div>
        <div className={style.userInfor}>
          <div className={style.userName}>{data.nickName}</div>
          <div className={style.desc}>
            <span className={style.date}>{firmNow}</span>
            <span>{showText}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Author
