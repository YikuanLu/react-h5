/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import WrapTitle from '@/components/common/wrapTitle'

import Reply from '@/components/article/public/replyContent'
import Bulb from '@/components/article/bulb'
import ResourceMask from '@/components/article/public/resourceMask'

import { getRepltList } from '@/api/article'
import { ReplyItem } from '@/components/article/hotReply/type'
import { useLocation } from 'umi'
import { LocationQuery } from '@/global'
import { computeTime } from '@/utils/publicFn'
import style from './style.less'

interface HotReplyProps {
  className: StyleSheet
}

const HotReply: FC<HotReplyProps> = (props: HotReplyProps) => {
  const { className } = props
  const location = (useLocation() as unknown) as { query: LocationQuery }
  const { query } = location
  const [replyList, setReplyList] = useState<ReplyItem[]>([])
  const [businessId, setBusinessId] = useState('')
  useEffect((): void => {
    if (query.id !== businessId) {
      setBusinessId(query.id)
      getRepltList({ businessId: query.id }).then((res) => {
        const {
          data: { comments }
        } = res
        setReplyList(comments.slice(0, 3))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return replyList.length > 0 ? (
    <div className={`${className} ${style.wrap}`}>
      <WrapTitle title="最热回复" />
      <div className={style.content}>
        {replyList.map(
          (item: ReplyItem): React.ReactElement => {
            const {
              id,
              avatar,
              nickName,
              createTime,
              giveNum,
              content,
              pics,
              rePics,
              videos,
              reVideos,
              reContent,
              reUserNickName,
              parentId,
              parentDelete
            } = item
            const parContent = !parentDelete
              ? `${reUserNickName}：${reContent}` || ''
              : '#抱歉，该引用回复已被删除'
            return (
              <div key={id} className={style.replyItem}>
                <img className={style.headIcon} src={avatar} alt="" />
                <div>
                  <span className={style.userInfo}>
                    {`${nickName} · ${computeTime(createTime)}`}
                  </span>
                  <Reply
                    content={content}
                    className={style.replyContent}
                    replyType="largeWhite"
                  />
                  <ResourceMask
                    className={style.photoWall}
                    videoList={videos}
                    picList={pics}
                  />
                  {parentId !== '0' && (
                    <div className={style.parReplyInfo}>
                      <Reply
                        className={
                          (rePics.length > 0 || reVideos.length > 0) &&
                          style.parReplyContent
                        }
                        content={parContent}
                        replyType="smallGrey"
                      />
                      <ResourceMask
                        className={!parentDelete || style.parPhotoWall}
                        picList={rePics}
                        videoList={reVideos}
                      />
                    </div>
                  )}
                </div>
                <Bulb
                  className={style.bulb}
                  isBright={false}
                  brightNum={giveNum}
                />
              </div>
            )
          }
        )}
      </div>
    </div>
  ) : null
}

export default HotReply
