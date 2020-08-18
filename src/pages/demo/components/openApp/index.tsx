import React, { FC } from 'react'

import OpenAppBtn, { clientEnv } from '@/components/common/openAppBtn'


import style from './style.less'

const OpenApp: FC = () => {
  const osInfo = clientEnv()
  const keys = Object.keys(osInfo)
  return (
    <div className={style.box}>
      <div>
        {
          keys.map(item => (
            <p key={item}>
              {`${item} => ${osInfo[item].toString()}`}
            </p>
          ))
        }
      </div>
      <OpenAppBtn className={style.btn} />
    </div>
  )
}

export default OpenApp
