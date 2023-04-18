import React, { useEffect, useState } from "react";

import { usersApi } from "app/store/services/users";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

import { Login, Password, Number } from "app/web/features/profile";

import { SettingsForm } from "../../model";

import styles from "./UserProfileSettings.module.scss";

export const UserProfileSetting = () => {
  const profile = useSelector((state: RootState) => state.profile);

  const [form, setForm] = useState<SettingsForm>({
    phoneNumber: "",
    userId: "",
    login: "",
  });
  const [tab, setTab] = useState<"login" | "password" | "phoneNumber">("login");

  const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();

  useEffect(() => {
    getInfo();
  }, []);

  // получение инфы о пользователе
  const getInfo = async () => {
    try {
      const payload = await myInfoQuery("").unwrap();

      setForm({
        ...form,
        userId: payload.id,
        login: payload.login,
        phoneNumber: payload.phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.setting}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${tab === "login" && styles.tab__active}`}
            onClick={() => setTab("login")}
          >
            <p className={styles.tab__name}>Логин</p>
            <p className={styles.tab__value}>{profile.login}</p>
          </div>
          <div
            className={`${styles.tab} ${
              tab === "password" && styles.tab__active
            }`}
            onClick={() => setTab("password")}
          >
            <p className={styles.tab__name}>Пароль</p>
            <p className={styles.tab__value}>*********</p>
          </div>
          <div
            className={`${styles.tab} ${
              tab === "phoneNumber" && styles.tab__active
            }`}
            onClick={() => setTab("phoneNumber")}
          >
            <p className={styles.tab__name}>Телефон</p>
            <p className={styles.tab__value}>{profile.phoneNumber}</p>
          </div>
        </div>
        <div className={styles.forms}>
          {/* form login  */}
          {tab === "login" && <Login form={form} setForm={setForm} />}
          {/* form password */}
          {tab === "password" && <Password form={form} />}
          {/* form number */}
          {tab === "phoneNumber" && <Number form={form} setForm={setForm} />}
        </div>
      </div>
    </div>
  );
};
