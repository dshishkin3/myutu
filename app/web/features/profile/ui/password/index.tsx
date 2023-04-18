import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import { changeUserPassword } from "app/services/profile.api";

import hideIcon from "app/assets/images/hideIcon.svg";
import showIcon from "app/assets/images/showIcon.svg";

import styles from "./style.module.scss";
import { SettingsForm } from "app/web/widgets/profile/model";

interface IPasswordProps {
  form: SettingsForm;
}

export const Password: FC<IPasswordProps> = ({ form }) => {
  const [isPasswordDirty, setIsPasswordDirty] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("Заполните поле");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  //   одинаковые пароли
  const [samePasswords, setSamePasswords] = useState<string>("");
  const [currentPasswordError, setCurrentPasswordError] =
    useState<string>("Заполните поле");
  const [isShown, setShown] = useState<{
    old: boolean;
    new: boolean;
    current: boolean;
  }>({
    old: false,
    new: false,
    current: false,
  });

  // ошибка с сервера
  const [serverError, setServerError] = useState(false);
  const [serverErrorValue, setServerErrorValue] = useState("");

  const router = useRouter();

  // сменить пароль
  const changePassword = async () => {
    if (
      currentPasswordError.length > 1 ||
      passwordError.length > 1 ||
      samePasswords.length > 1
    ) {
    } else {
      const data = await changeUserPassword({
        userId: form.userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      switch (data.state) {
        case "0000":
          router.reload();
          break;

        case "1020":
          setServerError(true);
          setServerErrorValue("Неправильный пароль");
          break;

        default:
          break;
      }
    }
  };

  // кнопка "отмена" - очищает все поля
  const cancellation = () => {
    setCurrentPassword("");
    setRepeatNewPassword("");
    setNewPassword("");
    setPasswordError("");
    setIsPasswordDirty(false);
    setSamePasswords("");
  };

  // валидации
  const currentPasswordHandler = (value: string) => {
    setCurrentPassword(value);
    if (value.length < 8) {
      setCurrentPasswordError("Пароль должен состоять из более 8 символов");
      if (value !== value) {
        setCurrentPasswordError("Заполните поле");
      }
    } else {
      setCurrentPasswordError("");
    }
  };

  const newPasswordHandler = (value: string) => {
    setNewPassword(value);
    if (value.length < 8) {
      setPasswordError("Пароль должен состоять из более 8 символов");
      if (value !== value) {
        setPasswordError("Заполните поле");
      }
    } else {
      setPasswordError("");
    }
  };

  const passwordRepeatHandler = (value: string) => {
    setRepeatNewPassword(value);
    if (value.length < 8) {
      setPasswordError("Пароль должен состоять из более 8 символов");
      if (!value) {
        setPasswordError("Заполните поле");
      }
    } else {
      setPasswordError("");
    }

    if (newPassword !== value) {
      setSamePasswords("Пароли не совпадают");
    } else {
      setSamePasswords("");
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "password":
        setIsPasswordDirty(true);
        break;
    }
  };

  return (
    <div className={styles.window}>
      <form className={styles.loginForm} onSubmit={() => {}}>
        <label>
          Текущий пароль
          <input
            onChange={(e) =>
              currentPasswordHandler(e.target.value.replaceAll(" ", ""))
            }
            onBlur={(e) => blurHandler(e)}
            name="password"
            type={isShown.current ? "text" : "password"}
            value={currentPassword}
            placeholder="Введите текущий пароль"
            required
            maxLength={25}
          />
          <img
            src={isShown.current ? showIcon.src : hideIcon.src}
            onClick={() =>
              setShown((prev) => ({
                ...prev,
                current: !prev.current,
              }))
            }
          />
          {isPasswordDirty && currentPasswordError && (
            <div style={{ color: "#FD5839" }}>{currentPasswordError}</div>
          )}
        </label>

        <label>
          Новый пароль
          <input
            onChange={(e) =>
              newPasswordHandler(e.target.value.replaceAll(" ", ""))
            }
            onBlur={(e) => blurHandler(e)}
            name="password"
            type={isShown.old ? "text" : "password"}
            value={newPassword}
            placeholder="Введите новый пароль"
            required
            maxLength={25}
          />
          <img
            src={isShown.old ? showIcon.src : hideIcon.src}
            onClick={() =>
              setShown((prev) => ({
                ...prev,
                old: !prev.old,
              }))
            }
          />
          {isPasswordDirty && passwordError && (
            <div style={{ color: "#FD5839" }}>{passwordError}</div>
          )}
        </label>
        <label>
          Повторите новый пароль
          <input
            onChange={(e) =>
              passwordRepeatHandler(e.target.value.replaceAll(" ", ""))
            }
            onBlur={(e) => blurHandler(e)}
            name="password"
            type={isShown.new ? "text" : "password"}
            value={repeatNewPassword}
            placeholder="Повторите новый пароль"
            required
            maxLength={25}
          />
          <img
            src={isShown.new ? showIcon.src : hideIcon.src}
            onClick={() =>
              setShown((prev) => ({
                ...prev,
                new: !prev.new,
              }))
            }
          />
          {isPasswordDirty && passwordError && (
            <div style={{ color: "#FD5839" }}>{passwordError}</div>
          )}
          {samePasswords === "Пароли не совпадают" && (
            <div style={{ color: "#FD5839" }}>{samePasswords}</div>
          )}
        </label>
      </form>
      {serverError && (
        <div style={{ color: "#FD5839" }}>{serverErrorValue}</div>
      )}
      <div className={styles.buttons}>
        <button className={styles.save} onClick={changePassword}>
          Сохранить
        </button>

        <button className={styles.cancel} onClick={cancellation}>
          Отмена
        </button>
      </div>
    </div>
  );
};
