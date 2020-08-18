import React, {
  FC, useState, useEffect, useRef, RefObject
} from 'react'
import { isUndefined, isNull, isArray } from 'lodash'
import style from './style.less'

interface TabItem {
  name: string
  key: string | number
}
interface TabsProps {
  tabs: TabItem[]
  active?: number | string
  onChange?: (
    key: number | string,
    choiseItem: TabItem,
    preItem: TabItem | undefined
  ) => void
  children?: React.ReactElement | React.ReactElement[]
  animation?: boolean
  className?: StyleSheet
  style?: React.CSSProperties
}

const Tabs: FC<TabsProps> = (props: TabsProps) => {
  const {
    tabs, active, onChange, children, animation, style: styles
  } = props
  const [tabTree, saveTabTree] = useState<TabItem[]>([])
  const [contentArr, saveContentArr] = useState<React.ReactElement[]>([])
  const [inAct, setInAct] = useState<string | number | undefined>(active)
  const [inIndex, setInIndex] = useState<number>(0)

  const boxRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLDivElement>(null)

  // tab内容的滚动动画
  const contentScrollToAnimation = (
    start: number,
    to: number,
    ref: RefObject<HTMLElement>
  ): void => {
    let startNum = start
    const endNum = to
    const speed = Math.abs(start - to) / 100
    if (!animation && ref.current) {
      ref.current.scrollTo(to, 0)
      return
    }
    if (to > start) {
      const stl = setInterval((): void => {
        if (startNum < endNum && ref.current) {
          startNum += speed
          ref.current.scrollTo(startNum, 0)
        }
        if (startNum >= endNum) {
          clearInterval(stl)
        }
      }, 1)
    } else {
      const stl = setInterval((): void => {
        if (startNum > endNum && ref.current) {
          startNum -= speed
          ref.current.scrollTo(startNum, 0)
        }
        if (startNum <= endNum) {
          clearInterval(stl)
        }
      }, 1)
    }
  }

  // // tab条的滚动动画
  // const tabsScrollToAnimation = (
  //   itemNode: ChildNode,
  //   ref: RefObject<HTMLElement>
  // ): void => {
  //   if (ref.current) {
  //     const { clientWidth } = ref.current
  //     ref.current.scrollTo(clientWidth / 2 + ref.current.scrollLeft, 0)
  //   }
  // }

  useEffect((): void => {
    saveTabTree(tabs)
    if (tabs.length > 0) {
      if (isUndefined(active) || isNull(active)) {
        setInAct(tabs[0].key)
        setInIndex(0)
      } else {
        const index = tabs.findIndex(
          (item: TabItem): boolean => item.key === active
        )
        if (index === -1) {
          setInAct(tabs[0].key)
        } else {
          if (boxRef.current) {
            contentScrollToAnimation(
              0,
              index * boxRef.current.clientWidth,
              boxRef
            )
          }
          setInIndex(index)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, tabs])

  useEffect((): void => {
    if (tabs.length <= 0) {
      return
    }
    let newArr: React.ReactElement[] = []
    if (isArray(children)) {
      newArr = children
      // saveContentArr(newArr.slice(0, tabs.length))
    }
    if (!isArray(children)) {
      newArr = [children as React.ReactElement]
    }
    if (newArr.length > tabs.length) {
      newArr = newArr.slice(0, tabs.length)
    }
    if (newArr.length < tabs.length) {
      let index = tabs.length - newArr.length
      while (index--) {
        newArr.push(React.createElement('div'))
      }
    }
    saveContentArr(newArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  const clickTabs = (item: TabItem, index: number): void => {
    setInAct(tabTree[index].key)
    setInIndex(index)
    if (boxRef.current) {
      const { clientWidth } = boxRef.current
      contentScrollToAnimation(
        clientWidth * inIndex,
        clientWidth * index,
        boxRef
      )
    }
    // if (tabRef.current) {
    //   const { childNodes } = tabRef.current
    //   tabsScrollToAnimation(childNodes[index], tabRef)
    // }
    const data = tabTree.find(
      (items: TabItem): boolean => items.key === item.key
    )
    if (onChange) {
      onChange(item.key, item, data)
    }
  }

  const createTab = (): React.ReactElement[] =>
    tabs.map(
      (item: TabItem, index: number): React.ReactElement => {
        const { name, key } = item
        return (
          <div
            key={key || index}
            onClick={(): void => {
              clickTabs(item, index)
            }}
            className={
              inAct === key ? `${style.tab} ${style.active}` : style.tab
            }
          >
            {name}
          </div>
        )
      }
    )

  const createContent = (): React.ReactElement[] =>
    contentArr.map(
      (item: React.ReactElement, index: number): React.ReactElement => (
        <div className={style.content} key={item.key || index}>
          {item}
        </div>
      )
    )
  return (
    <div style={styles}>
      <div ref={tabRef} className={style.tabs}>
        {createTab()}
      </div>
      <div ref={boxRef} className={style.contentBox}>
        {createContent()}
      </div>
    </div>
  )
}

export default Tabs
