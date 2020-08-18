// 你没见过的🚢新版本
import React, {
  FC, ReactElement, useEffect, useState, useRef
} from 'react'

import { debounce } from '@/utils/publicFn'

import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import loadingGif from '@/assets/image/loadding.gif'
import { StoreValue } from '@/global'
import { AxiosPromise } from 'axios'
import emptyList from '@/assets/image/empty_list.png'
import wrapperStyle from './style.less'


BScroll.use(PullDown)
BScroll.use(Pullup)

interface ListViewProps {
  bsId?: string,
  className?: string // 类名
  style?: React.CSSProperties // 样式
  loaddingNode?: React.ReactElement // 自定义加载中显示
  render: (value: StoreValue, index?: number) => React.ReactNode
  api: (data: StoreValue) => AxiosPromise, // 请求列表接口
  listParams?: StoreValue,
  rowKey?: string
}

const THRESHOLD = 60
const STOP = 56
const SIZE = 20


const ListView: FC<ListViewProps> = (props: ListViewProps) => {
  const scroll = useRef<BScroll>()
  const {
    className,
    style,
    loaddingNode,
    api,
    listParams,
    render,
    rowKey,
    bsId
  } = props
  const [beforePullDown, setbeforePullDown] = useState(true)
  const [isPullingDown, setisPullingDown] = useState(false)
  const [isPullUpLoad, setisPullUpLoad] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const [isLast, setisLast] = useState(false)
  const [page, setpage] = useState(0)
  const [list, setlist] = useState<StoreValue[]>([])
  const [insideCount, setinsdeCount] = useState(0)

  // 下拉刷新方法
  const pullingDownHandler = (): void => {
    setbeforePullDown(false)
  }

  useEffect(() => {
    if (beforePullDown === false) {
      api({
        ...listParams,
        page: 0,
        size: SIZE
      }).then(res => {
        const { data: { content, count } } = res
        scroll.current?.finishPullDown()
        setinsdeCount(count)
        setlist(content)
        setisPullingDown(false)
        setisPullUpLoad(false)
        setpage(0)
        setTimeout(() => {
          setbeforePullDown(true)
          scroll.current?.refresh()
        }, 300)
      }).catch(() => {
        setisPullingDown(false)
        setisPullUpLoad(false)
        setbeforePullDown(true)
        scroll.current?.refresh()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforePullDown])

  useEffect(() => {
    if (list.length === insideCount) {
      setisLast(true)
    } else {
      setisLast(false)
    }
  }, [insideCount, list.length])

  // 请求数据
  useEffect(() => {
    if (isPullUpLoad === false) return
    if (isLast) return
    const pageCount = page + 1
    api({
      ...listParams,
      seasonId: 0,
      page: pageCount,
      size: SIZE
    }).then(res => {
      const { data: { content, count } } = res
      setpage(pageCount)
      const arr = [...list, ...content]
      setinsdeCount(count)
      setlist(arr)
      setisPullUpLoad(false)
      scroll.current?.refresh()
    }).catch(() => {
      scroll.current?.refresh()
      setisPullUpLoad(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPullUpLoad])

  // 上拉加载更多
  const pullingUpHandler = (): void => {
    scroll.current?.finishPullUp()
    if (isLast && isPullUpLoad) return
    setisPullUpLoad(true)
  }

  // 初始化BS对象
  useEffect(() => {
    if (initLoading === true) {
      setTimeout(() => {
        if (scroll.current) {
          scroll.current?.refresh()
        }
        const str = bsId ? `#${bsId}` : '.wrapper'
        scroll.current = new BScroll(str, {
          scrollY: true,
          click: true,
          // momentum: false,
          pullUpLoad: {
            threshold: 60
          },
          deceleration: 0.0025, // 默认值：0.0015
          swipeBounceTime: 800,
          bounce: {
            top: true,
            bottom: true,
            left: true,
            right: true
          },
          pullDownRefresh: {
            threshold: THRESHOLD,
            stop: STOP
          }
        })
        scroll.current?.on('pullingDown', debounce(pullingDownHandler, 200))
        scroll.current?.on('pullingUp', debounce(pullingUpHandler, 400))
        setInitLoading(false)
      }, 300)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, initLoading])

  // 初始化请求数据
  useEffect(() => {
    api({
      ...listParams,
      page: 0,
      size: SIZE
    }).then(res => {
      const { data: { content, count } } = res
      setinsdeCount(count)
      setlist(content)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bottomText = (): ReactElement | null => {
    if (initLoading) {
      return null
    }
    if (isLast) {
      return (
        <div className={wrapperStyle.bottomText}>
          没有更多了
        </div>
      )
    }
    return (isPullUpLoad ? (
      <div className={wrapperStyle.bottomText}>
        <span>加载中...</span>
      </div>
    )
      : (
        <div className={wrapperStyle.bottomText}>
          <span>上拉加载更多</span>
        </div>
      ))
  }

  const listBody = (): React.ReactElement => {
    if (list.length === 0 && initLoading !== true) {
      return (
        <div className={wrapperStyle.emptyBox} style={style}>
          <div className={wrapperStyle.imgBox}>
            <img src={emptyList} alt="" />
          </div>
          <div className={wrapperStyle.text}>本场比赛暂无资讯</div>
        </div>
      )
    }
    if (initLoading) {
      if (loaddingNode) {
        return loaddingNode
      }
      return (
        <div className={wrapperStyle.loading} style={style}>
          <div className={wrapperStyle.imgBox}>
            <img src={loadingGif} alt="" />
          </div>
        </div>
      )
    }
    return (
      <>
        {
          list.map((item, index) => (
            <div key={item?.[rowKey || 'id'] || index}>
              {render(item)}
            </div>
          ))
        }
      </>
    )
  }

  return (
    <div id={bsId} className={`${wrapperStyle.wrapper} wrapper`} style={style}>
      <div
        className={className}
        style={{
          minHeight: '101%',
        }}
      >
        <div className={wrapperStyle.pulldownWrapper}>
          {beforePullDown && (
            <div>
              <span>下拉更新</span>
            </div>
          )}
          {!beforePullDown && (
            <div>
              {isPullingDown && (
                <div>
                  <span>加载中...</span>
                </div>
              )}
              {!isPullingDown && (
                <div>
                  <span>更新成功</span>
                </div>
              )}
            </div>
          )}
        </div>
        {listBody()}
        <div>
          {bottomText()}
        </div>
      </div>
    </div>
  )
}

export default ListView
