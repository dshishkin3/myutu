import type { NextPage } from "next";
import styles from "./m.module.scss";
import React, { useEffect, useState } from "react";
import Forgot from "app/components/mobile/Forgot/Forgot";
import Authorization from "app/components/mobile/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import NewPass from "app/components/mobile/NewPass/NewPass";
import Code from "app/components/mobile/Code/Code";
import SignUp from "app/components/mobile/Authorization/SignUp/SignUp";

const Index: NextPage = () => {
    const dispatch = useDispatch();
    const { phone, type } = useSelector(
        (state: RootState) => state.authentication
    );
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

export default Index;
