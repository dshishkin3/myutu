import React, { FC, useContext, useEffect } from "react";
import { VideoPlayerContext } from "../../model/video-player";
import style from "../style.module.scss";

export const Video: FC<{ source: string; miniature?: boolean }> = ({
  source,
  miniature,
}) => {
  const {
    isMuted,
    setDuration,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    duration,
    setValue,
    isFullScreen,
    refs: { videoRef },
  }: any = useContext(VideoPlayerContext);

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    setValue((videoRef.current.currentTime / duration) * 100);
  };

  useEffect(() => {
    if (Number.isNaN(videoRef.current.duration)) {
      setDuration(0);
    } else {
      setDuration(isNaN(videoRef.current.duration));
    }
  }, [videoRef.current]);

  return (
    <video
      className={style.video_player__video}
      ref={videoRef}
      src={source}
      muted={isMuted}
      onLoadedMetadata={handleLoadedMetadata}
      onClick={togglePlay}
      onTimeUpdate={handleTimeUpdate}
      //   style={isFullScreen ? { width: "100%" } : {}}
      style={{
        width: isFullScreen ? "100%" : "inherit",
        objectFit: miniature ? "cover" : "contain",
        height: miniature ? 88 : "100%",
        pointerEvents: miniature ? "none" : "auto",
        borderRadius: miniature ? 8 : 10,
      }}
    ></video>
  );
};
