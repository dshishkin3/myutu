import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

import volumeUp from "app/assets/images/volume-up.svg";
import volumeOff from "app/assets/images/volumeOff.svg";

import styles from "./style.module.scss";

interface IMutedTapes {
  isMuted: boolean;
  setIsMuted: any;
}

export const MutedTapes: FC<IMutedTapes> = ({ isMuted, setIsMuted }) => {
  const mutedHandler = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={styles.mute} onClick={mutedHandler}>
      <Image
        src={isMuted ? volumeUp : volumeOff}
        alt="volume"
        width={22}
        height={22}
      />
    </div>
  );
};
