import React, { FC, useState, useRef, useEffect } from 'react'

import style from './style.less'

const styles = {
  largeWhite: {
    linHeight: 22,
    fontSize: 16,
    contentType: 'largeWhite',
    line: 8
  },
  smallGrey: {
    linHeight: 20,
    fontSize: 14,
    contentType: 'smallGrey',
    line: 5
  }
}
enum styleType {
  largeWhite = 'largeWhite',
  smallGrey = 'smallGrey'
}
type StyleType = keyof typeof styleType

interface ReplyProps {
  replyType: StyleType
  content: string
  className?: StyleSheet
}

const Reply: FC<ReplyProps> = (props: ReplyProps): React.ReactElement => {
  const { className, replyType = 'largeWhite', content } = props
  // 是否展示全部
  const [showAll, setShowAll] = useState(false)
  // 是否展示按钮
  const [showOpenBtn, setShowOpenBtn] = useState(false)
  // 评论最后一行是否太长
  const [lastTextTooLong, setLastTextTooLong] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  useEffect((): void => {
    // 判断是否需要展示收起按钮
    // 行高*行数
    if (divRef.current) {
      const { clientHeight, scrollHeight } = divRef.current
      const { linHeight } = styles[replyType]
      if (scrollHeight - clientHeight > linHeight) {
        setShowOpenBtn(true)
        setShowAll(false)
      } else {
        setShowAll(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, divRef.current])
  useEffect((): void => {
    const Anchor = document.getElementById('Anchor')
    if (showAll && divRef.current && Anchor) {
      const { clientWidth } = divRef.current
      const { offsetLeft } = Anchor
      // 判断评论最后一行是否占满需要换行显示收起按钮
      if (offsetLeft / clientWidth > 0.7) {
        setLastTextTooLong(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll])
  const expandCollapseBtn = (): React.ReactElement | null => {
    if (!showAll || showOpenBtn) {
      return (
        <>
          <span id="Anchor" />
          <div
            onClick={(): void => {
              setShowAll(!showAll)
            }}
            className={
              showAll && lastTextTooLong ? style.tooLong : style.collapse
            }
          >
            <span className={style.openBtn}>{!showAll ? '展开' : '收起'}</span>
          </div>
        </>
      )
    }
    return null
  }
  return (
    <div className={`${className} ${style[replyType]}`}>
      <div
        ref={divRef}
        className={showAll ? style.replyContent : style.replyContentIndentation}
      >
        {content || ''}
        {expandCollapseBtn()}
      </div>
    </div>
  )
}

export default Reply
