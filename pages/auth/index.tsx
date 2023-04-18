import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

import Forgot from "app/components/screens/authorization/Forgot/Forgot";
import NewPass from "app/components/screens/authorization/NewPass/NewPass";
import Code from "app/components/screens/authorization/Code/Code";
import SignUp from "app/components/screens/authorization/SignUp/SignUp";
import Authorization from "app/components/screens/authorization/Authorization";

import styles from "./Auth.module.scss";

const Auth: NextPage = () => {
  const { type } = useSelector((state: RootState) => state.authentication);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.window}>
          {type === "authorization" && <Authorization />}
          {type === "signUp" && <SignUp />}
          {type === "forgot" && <Forgot />}
          {type === "newPass" && <NewPass />}
          {type === "code" && <Code />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
