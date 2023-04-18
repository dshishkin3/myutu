import Image from "next/image";
import React, { FC, useContext, useEffect } from "react";

import { VideoPlayerContext } from "../../model/video-player";

import volumeUp from "app/assets/images/volume-up.svg";

import style from "../style.module.scss";

export const Muted: FC = () => {
  const { isShowControls, toggleMuted, isMuted }: any =
    useContext(VideoPlayerContext);

  return (
    <>
      {isShowControls && (
        <div className={style.video_player__mute} onClick={toggleMuted}>
          {!isMuted ? (
            <div className={style.video_player__icon__mute}></div>
          ) : (
            <div>
              <Image src={volumeUp} width={28} height={28} alt="volume-up" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
