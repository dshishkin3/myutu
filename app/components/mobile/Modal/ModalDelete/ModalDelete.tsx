import React, { useState } from "react";
import styles from "./ModalDelete.module.scss";
import Router, { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";

const ModalDelete = ({ setActive }: any) => {
    const router = useRouter();

    const [deleteProfile] = usersApi.useDeleteUserMutation();

    const deleteUser = async () => {
        try {
            let payload = {
                userId: cookie.get("t"),
            };
            const res: any = await deleteProfile(payload);
            if (res.data.state === "0000") {
                document.cookie =
                    "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.push("/auth");
            }
            console.log(res.data, "DELETE USER");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <p className={styles.text}>Удалить профиль?</p>
            <div className={styles.modal__content}>
                <button
                    className={styles.modal__content__left}
                    onClick={deleteUser}
                >
                    Да
                </button>
                <button
                    className={styles.modal__content__right}
                    onClick={() => setActive(false)}
                >
                    Отмена
                </button>
            </div>
        </>
    );
};

export default ModalDelete;
