import React, { ChangeEvent, useLayoutEffect, useState } from "react";
import styles from "./ModalCancel.module.scss";
import trash from "app/assets/images/trash.svg";
import gallery from "app/assets/images/gallery.svg";
import { usersApi } from "app/store/services/users";
import { useRouter } from "next/router";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { filesApi } from "app/store/services/files";

const ModalCancel = ({ active, setActive }: any) => {
    const router = useRouter();
    const [uploadPhotoQuery] = filesApi.useUploadPhotoMutation();
    const [updateUserQuery] = usersApi.useUpdateUserMutation();

    const { data } = usersApi.useGetMyInfoQuery("");

    // смена аватара
    const changeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file: File = (event.target.files as FileList)[0];
        const fD = new FormData();
        fD.append("file", file);
        fD.append("folder", "users_avatar");
        const payload = await uploadPhotoQuery(fD).unwrap();

        if (payload.state === "0000") {
            const data = await updateUserQuery({
                userId: cookie.get("t"),
                image: payload.link,
            }).unwrap();

            switch (data.state) {
                case "0000":
                    router.push("/m/profile/");
                    break;

                default:
                    break;
            }
        }
    };

    return (
        <>
            <form>
                <div
                    className={`${
                        active ? styles.modal__active : styles.modal
                    }`}
                    onClick={() => setActive(false)}
                >
                    <div
                        className={styles.modal__content}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modal__content__flex}>
                            <img
                                src={gallery.src}
                                alt="photo"
                                style={{ width: "24px", height: "24px" }}
                            />
                            {/* <span>Выбрать фото из галереи</span> */}
                            <label>
                                Выбрать фото из галереи
                                <input
                                    type="file"
                                    className={
                                        styles.modal__content__flex_input
                                    }
                                    onChange={changeAvatar}
                                />
                            </label>
                        </div>
                        {/* <div className={styles.modal__content__flex}>
                            <img src={trash.src} alt="" />
                            <span>Удалить</span>
                        </div> */}
                        <button
                            className={styles.modal__content__btn}
                            onClick={() => setActive(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ModalCancel;
