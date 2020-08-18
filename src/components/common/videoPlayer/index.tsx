import React, { FC } from 'react'

import style from './style.less'

interface VideoPlayerProps {
  url: string
  videoCover: string
}

const VideoPlayer: FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
  const { url, videoCover } = props
  // const videoEl = document.createElement('video')
  // videoEl.src = url
  // videoEl.addEventListener('canplay', function () {
  //   console.log(this.videoWidth)
  //   // this.videoWidth;
  //   // this.videoHeight;
  // })
  return (
    <div
      className={style.videoContainer}
      // onTouchEnd={(): void => {
      //   console.log(1)
      // }}
      style={{
        height: '195px'
      }}
    >
      <div
        className={style.blurBox}
        style={{
          backgroundImage: `url(${videoCover})`,
          filter: 'blur(10px)'
        }}
      />
      <div
        style={{
          height: '195px'
        }}
        className={style.videoBox}
      >
        <video
          // onTimeUpdate={(): void => {
          //   if (videoEl) {
          //     console.log('rant:', `${(videoEl.currentTime / videoEl.duration * 100)}%`)
          //   }
          // }}
          controls
          poster={videoCover}
          src={url}
          playsInline
          x5-video-player-type="h5"
          // x5-video-player-fullscree
        />
      </div>
      {/* <div
        className={style.playerBtn}
        onClick={(): void => {
          videoEl?.play()
        }}
      >
        <span>
          <img src={playIcon} alt="" />
        </span>
      </div> */}
    </div>
  )
}

export default VideoPlayer
