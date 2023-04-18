import type { NextPage } from "next";
import Link from "next/link";
import styles from "./TabBar.module.scss";
import React, { useEffect, useState, FC } from "react";
import search from "app/assets/images/search-normal.svg";
import searchActive from "app/assets/images/search-normalActive.svg";
import tapes from "app/assets/images/play-cricle.svg";
import tapesActive from "app/assets/images/play-circleActive.svg";
import ad from "app/assets/images/document.svg";
import adActive from "app/assets/images/documentActive.svg";
import deals from "app/assets/images/bookmark.svg";
import dealsActive from "app/assets/images/bookmarkActive.svg";
import profile from "app/assets/images/frame.svg";
import profileActive from "app/assets/images/frameActive.svg";
import { useRouter } from "next/router";

const TabBar: FC = () => {
    const tabData = [
        {
            title: "Поиск",
            route: "/m/search",
            src: search.src,
            activeSrc: searchActive.src,
            tab: "search",
        },
        {
            title: "Tapes",
            route: "/m/tapes",
            src: tapes.src,
            activeSrc: tapesActive.src,
            tab: "tapes",
        },
        {
            title: "Объявления",
            route: "/m/myads",
            src: ad.src,
            activeSrc: adActive.src,
            tab: "ad",
        },
        {
            title: "Сделки",
            route: "/m/deals",
            src: deals.src,
            activeSrc: dealsActive.src,
            tab: "deals",
        },
        {
            title: "Профиль",
            route: "/m/profile",
            src: profile.src,
            activeSrc: profileActive.src,
            tab: "profile",
        },
    ];

    const router = useRouter();

    const [tab, setTab] = useState<string>("profile");

    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footer__content}>
                    {tabData.map((item) => (
                        <Link href={item.route} key={item.title}>
                            <div
                                className={`${styles.footer__content__item} ${router.pathname === item.route ? styles.active : null
                                    }`}
                                onClick={() => setTab(item.tab)}
                            >
                                <img
                                    className={styles.active__img}
                                    src={
                                        router.pathname === item.route
                                            ? item.activeSrc
                                            : item.src
                                    }
                                />
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabBar;
