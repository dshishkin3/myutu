import { ReactNode, FC, useEffect } from "react";
import TabBar from "app/components/mobile/widgets/TabBar/TabBar";
import type { NextPage } from "next";
import Header from "app/components/layout/Header/Header";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { loggedUserID, logged } from "app/store/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import styles from "./style.module.scss";

const LayoutMobile: FC<any> = ({ children }) => {
    const { query, pathname } = useRouter();

    const isNewMaket = useMemo(
        () =>
            ["/m/profile", "/m/auth", "/m/deals", "/m/tapes", "/m/myads"].some(
                (item) => pathname.startsWith(item)
            ),
        [pathname]
    );
    const [uid, setUid] = useRecoilState(loggedUserID);
    const [isLogged, setIsLogged] = useRecoilState(logged);
    useEffect(() => {
        console.log(cookie.get("t"));

        if (cookie.get("t").length !== 0) {
            setUid(cookie.get("t"));
            setIsLogged(true);
        }
    }, []);
    return (
        <div className={styles.mobile}>
            <div className={styles.mobile__content}>{children}</div>
            <TabBar />
        </div>
    );
};

export default LayoutMobile;
