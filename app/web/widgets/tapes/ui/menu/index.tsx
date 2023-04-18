import { FC, useState } from "react";
import Image from "next/image";

import arrowUp from "app/assets/images/tapes_arrowUp.svg";
import arrowDown from "app/assets/images/tapes_arrowDown.svg";
import hidden from "app/assets/images/tapes_hidden.svg";
import like from "app/assets/images/tapes_like.svg";
import message from "app/assets/images/tapes_message.svg";
import share from "app/assets/images/tapes_export.svg";
import dislike from "app/assets/images/tapes_dislike.svg";
import settings from "app/assets/images/tapes_settings.svg";
import popup_share from "app/assets/images/tapes_send_2.svg";
import block from "app/assets/images/tapes_block.svg";

import styles from "./style.module.scss";

interface IMenuProps {
  popupSettings: boolean;
  setPopupSettings: (arg0: boolean) => void;
  setPopupShare: (arg0: boolean) => void;
}

export const Menu: FC<IMenuProps> = ({
  popupSettings,
  setPopupSettings,
  setPopupShare,
}) => {
  return (
    <div className={styles.menu}>
      <div className="slider__prev_tapes">
        <Image src={arrowUp} alt="arrowUp" width={14} height={8} />
      </div>
      <div className={styles.menu__buttons}>
        <div className={styles.menu__buttons_button}>
          <Image src={like} alt="like" width={32} height={32} />
          <p>10</p>
        </div>
        <div className={styles.menu__buttons_button}>
          <Image src={message} alt="message" width={32} height={32} />
          <p>10</p>
        </div>
        <div className={styles.menu__buttons_button}>
          <Image src={share} alt="share" width={32} height={32} />
          <p>1002</p>
        </div>
        <div className={styles.menu__buttons_button}>
          <Image src={dislike} alt="dislike" width={32} height={32} />
        </div>
        <div
          className={styles.menu__buttons_settings}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            onClick={() => setPopupSettings(!popupSettings)}
            src={settings}
            alt="settings"
            width={32}
            height={32}
          />
          <div
            className={`${
              popupSettings
                ? styles.menu__buttons_popup
                : styles.menu__buttons_popupDisable
            }`}
          >
            <div
              className={styles.menu__buttons_popup_content}
              onClick={() => setPopupShare(true)}
            >
              <Image src={popup_share} alt="share" width={24} height={24} />
              <p>Поделиться</p>
            </div>
            <div className={styles.menu__buttons_popup_content}>
              <Image src={block} alt="block" width={24} height={24} />
              <p>Заблокировать</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menu__arrow}>
        <Image src={hidden} alt="hidden" width={32} height={32} />
        <div className="slider__next_tapes">
          <Image src={arrowDown} alt="arrowDown" width={14} height={8} />
        </div>
      </div>
    </div>
  );
};
