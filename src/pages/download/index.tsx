import React, { FC, useEffect } from 'react'

import { clientEnv } from '@/components/common/openAppBtn'

import bg from '@/assets/image/bg3@2x.png'
import logo from '@/assets/image/logo@2x.png'

import style from './style.less'

const APPSTOREURL = 'https://apps.apple.com/cn/app/%E8%A2%8B%E9%BC%A0%E4%BD%93%E8%82%B2/id1503300381'

const DownloadPage: FC = () => {
  useEffect(() => {
    if (clientEnv().os === 'IOS') {
      window.location.href = APPSTOREURL
    }
  }, [])
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <div
          className={style.btn}
          onClick={(): void => {
            if (clientEnv().os === 'IOS') {
              window.location.href = APPSTOREURL
            }
          }}
        >
          立即下载
        </div>
      </div>
      <div className={style.bg}>
        <img src={bg} alt="" />
      </div>
    </div>
  )
}

export default DownloadPage
