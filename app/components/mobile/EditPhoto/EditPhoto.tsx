import styles from "./EditPhoto.module.scss";
import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import editPhoto from "app/assets/images/editPhoto.svg";
import Header from "app/components/mobile/widgets/Header/Header";
import ModalСancel from "app/components/mobile/Modal/ModalCancel/ModalCancel";

const EditPhoto: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(true);

    const dispatch = useDispatch();
    const { phone, type } = useSelector(
        (state: RootState) => state.authentication
    );
    return (
        <>
            <div className={styles.container}>
                <Header title={"Сменить фото профиля"} />
                <div className={styles.content}>
                    <div className={styles.content__position}>
                        <div
                            onClick={() => setIsModalActive(true)}
                            className={styles.photo}
                        >
                            <img src={editPhoto.src} alt="edit" />
                        </div>
                        <span>userName</span>
                    </div>
                </div>
                <ModalСancel
                    active={isModalActive}
                    setActive={setIsModalActive}
                />
            </div>
        </>
    );
};

export default EditPhoto;
