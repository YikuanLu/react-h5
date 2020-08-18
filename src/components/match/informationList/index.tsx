import React, { FC } from 'react'
import { getMatchInformation } from '@/api/match'
import InformationRecommend from '@/components/common/informationRecommend'
import { useLocation, useHistory, useParams } from 'umi'
import { LocationQuery } from '@/global'
import { AxiosPromise } from 'axios'
import { DataProps } from '@/utils/axios'
import ListView from '@/components/common/listView'

interface InformationListProps {
  seasonId: string
}

interface GetDataParams {
  itemType?: string
  matchId?: string
  seasonId?: string
  page?: number
  size?: number
}

const InformationList: FC<InformationListProps> = (props: InformationListProps) => {
  const { seasonId = '' } = props
  const location = (useLocation() as unknown) as { query: LocationQuery }
  const { query } = location
  const { type } = useParams()
  const history = useHistory()

  const getData = (params: GetDataParams): AxiosPromise<DataProps> =>
    getMatchInformation<GetDataParams>(params)
  return (
    <ListView
      api={getData}
      listParams={{
        scheduleId: seasonId,
        itemType: type
      }}
      render={
        (val): React.ReactNode => (
          <InformationRecommend
            onClick={(): void => {
              const search = query.userid
                ? `?id=${val.id}&userid=${query.userid}`
                : `?id=${val.id}`
              history.push({
                pathname: `/article/${val.articleType.toLocaleLowerCase()}`,
                search
              })
            }}
            data={val}
          />
        )
      }
    />
  )
}

export default InformationList
