import React, { FC } from 'react'
import { history } from 'umi'
// import TestDemo from '@/components/demo'

// import styles from './index.less'

const Home: FC = () => (
  <div>
    <button
      type="button"
      onClick={(): void => {
        history.push({
          pathname: '/article/picture?id=53428999472283648'
        })
      }}
    >
      图文
    </button>
    <button
      type="button"
      onClick={(): void => {
        history.push({
          pathname: '/article/information'
        })
      }}
    >
      视频
    </button>
    <button
      type="button"
      onClick={(): void => {
        history.push({
          pathname: '/article/information'
        })
      }}
    >
      资讯
    </button>
  </div>
)

export default Home
