import React, {
  FC, useState, useEffect, useRef
} from 'react'
// import DocumentTitle from 'react-document-title'

import Tabs from '@/components/article/public/tabs'
import {
  getBasketballMatchDetail,
  getFootballMatchDetail
} from '@/api/match'
import { BasketballProps } from '@/pages/match/type'
import MatchBanner from '@/components/match/matchBanner'
import { useLocation, useParams } from 'umi'
import { LocationQuery } from '@/global'
import ShareUser from '@/components/article/public/shareUser'
import InformationList from '@/components/match/informationList'

import style from './style.less'

const defaultBasketballInfo: BasketballProps = {
  chatRoomId: '',
  description: '',
  guestTeamId: '',
  guestTeamLogo: '',
  guestTeamName: '',
  guestTeamPlayers: [
    {
      age: 0,
      ballAge: '',
      birthday: '',
      birthplace: '',
      country: '',
      description: '',
      draftRank: '',
      englishName: '',
      englishShortName: '',
      height: '',
      id: '',
      jersey: '',
      joinTime: '',
      logo: '',
      name: '',
      position: '',
      retire: false,
      retirementTime: '',
      school: '',
      shortName: '',
      teamId: '',
      weight: '',
      yearSalary: ''
    }
  ],
  guestTeamScore: 0,
  homeTeamId: '',
  homeTeamLogo: '',
  homeTeamName: '',
  homeTeamPlayers: [
    {
      age: 0,
      ballAge: '',
      birthday: '',
      birthplace: '',
      country: '',
      description: '',
      draftRank: '',
      englishName: '',
      englishShortName: '',
      height: '',
      id: '',
      jersey: '',
      joinTime: '',
      logo: '',
      name: '',
      position: '',
      retire: false,
      retirementTime: '',
      school: '',
      shortName: '',
      teamId: '',
      weight: '',
      yearSalary: ''
    }
  ],
  homeTeamScore: 0,
  id: '',
  liveType: 'ANIMATION',
  matchEnglishName: '',
  matchEnglishShortName: '',
  matchId: '0',
  matchLogo: '',
  matchName: '',
  matchShortName: '',
  name: '',
  progressStatus: 'NOT_BEGIN',
  realStartTime: '',
  seasonId: '',
  seasonName: '',
  seasonShowName: '',
  stage: 'LEAGUE',
  startTime: '2020',
  status: 'SECTION_SECOND',
  statusName: '',
  statusRealName: '',
  venue: ''
}

const Match: FC = () => {
  const location = (useLocation() as unknown) as { query: LocationQuery }
  const { query } = location
  const { type } = useParams()
  const [matchBasketballInfo, saveMatchInfo] = useState<BasketballProps>(defaultBasketballInfo)
  const [listHeight, setListHeight] = useState('')
  const divRef = useRef<HTMLDivElement>(null)

  const tabTree = [
    { name: '资讯', key: 1 },
  ]

  useEffect(() => {
    const { outerHeight } = window
    if (divRef.current) {
      const { firstElementChild, lastElementChild } = divRef.current
      if (firstElementChild && lastElementChild) {
        setListHeight(`${outerHeight - firstElementChild.clientHeight - lastElementChild.clientHeight / 2 * 3}px`)
      }
    }
  }, [divRef])

  useEffect((): void => {
    if (type.toLocaleLowerCase() === 'basketball') {
      getBasketballMatchDetail<{ id: string }, BasketballProps>({
        id: query.id
      }).then((res) => {
        const {
          data,
        } = res
        saveMatchInfo(data)
      })
    } else {
      getFootballMatchDetail<{ id: string }, BasketballProps>({
        id: query.id
      }).then((res) => {
        const {
          data,
        } = res
        saveMatchInfo(data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type])

  return (
    <div
      ref={divRef}
      style={{ height: '100%' }}
    >
      <MatchBanner data={matchBasketballInfo} />
      {
        listHeight
        && matchBasketballInfo.id && (
          <Tabs
            style={{ height: listHeight }}
            className={style.box}
            animation={false}
            tabs={tabTree}
            active={1}
          >
            <InformationList seasonId={matchBasketballInfo.id} />
          </Tabs>
        )
      }
      <ShareUser type="MATCH" />
    </div>
  )
}

export default Match
