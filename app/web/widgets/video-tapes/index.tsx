import { FC, useEffect, useRef, useState } from "react";
import { useToggle } from "usehooks-ts";

import styles from "./style.module.scss";
import { TogglePlayTapes } from "./toggle-play";

import { MutedTapes } from "./muted";
import { AboutTape } from "./about-tape";

interface IVideoTapes {
  src: string;
}

export const VideoTapes: FC<IVideoTapes> = ({ src }) => {
  // play
  const [isPlaying, setIsPlaying] = useState(false);
  // hover video
  const [isShowControls, toggleShowControls, setIsShowControls] =
    useToggle(false);
  // mute audio
  const [isMuted, setIsMuted] = useToggle(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log(isMuted);
  }, [isMuted]);

  const togglePlay = () => {
    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (!isPlaying && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsShowControls(true)}
      onMouseMove={() => setIsShowControls(true)}
      onMouseLeave={() => setIsShowControls(false)}
    >
      {/* play */}
      <TogglePlayTapes
        isShowControls={isShowControls}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
      />
      {/* mute */}
      <MutedTapes isMuted={isMuted} setIsMuted={setIsMuted} />
      {/* info about tape */}
      <AboutTape />
      <video
        ref={videoRef}
        className={styles.video}
        muted={isMuted}
        onClick={togglePlay}
      >
        <source src={src} />
      </video>
    </div>
  );
};
