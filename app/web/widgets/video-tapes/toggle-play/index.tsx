import Image from "next/image";

import play from "app/assets/images/play-tapes.svg";
import pause from "app/assets/images/pause-tapes.svg";

import styles from "./style.module.scss";
import { FC } from "react";

interface ITogglePlayTapes {
  togglePlay: () => void;
  isPlaying: boolean;
  isShowControls: boolean;
}

export const TogglePlayTapes: FC<ITogglePlayTapes> = ({
  togglePlay,
  isPlaying,
  isShowControls,
}) => (
  <>
    <div
      className={`${styles.play} ${isShowControls ? styles.play_visible : ""}`}
      onClick={togglePlay}
    >
      {!isPlaying && <Image src={play} width={21} height={23} alt="play" />}
      {isPlaying && <Image src={pause} width={32} height={32} alt="play" />}
    </div>
  </>
);
