import React, { FC, useEffect, useState } from 'react'

import style from './style.less'

interface ImagePreviewProps {
  source: string[]
  index: number
  visible: boolean
  changeIndex: (index: number) => void
  onHide: () => void
}

// 获取屏幕宽度
const screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

// 预设距离，当滑动距离大于这个数值，就会构成了下一页条件
// const DISTX = 50
// 预设时间
// const DURATION = 200
// 动画的速度
// const SPEED = 10
// 动画曲线
// eslint-disable-next-line no-return-assign
// const Quad = (t: number, b: number, c: number, d: number): number =>
//   // eslint-disable-next-line no-param-reassign
//   -c * (t /= d) * (t - 2) + b

function scrollFunc(e: Event): void {
  if (e.preventDefault) {
    // Firefox
    e.preventDefault()
    e.stopPropagation()
  }
}

const ImagePreview: FC<ImagePreviewProps> = (props: ImagePreviewProps) => {
  const { source, index, visible, onHide } = props
  useEffect(() => {
    if (visible) {
      document.addEventListener('touchmove', scrollFunc, { passive: false })
    } else {
      document.removeEventListener('touchmove', scrollFunc)
    }
  }, [visible])

  // 获取所有图片总宽度
  const previewWrapperWidth = screenWidth * source.length
  // const [stateTimer, setStateTimer] = useState<Date>(new Date())
  // const [clientX, setClientX] = useState(0)
  // const [currentPos, setCurrentPos] = useState<number | null>(null)
  const [translateCount, settranslateCount] = useState(0)

  // 动画过度效果
  // const animation = (idx: number): void => {
  //   // 动画执行的次数
  //   let start = 0
  //   // 动画当前所处的位置
  //   const curPos = currentPos || curIndex * screenWidth
  //   // 动画的偏移量 = 目标位置 - 当前位置
  //   const offset = idx * screenWidth - curPos
  //   // 动画会执行多少次，取整
  //   const during = Math.abs(offset) / SPEED

  //   const run = (): void => {
  //     start += 1
  //     let dist = Math.ceil(Quad(start, curPos, offset, during))
  //     // 这么做是为了避免最后滚动到的位置和预期的位置有偏差
  //     if (start + 1 >= during) {
  //       dist = idx * screenWidth
  //     }
  //     settranslateCount(-dist)
  //     if (start < during) {
  //       requestAnimationFrame(run)
  //     }
  //   }
  //   // 如果不构成翻页的情况，那么动画回弹到原型位置，不再往下进行
  //   if (idx === curIndex) {
  //     run()
  //     return
  //   }
  //   setCurIndex(idx)
  // }

  useEffect(() => {
    const count = screenWidth * index === 0 ? 0 : -screenWidth * index
    settranslateCount(count)
  }, [index])

  // useEffect(() => {
  //   // animation(curIndex)
  //   changeIndex(curIndex)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [curIndex])

  // useEffect(() => {
  //   const previewImageEl = document.getElementById('previewImage')
  //   previewImageEl?.addEventListener('touchstart', event => {
  //     console.log(event.changedTouches[0])
  //   })
  //   previewImageEl?.addEventListener('touchmove', event => {
  //     console.log(event.changedTouches[0])
  //   })
  //   previewImageEl?.addEventListener('touchend', event => {
  //     console.log(event)
  //   })
  // }, [])

  // useEffect(() => {
  //   if (visible === true) {
  //     const count = screenWidth * curIndex === 0 ? 0 : -screenWidth * curIndex
  //     settranslateCount(count)
  //   }
  //   if (visible === false) {
  //     setClientX(0)
  //     setCurrentPos(null)
  //     settranslateCount(0)
  //     setCurIndex(index)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visible])

  // const handleTouchStart = (event: TouchEvent): void => {
  //   // 滑动开始的时间
  //   setStateTimer(new Date())
  //   setClientX(event.touches[0].clientX)
  // }

  // const handleTouchMove = (event: TouchEvent): void => {
  //   const curClientX = event.changedTouches[0].clientX
  //   // 计算偏移距离
  //   const distX = curClientX - clientX
  //   // 计算当前图片的位置
  //   const curPos = curIndex * screenWidth - distX
  //   setCurrentPos(curPos)
  //   settranslateCount(-curPos)
  // }

  // const handleTouchEnd = (event: TouchEvent): void => {
  //   // 一共多少张图片 还要再减去1
  //   const len = source.length - 1
  //   // 滑动持续的时间
  //   const duration = new Date().getTime() - stateTimer.getTime()
  //   // // 获取当前滑块的位置
  //   const curClientX = event.changedTouches[0].clientX
  //   // // 相对touchStart的偏移量
  //   const distX = curClientX - clientX

  //   // // 当前是第一张图片且是向右滑动 或者 当前是最后张图片且是向左滑动
  //   if ((curIndex === 0 && distX > 0) || (curIndex === len && distX < 0)) {
  //     animation(curIndex)
  //     setCurrentPos(null)
  //     return
  //   }
  //   // duration如果小于预先设定的时间那么就属于快速滑动时
  //   if (duration <= DURATION) {
  //     if (distX > 0) {
  //       animation(curIndex - 1)
  //     } else if (distX < 0) {
  //       animation(curIndex + 1)
  //     }
  //   } else {
  //     if (distX >= DISTX) {
  //       // 往右边滑动
  //       animation(curIndex - 1)
  //     } else if (distX > 0 && distX < DISTX) {
  //       // 不滑动
  //       animation(curIndex)
  //     }
  //     // 往左边滑动
  //     if (distX <= -DISTX) {
  //       // 往左边滑动
  //       animation(curIndex + 1)
  //     } else if (distX < 0 && distX > -DISTX) {
  //       // 不滑动
  //       animation(curIndex)
  //     }
  //   }
  // }
  return (
    <div
      className={style.previewImage}
      id="previewImage"
      style={{
        display: visible ? 'block' : 'none'
      }}
      onClick={(): void => {
        onHide()
      }}
    >
      <div
        className={style.previewWrapper}
        style={{
          width: `${previewWrapperWidth}px`,
          transform: `translate3d(${translateCount}px, 0px, 0px)`
        }}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        {source.map((item) => (
          <div
            key={item}
            className={style.wrapperItem}
            style={{ width: `${screenWidth}px` }}
          >
            <img src={item} alt="" />
          </div>
        ))}
      </div>
      {/* <div className={style.previewIndicator}>
        {curIndex + 1}
        {' '}
        /
        {' '}
        {source.length}
      </div> */}
    </div>
  )
}

export default ImagePreview
