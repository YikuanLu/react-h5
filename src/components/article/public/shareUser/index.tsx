import React, {
  FC, useEffect, useState, useRef
} from 'react'
import { useLocation } from 'umi'

import { LocationQuery } from '@/global'
import { UserInfor } from '@/pages/article/types'
import { getUserDetail } from '@/api/user'

import defaultAvatar from '@/assets/image/default_avatar.png'
import style from './style.less'

const picGuideWord = '深扒，故事，数据，八卦，趣味...无吐槽不篮球' // 图文
const videoGuideWord = '原汁原味，内涵风骚，承包你所有无聊的时间' // 视频
const inforGuideWord = '比新鲜、热门、有价值...关于篮球足球一网打尽' // 资讯
const matchGuideWord = '比赛的时候，我们都会有一群人在等着我们的成长' // 比赛

type Type = 'PICTURE' | 'VIDEO' | 'INFORMATION' | 'MATCH'
interface ShareUserProps {
  type: Type
}

const showSlogen = (type: Type): string => {
  switch (type) {
    case 'PICTURE':
      return picGuideWord
    case 'VIDEO':
      return videoGuideWord
    case 'INFORMATION':
      return inforGuideWord
    case 'MATCH':
      return matchGuideWord
    default:
      return ''
  }
}

const defaultUserInfor: UserInfor = {
  avatar: defaultAvatar,
  nickName: '你的好友'
}

const ShareUser: FC<ShareUserProps> = (props: ShareUserProps) => {
  const { type } = props
  const location = (useLocation() as unknown) as { query: LocationQuery }
  const [userInfor, setuserInfor] = useState<UserInfor>()
  useEffect(() => {
    const { query } = location
    if (!query.userid) {
      setuserInfor(defaultUserInfor)
      return
    }
    getUserDetail<UserInfor>({
      id: query.userid
    })
      .then((res) => {
        const { data } = res
        setuserInfor(data)
      })
      .catch(() => {
        setuserInfor(defaultUserInfor)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.query.userid])

  function debounce(fn: () => void, wait: number): () => void {
    let timeout: NodeJS.Timeout | null = null
    return (): void => {
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(fn, wait)
    }
  }

  const [scrollTopNum, setscrollTopNum] = useState(0)

  useEffect(() => {
    window.onscroll = debounce(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      setscrollTopNum(scrollTop)
    }, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevScrollTopNum = useRef<number>(0)
  useEffect(() => {
    prevScrollTopNum.current = scrollTopNum
  })
  const prevCount = prevScrollTopNum.current

  const [isShowUserShare, setisShowUserShare] = useState<boolean>(true)
  useEffect(() => {
    if (prevCount < scrollTopNum) {
      setisShowUserShare(false)
    }
    if (prevCount > scrollTopNum) {
      setisShowUserShare(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTopNum])

  const shareUserClassName = `${style.shareUserContainer}
  ${isShowUserShare ? '' : style.shareUserDown}`

  const showBtnText = type === 'PICTURE' || type === 'VIDEO'
    ? '去围观'
    : type === 'INFORMATION'
      ? '去看看'
      : '去观赛'

  return (
    <div className={shareUserClassName}>
      <div className={style.shareUser}>
        <div className={style.userDesc}>
          <img
            className={style.avatar}
            src={userInfor?.avatar || defaultAvatar}
            alt=""
          />
          <div className={style.textBox}>
            <div className={style.userName}>
              {userInfor?.nickName || '你的好友'}
            </div>
            <div className={style.signature}>{showSlogen(type)}</div>
          </div>
        </div>
        <div className={style.btn}>{showBtnText}</div>
      </div>
    </div>
  )
}

export default ShareUser
