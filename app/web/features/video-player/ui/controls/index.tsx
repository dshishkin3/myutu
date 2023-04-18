import React, { FC, useContext, useEffect } from "react";
import { VideoPlayerContext } from "../../model/video-player";
import style from "../style.module.scss";

export const Controls: FC = () => {
  const {
    isShowControls,
    setDragging,
    refs: { rangeRef, videoRef },
    isFullScreen,
    toggleFullScreen,
    currentTime,
    duration,
    value,
    setCurrentTime,
    setValue,
    dragging,
    setIsFullScreen,
  }: any = useContext(VideoPlayerContext);

  const handleMouseDown = (e: any) => {
    console.log(123);

    const rect = rangeRef.current.getBoundingClientRect();
    const width = rect.width;
    let offsetX = e.clientX - rect.left;
    const newValue = Math.round((offsetX / width) * 100);
    const second = (duration / width) * offsetX;
    setValue(newValue);
    videoRef.current.currentTime = second;
    setCurrentTime(second);
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (dragging) {
        const rect = rangeRef.current.getBoundingClientRect();
        const width = rect.width;
        let offsetX = 0;

        if (e.targetTouches) {
          offsetX = e.targetTouches[0].clientX - rect.left;
        } else {
          offsetX = e.clientX - rect.left;
        }

        const second = (duration / width) * offsetX;

        if (second > duration - 1) {
          setValue(100);
          videoRef.current.currentTime = duration;
          setCurrentTime(duration);
        } else {
          setValue(offsetX > width ? 100 : (offsetX / width) * 100);
          videoRef.current.currentTime = second;
          setCurrentTime(second);
          console.log("+");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleMouseMove);
    };
  }, [dragging]);

  return (
    <div
      className={style.video_player__controls}
      style={{ display: isShowControls ? "block" : "none" }}
    >
      <div
        className={style.video_player__range}
        ref={rangeRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className={style.video_player__bar}
          style={{ width: `${value}%` }}
        ></div>
        <div
          className={style.video_player__thumb}
          style={{ left: value > 2 ? `calc(${value}% - 15px)` : `0%` }}
        ></div>
      </div>

      <div className={style.video_player__action}>
        <div className={style.video_player__time__block}>
          <span className={style.video_player__time_current}>
            {formatTime(currentTime)}
          </span>
          /
          <span className={style.video_player__time_duration}>
            {formatTime(duration)}
          </span>
        </div>
        {/* {isFullScreen && (<div className={style.video_player__icon__minscreen} onClick={toggleFullScreen}></div>)} */}
        {/* {!isFullScreen && (<div className={style.video_player__icon__fullscreen} onClick={toggleFullScreen}></div>)} */}
      </div>
    </div>
  );
};
