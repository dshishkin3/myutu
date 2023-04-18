import React, { useEffect, useState, FC } from "react";
import styles from "./Header.module.scss";
import arrowMenu from "app/assets/images/arrowMenu.svg";
import { useRouter } from "next/router";
type IHeader = {
    title: string;
};

const Header = ({ title }: IHeader) => {
    const router = useRouter();
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__content}>
                    <img src={arrowMenu.src} alt="arrow" onClick={() => router.back()} />
                    <span>{title}</span>
                </div>
            </div>
        </>
    );
};

export default Header;
