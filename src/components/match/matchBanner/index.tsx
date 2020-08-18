import React, { FC } from 'react'

import { BasketballProps } from '@/pages/match/type'
import moment from '@/utils/moment'
import style from './style.less'

interface MatchBannerProps {
  data: BasketballProps
}

interface TeamInfo { name: string, logo: string, score: number }

const MatchBanner: FC<MatchBannerProps> = (props: MatchBannerProps) => {
  const { data } = props
  const {
    startTime,
    seasonShowName,
    homeTeamLogo,
    homeTeamName,
    guestTeamLogo,
    guestTeamName,
    homeTeamScore,
    guestTeamScore,
    statusRealName,
    matchShortName: MESN,
    liveType,
    statusName
  } = data
  let formatStartTime = moment(new Date(startTime)).format('YYYY年MM月DD日 HH:mm')
  if (moment().isSame(moment(new Date(startTime)), 'year')) {
    formatStartTime = moment(new Date(startTime)).format('MM月DD日 HH:mm')
  }

  const canSHowScore = (): boolean => statusName === '已开场' || statusName === '已结束'

  const showTeamInfo = (info: TeamInfo): React.ReactElement => (
    <div className={style.teamInfo}>
      <div
        style={{
          backgroundImage: `url(${info.logo})`
        }}
      />
      <p>{info.name}</p>
    </div>
  )
  const showTeamScore = (info: TeamInfo): React.ReactElement => (
    canSHowScore() ? (
      <span>{info.score}</span>
    )
      : (
        <span className={style.none} />
      ))

  const homeInfo = {
    name: MESN === 'NBA' ? guestTeamName : homeTeamName,
    logo: MESN === 'NBA' ? guestTeamLogo : homeTeamLogo,
    score: MESN === 'NBA' ? guestTeamScore : homeTeamScore,
  }
  const guestInfo = {
    name: MESN === 'NBA' ? homeTeamName : guestTeamName,
    logo: MESN === 'NBA' ? homeTeamLogo : guestTeamLogo,
    score: MESN === 'NBA' ? homeTeamScore : guestTeamScore,
  }

  return (
    <div className={style.banner}>
      <div className={style.content}>
        <pre className={style.matchInfo}>
          {`${formatStartTime} ${seasonShowName}`}
        </pre>
        <div className={style.gameInfo}>
          {
            showTeamInfo(homeInfo)
          }
          <div className={style.score}>
            {
              showTeamScore(homeInfo)
            }
            <span>{statusRealName}</span>
            {
              showTeamScore(guestInfo)
            }
          </div>
          {
            showTeamInfo(guestInfo)
          }
        </div>
        <div className={style.btns}>
          {canSHowScore() && liveType === 'ANIMATION' && <button className={style.animation} type="button">动画直播</button>}
          {canSHowScore() && liveType === 'PROGRESS' && <button className={style.video} type="button">视频直播</button>}
        </div>
      </div>
    </div>
  )
}

export default MatchBanner
