export interface BasketballProps {
  chatRoomId: string
  description: string
  guestTeamId: string
  guestTeamLogo: string
  guestTeamName: string
  guestTeamPlayers: [
    {
      age: number
      ballAge: string
      birthday: string
      birthplace: string
      country: string
      description: string
      draftRank: string
      englishName: string
      englishShortName: string
      height: string
      id: string | number
      jersey: string
      joinTime: string
      logo: string
      name: string
      position: string
      retire: boolean
      retirementTime: string
      school: string
      shortName: string
      teamId: string
      weight: string
      yearSalary: string
    }
  ]
  guestTeamScore: number
  homeTeamId: string
  homeTeamLogo: string
  homeTeamName: string
  homeTeamPlayers: [
    {
      age: number
      ballAge: string
      birthday: string
      birthplace: string
      country: string
      description: string
      draftRank: string
      englishName: string
      englishShortName: string
      height: string
      id: string
      jersey: string
      joinTime: string
      logo: string
      name: string
      position: string
      retire: boolean
      retirementTime: string
      school: string
      shortName: string
      teamId: string
      weight: string
      yearSalary: string
    }
  ]
  homeTeamScore: 0
  id: string
  liveType: string
  matchEnglishName: string
  matchEnglishShortName: string
  matchId: string
  matchLogo: string
  matchName: string
  matchShortName: string
  name: string
  progressStatus: string
  realStartTime: string
  seasonId: string
  seasonName: string
  seasonShowName: string
  stage: string
  startTime: string
  status: string
  statusName: string
  statusRealName: string
  venue: string
}
