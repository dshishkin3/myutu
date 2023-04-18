import React, { useState } from "react";
import Router from "next/router";

import arrow from "../../../../../app/assets/images/arrow.svg";
import hideIcon from "../../../../../app/assets/images/hideIcon.svg";
import showIcon from "../../../../../app/assets/images/showIcon.svg";

import {
  setType,
  setPhone,
  onLogin,
} from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { api } from "app/store/services/passwordRestoreAPI";
import { cookie } from "app/utils/helpers/cookies.helpers";
import Validate from "./validate/Validate";

import styles from "./NewPass.module.scss";

const NewPass = () => {
  const dispatch = useDispatch();
  const phone = useSelector((state: RootState) => state.authentication.phone);
  const newPasswordType = useSelector(
    (state: RootState) => state.authentication.newPasswordType
  );

  // не менее 8 символов
  const [characters, setCharacters] = useState<"default" | "success" | "error">(
    "default"
  );
  // как минимум 1 цифра
  const [numberCheck, setNumberCheck] = useState<
    "default" | "success" | "error"
  >("default");

  // как минимум одна строчная буква
  const [stringCheck, setStringCheck] = useState<
    "default" | "success" | "error"
  >("default");

  const [isShown, setShown] = useState<{ old: boolean; new: boolean }>({
    old: false,
    new: false,
  });
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [isPasswordDirty, setIsPasswordDirty] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("Заполните поле");

  const [restoreAccepted] = api.useResetPasswordMutation();
  const [registration] = api.useRegistrationMutation();

  // функция, для проверки - регистрация или восстановление пароля
  const checkPasswordType = () => {
    if (newPasswordType === "regPass") {
      regPass();
    } else {
      restorePass();
    }
  };

  const passwordHandler = (value: any) => {
    setNewPassword(value);
    if (value.length < 8) {
      // setPasswordError("Пароль должен состоять из более 8 символов");
      setCharacters("error");
      if (value !== value) {
        setPasswordError("Заполните поле");
      }
    } else {
      setPasswordError("");
      setCharacters("success");
    }

    // проверки на новую валидация
    if (/\d/.test(value)) {
      setNumberCheck("success");
    } else {
      setNumberCheck("error");
    }

    if (/[a-zа-яё]/i.test(value)) {
      setStringCheck("success");
    } else {
      setStringCheck("error");
    }
  };

  const passwordRepeatHandler = (value: any) => {
    setRepeatNewPassword(value);
    if (value.length < 8) {
      // setPasswordError("Пароль должен состоять из более 8 символов");
      setCharacters("error");
      if (!value) {
        setPasswordError("Заполните поле");
      }
    } else {
      setPasswordError("");
      setCharacters("success");
    }

    // проверки на новую валидация
    if (/\d/.test(value)) {
      setNumberCheck("success");
    } else {
      setNumberCheck("error");
    }

    if (/[a-zа-яё]/i.test(value)) {
      setStringCheck("success");
    } else {
      setStringCheck("error");
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "password":
        setIsPasswordDirty(true);
        break;
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
  };

  const regPass = async () => {
    try {
      let payload = {
        phoneNumber: phone,
        password: newPassword,
      };
      console.log(payload);
      const res: any = await registration(payload);
      if (res.data.state === "0000") {
        dispatch(setType("authorization"));
        dispatch(onLogin(res.data.value));
        cookie.set("t", res.data.value);
        Router.push("/profile/myads");
      }
      console.log(res.data, "asdasdas");
    } catch (error) {
      console.log(error);
    }
  };

  const restorePass = async () => {
    try {
      let payload = {
        userData: phone,
        newPassword,
        repeatNewPassword,
      };

      const res: any = await restoreAccepted(payload);
      if (res.data.state === "0000") {
        dispatch(setType("authorization"));
        setPasswordError("");
      }

      if (res.data.state === "1002") {
        setPasswordError("Пароли не совпадают");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.window}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <img
          src={arrow.src}
          style={{ cursor: "pointer" }}
          alt="arrow"
          onClick={() => dispatch(setType("authorization"))}
        />
        <label>
          Новый пароль
          <input
            onChange={(e) =>
              passwordHandler(e.target.value.replaceAll(" ", ""))
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
          {/* валидация */}
          <Validate
            characters={characters}
            numberCheck={numberCheck}
            stringCheck={stringCheck}
          />
        </label>
        <button
          className={styles.save}
          onClick={checkPasswordType}
          type="submit"
        >
          Сохранить пароль
        </button>
      </form>
    </div>
  );
};

export default NewPass;
