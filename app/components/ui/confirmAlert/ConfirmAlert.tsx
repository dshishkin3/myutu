import React from "react";
import styles from "./ConfirmAlert.module.scss";

type Props = {
  show: boolean;
  onClose: (e: boolean) => void;
  onChoose: (e: boolean) => void;
  text: string;
};

const ConfirmAlert = ({ show, onClose, onChoose, text }: Props) => {
  show
    ? document.body.classList.add("oveflow-hidden")
    : document.body.classList.remove("oveflow-hidden");
  return (
    <div
      className={`${styles.modal} ${show && styles.modal__active}`}
      onClick={() => onClose(false)}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__text}>{text}</div>
        <div className="flex justify-center gap-x-3.5 mt-9 mb-4">
          <div
            onClick={() => {
              onChoose(true);
              onClose(false);
            }}
            className={`${styles.modal__button} ${styles["modal__button--active"]}`}
          >
            Да
          </div>
          <div
            onClick={() => {
              onChoose(false);
              onClose(false);
            }}
            className={styles.modal__button}
          >
            Нет
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
