import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./SectionList.module.scss";
import Arrow from "../../../../assets/images/arrowRight.svg";
import Button from "../../button/Button";
import ExitIcon from "../../../../assets/images/exit.svg";
import { logged, loggedUserID, showAuthModal } from "app/store/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import Router from "next/router";
import { logoutUser } from "app/store/slices/profileSlice";
import { useDispatch } from "react-redux";
import { onLogout, setType } from "app/store/slices/authentication.slices";

type MenuData = {
    title: string;
    route: string;
}[];

type SectionListProps = {
    menuData: MenuData;
};

const SectionList: React.FC<SectionListProps> = ({ menuData }) => {
    const dispatch = useDispatch();
    const [isLogged, setIsLogged] = useRecoilState(logged);
    const [loggedId, setLoggedId] = useRecoilState(loggedUserID);

    const handlerOut = () => {
        setIsLogged(false);
        setLoggedId("");
        dispatch(logoutUser());
        dispatch(onLogout());
        dispatch(setType("authorization"));
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Router.push("/m/auth");
    };

    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <div className={styles.wrapper}>
                    {menuData.map((item) => (
                        <Link href={item.route} key={item.title}>
                            <div className={styles.item}>
                                <div className={styles.title}>{item.title}</div>
                                <Image
                                    className={styles.icon}
                                    src={Arrow}
                                    alt={item.title}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
                <Button
                    icon={ExitIcon}
                    className="exit"
                    text="Выйти"
                    handleClick={() => handlerOut()}
                />
            </div>
            <span className={styles.version}>
                Версия приложения {process.env.version}
            </span>
        </div>
    );
};

export default SectionList;
