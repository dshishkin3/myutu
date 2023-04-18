import React, { useState } from "react";
import styles from "./style.module.scss";
import Router, { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";

interface ModalProps {
    children: React.ReactNode;
    active: any;
    setActive: any;
}

const ModalMenu = ({ children, active, setActive }: ModalProps) => {
    const router = useRouter();

    return (
        <>
            <div
                className={`${active ? styles.modal__active : styles.modal}`}
                onClick={() => setActive(false)}
            >
                <div
                    className={styles.modal__content}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default ModalMenu;
