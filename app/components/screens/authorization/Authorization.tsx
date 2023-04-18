import React, { FC, useState } from "react";

import SignIn from "app/components/screens/authorization/SignIn/SignIn";
import SignUp from "app/components/screens/authorization/SignUp/SignUp";

import styles from "./Authorization.module.scss";

const Authorization: FC = () => {
  const [type, setType] = useState<"signUp" | "signIn">("signIn");
  const [tab, setTab] = useState<number>(1);

  return (
    <>
      <div className={styles.conatiner}>
        <div className={styles.window}>
          <div className={styles.hat}>
            <div
              className={`${styles.hat__login} ${
                tab === 1 ? styles.active : null
              }`}
              onClick={() => {
                setType("signIn");
                setTab(1);
              }}
            >
              <span>Вход</span>
            </div>
            <div
              className={`${styles.hat__registration} ${
                tab === 2 ? styles.active : null
              }`}
              onClick={() => {
                setType("signUp");
                setTab(2);
              }}
            >
              <span>Регистрация</span>
            </div>
          </div>
          {type === "signIn" && <SignIn />}
          {type === "signUp" && <SignUp />}
        </div>
      </div>
    </>
  );
};

export default Authorization;
