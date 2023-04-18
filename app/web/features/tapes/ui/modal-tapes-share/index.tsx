import { FC, useEffect, useState } from "react";

import close from "app/assets/images/tapes_close-popup.svg";

import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSnackbar } from "app/store/slices/snackbar.slice";

interface IModalTapesShare {
  active: boolean;
  setActive: () => void;
  setPopupSettings: (arg0: boolean) => void;
}

export const ModalTapesShare: FC<IModalTapesShare> = ({
  active,
  setActive,
  setPopupSettings,
}) => {
  // current link
  const [currentLink, setCurrentLink] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentLink(window.location.href);
  }, []);

  // закрыть попап через крестик
  const closePopup = () => {
    setPopupSettings(false);
    setActive();
  };

  // копировать текущую ссылку
  const onShareHandler = () => {
    const path: string = window.location.href;
    navigator.clipboard.writeText(path);
    closePopup();
    dispatch(
      setSnackbar({ show: true, label: "Ссылка скопирована!", type: true })
    );
  };

  return (
    <>
      <div
        className={`${active ? styles.modal__active : styles.modal}`}
        onClick={setActive}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal__content_header}>
            <p>Поделиться</p>
            <Image
              onClick={closePopup}
              src={close}
              alt="close"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.modal__content_input}>
            <p>{currentLink}</p>
            <span onClick={onShareHandler}>Копировать</span>
          </div>
        </div>
      </div>
    </>
  );
};
