import React, { FC, useContext, useRef, useState } from "react";
import {
  VideoPlayerContext,
  Muted,
  Video,
  Controls,
  TogglePlay,
} from "app/web/features/video-player";
import style from "app/web/features/video-player/ui/style.module.scss";
import { useToggle } from "usehooks-ts";
import Image from "next/image";

import video_miniature from "app/web/shared/config/images/ad/video-miniature.svg";

function VideoPlayer({
  children,
  link,
  miniature,
}: {
  children?: any;
  link: string;
  miniature?: boolean;
}) {
  const videoPlayer = useContext(VideoPlayerContext);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const rangeRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, toggleMuted] = useToggle(false);
  const [isShowControls, toggleShowControls, setIsShowControls] =
    useToggle(false);
  const [isFullScreen, toggleFullScreen, setIsFullScreen] = useToggle(false);

  const handleMouseUp = () => {
    setDragging(false);
  };

  const initialContext = {
    value,
    setValue,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    isMuted,
    toggleMuted,
    isFullScreen,
    toggleFullScreen,
    isShowControls,
    toggleShowControls,
    currentTime,
    setCurrentTime,
    dragging,
    setDragging,
    setIsFullScreen,
    refs: {
      rangeRef,
      videoRef,
    },
  };

  const stylesFullscreen: React.CSSProperties = {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
  };

  return (
    <VideoPlayerContext.Provider value={initialContext}>
      <div
        className={style.video_player}
        style={isFullScreen ? { position: "absolute", top: 0, left: 0 } : {}}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsShowControls(true)}
        onMouseMove={() => setIsShowControls(true)}
        onMouseLeave={() => setIsShowControls(false)}
      >
        {!miniature && <Muted />}
        {!miniature && <TogglePlay />}
        <Video source={link} miniature={miniature} />
        {!miniature && <Controls />}
        {miniature && (
          <div className="video_player__miniature">
            <Image
              src={video_miniature}
              width={28}
              height={28}
              alt="video_miniature"
            />
          </div>
        )}
      </div>
    </VideoPlayerContext.Provider>
  );
}

export default VideoPlayer;
