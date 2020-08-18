import React, { FC } from 'react'

import { getMatchInformation } from '@/api/match'

import ListView from '@/components/common/listView'
import InformationRecommend from '@/components/common/informationRecommend'
import { AxiosPromise } from 'axios'
import { DataProps } from '@/utils/axios'

interface GetDataParams {
  itemType?: string
  matchId?: string
  seasonId?: string | number
  page?: number
  size?: number
}

const ListViewDemo: FC = () => {
  const getData = (params: GetDataParams): AxiosPromise<DataProps> =>
    getMatchInformation<GetDataParams>(params)

  return (
    <>
      <ListView
        api={getData}
        bsId="list1"
        listParams={{
          seasonId: 0
        }}
        style={{
          height: '30vh'
        }}
        render={
          (val): React.ReactNode => (
            <InformationRecommend
              data={val}
            />
          )
        }
      />
      <div>asdfasd</div>
      <ListView
        api={getData}
        bsId="list2"
        listParams={{
          seasonId: 0
        }}
        style={{
          height: '30vh'
        }}
        render={
          (val): React.ReactNode => (
            <InformationRecommend
              data={val}
            />
          )
        }
      />
    </>
  )
}

export default ListViewDemo
