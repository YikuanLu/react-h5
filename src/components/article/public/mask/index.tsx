import React, { FC } from 'react'

import openBtn from '@/assets/image/open_btn.png'

import style from './style.less'

interface MaskProps {
  open: () => void
}

const Mast: FC<MaskProps> = (props: MaskProps) => {
  const { open } = props
  return (
    <>
      <div className={style.mask}>
        <div className={style.shadow} />
      </div>
      <div className={style.openBtn}>
        <span
          onClick={(): void => {
            open()
          }}
        >
          <span>展开阅读全文</span>
          <img className={style.icon} src={openBtn} alt="" />
        </span>
      </div>
    </>
  )
}

export default Mast
