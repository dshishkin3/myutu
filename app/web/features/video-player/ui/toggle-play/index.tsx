import React, { FC, useContext } from "react";
import { VideoPlayerContext } from "../../model/video-player";
import style from "../style.module.scss";

export const TogglePlay: FC = () => {
  const {
    isShowControls,
    setIsPlaying,
    isPlaying,
    refs: { videoRef },
  }: any = useContext(VideoPlayerContext);
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <>
      {isShowControls && (
        <div className={style.video_player__toggle_play} onClick={togglePlay}>
          {isPlaying && (
            <div className={style.video_player__icon__paused}></div>
          )}
          {!isPlaying && <div className={style.video_player__icon__play}></div>}
        </div>
      )}
    </>
  );
};
