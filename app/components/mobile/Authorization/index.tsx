import type { NextPage } from "next";
import styles from "./Authorization.module.scss";
import React, { useEffect, useState } from "react";
import SignIn from "app/components/mobile/Authorization/SignIn/SignIn";
import SignUp from "app/components/mobile/Authorization/SignUp/SignUp";

const Index: NextPage = () => {
  const [type, setType] = useState<"signUp" | "signIn">("signIn");
  return (
    <>
      <div className={styles.window}>
        <div className={styles.hat}>
          <div
            className={`${styles.hat__login} ${type === "signIn" ? styles.active : null
              }`}
            onClick={() => {
              setType("signIn");
            }}
          >
            <span>Вход</span>
          </div>
          <div
            className={`${styles.hat__registration} ${type === "signUp" ? styles.active : null
              }`}
            onClick={() => {
              setType("signUp");
            }}
          >
            <span>Регистрация</span>
          </div>
        </div>
        {type === "signIn" && <SignIn />}
        {type === "signUp" && <SignUp />}
      </div>
    </>
  );
};

export default Index;
