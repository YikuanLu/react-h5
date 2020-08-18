import React, { FC, useState } from 'react'

import OpenBrowserModal from '@/components/common/openAppBtn/modal'
import { openIOSApp } from '@/components/common/openAppBtn/ios'
import { openAndroidApp } from '@/components/common/openAppBtn/android'

import iconLogo from '@/assets/image/icon_logo@2x.png'
import style from './style.less'

interface OpenAppBtnProps {
  className?: StyleSheet
}

interface ClientEnv {
  os: string,
  isWeixin: boolean,
  isWeibo: boolean,
  isQQ: boolean
}

const ua = navigator.userAgent.toLowerCase()

// 判断设备
const client = (): string => {
  let os = ''
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) { // 判断iPhone|iPad|iPod|iOS
    os = 'IOS'
  } else if (/(Android)/i.test(ua)) { // 判断Android
    os = 'ANDROID'
  }
  if (/windows|win32/i.test(ua)) {
    os = 'WINDOWS'
  }
  return os
}

// 判断是否微信
function isWeixinBrowser(): boolean {
  return !!(/micromessenger/.test(ua))
}

// 判断是否微博
function isWeiboBrowser(): boolean {
  return ua.includes('weibo')
}

// 判断是否qq
function isQQBrowser(): boolean {
  return ua.includes(' qq')
}

// 返回环境信息
const clientEnv = (): ClientEnv => ({
  os: client(),
  isWeixin: isWeixinBrowser(),
  isWeibo: isWeiboBrowser(),
  isQQ: isQQBrowser()
})


const OpenAppBtn: FC<OpenAppBtnProps> = (props: OpenAppBtnProps) => {
  const { className } = props
  const [visible, setVisible] = useState(false)

  const openModal = (): void => {
    setVisible(true)
  }

  // 打开app
  const openApp = (): void => {
    const osInfo = clientEnv()
    if (osInfo.os === 'IOS') {
      openIOSApp(openModal)
    }
    if (osInfo.os === 'ANDROID') {
      openAndroidApp()
    }
  }
  return (
    <>
      <OpenBrowserModal
        visible={visible}
        onClose={(): void => {
          setVisible(false)
        }}
      />
      <div
        className={`${className} ${style.openApp}`}
        onClick={openApp}
      >
        <img className={style.icon} src={iconLogo} alt="" />
        打开袋鼠体育观看更多视频
      </div>
    </>
  )
}


// export { openApp }

export { clientEnv }

export default OpenAppBtn
