import React, { FC } from 'react'
import NotFoundImg from '@/assets/image/404.png'

import style from './style.less'

const NotFound: FC = () => (
  <div className={style.wrap}>
    <img src={NotFoundImg} alt="" />
    <button type="button">赶快打开DAIJI找找看</button>
  </div>
)

export default NotFound
