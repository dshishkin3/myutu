import Image from "next/image";
import React, { FC } from "react";

import check from "app/assets/images/check.svg";
import check_error from "app/assets/images/check_error.svg";
import check_success from "app/assets/images/check_success.svg";

import styles from "./Validate.module.scss";

interface IValidateProps {
  characters: string;
  numberCheck: string;
  stringCheck: string;
}

const Validate: FC<IValidateProps> = ({
  characters,
  numberCheck,
  stringCheck,
}) => {
  return (
    <div>
      <div className={`${styles.check} `}>
        <Image
          src={
            characters === "default"
              ? check
              : characters === "success"
              ? check_success
              : check_error
          }
          width={24}
          height={24}
          alt="check"
        />
        <p
          className={`${
            characters === "default"
              ? styles.default
              : characters === "success"
              ? styles.success
              : styles.error
          }`}
        >
          Не менее 8 символов
        </p>
      </div>
      <div className={`${styles.check} `}>
        <Image
          src={
            numberCheck === "default"
              ? check
              : numberCheck === "success"
              ? check_success
              : check_error
          }
          width={24}
          height={24}
          alt="check"
        />
        <p
          className={`${
            numberCheck === "default"
              ? styles.default
              : numberCheck === "success"
              ? styles.success
              : styles.error
          }`}
        >
          Как минимум 1 цифра
        </p>
      </div>
      <div className={`${styles.check} `}>
        <Image
          src={
            stringCheck === "default"
              ? check
              : stringCheck === "success"
              ? check_success
              : check_error
          }
          width={24}
          height={24}
          alt="check"
        />
        <p
          className={`${
            stringCheck === "default"
              ? styles.default
              : stringCheck === "success"
              ? styles.success
              : styles.error
          }`}
        >
          Как минимум 1 строчная буква
        </p>
      </div>
    </div>
  );
};

export default Validate;
