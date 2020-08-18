import React, {
  FC, ReactElement, useState, useEffect
} from 'react'
import { useLocation, useHistory } from 'umi'
// import DocumentTitle from 'react-document-title'

import PictureArticle from '@/components/article/picture'
import VideoArticle from '@/components/article/video'
import ArtInformation from '@/components/article/information'
import HotReply from '@/components/article/hotReply/hotReply'
import ShareUser from '@/components/article/public/shareUser'

import { getArticDetail } from '@/api/article'
import { ArticleItem } from '@/pages/article/types'
import { LocationQuery } from '@/global'

import HotRecommendation from '@/components/article/hotRecommendation'
import style from './style.less'

const ArticleContent: FC = () => {
  const location = (useLocation() as unknown) as {
    query: LocationQuery
  }
  const history = useHistory()
  const { query } = location
  const [articleData, setarticleData] = useState<ArticleItem>()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!query.id) {
      history.replace('/404')
      return
    }
    getArticDetail<{ id: string }, ArticleItem>({
      id: query.id
    })
      .then((res) => {
        setarticleData(res.data)
      })
      .catch((): void => {
        history.replace('/404')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const articleTypeController = (
    articType?: string
  ): ReactElement => {
    switch (articType) {
      case 'PICTURE':
        return <PictureArticle data={articleData} />
      case 'VIDEO':
        return <VideoArticle data={articleData} />
      case 'INFORMATION':
        return <ArtInformation data={articleData} />
      default:
        return <div>错误类型</div>
    }
  }

  if (!articleData) return null

  return (
    <div className={style.articleContainer}>
      <div>{articleTypeController(articleData.articlesType)}</div>
      <HotReply className={style.HotReply} />
      <HotRecommendation
        articleType={articleData.articlesType}
        className={style.HotReply}
      />
      <ShareUser type={articleData.articlesType} />
    </div>
  )
}

export default ArticleContent
