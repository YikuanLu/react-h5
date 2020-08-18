import React, { FC } from 'react'

import icon from '@/assets/image/icon_beeline@2x.png'
import style from './style.less'

interface OpenBrowserModalProps {
  visible: boolean,
  onClose: (visible: boolean) => void
}

const OpenBrowserModal: FC<OpenBrowserModalProps> = (
  props: OpenBrowserModalProps
) => {
  const { visible, onClose } = props
  return (
    <div
      className={style.modalContainer}
      style={{
        display: visible ? 'block' : 'none'
      }}
      onClick={(): void => {
        onClose(false)
      }}
    >
      <div className={style.main}>
        <img src={icon} alt="" />
        <p>1、点击右上角&quot;...&quot;</p>
        <p>2、选择在浏览器中打开</p>
      </div>
    </div>
  )
}

export default OpenBrowserModal
