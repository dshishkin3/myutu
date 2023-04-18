import ModalCancel from "app/components/mobile/Modal/ModalCancel/ModalCancel";
import React, { useState } from "react";
import styles from "./changeAvatar.module.scss";
import camera from "../../../../app/assets/images/camera.svg";
import editPhoto from "app/assets/images/editPhoto.svg";
import { usersApi } from "app/store/services/users";
import Header from "app/components/mobile/widgets/Header/Header";
import ModalMenu from "app/mobile/shared/ui/modalMenu";

const Index = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(true);

    const { data } = usersApi.useGetMyInfoQuery("");

    return (
        <div className={styles.container}>
            <Header title={"Сменить фото профиля"} />
            {data && (
                <div className={styles.content}>
                    <div className={styles.content__position}>
                        <div className={styles.photo}>
                            <img
                                src={data.image}
                                onClick={() => setIsModalActive(true)}
                                alt="photo"
                                className={styles.photo__static}
                            />
                            <img
                                src={editPhoto.src}
                                alt="edit"
                                className={styles.photo__inner}
                            />
                        </div>
                        <span>{data.login}</span>
                    </div>
                </div>
            )}
            {isModalActive && (
                <ModalMenu
                    active={isModalActive}
                    setActive={() => setIsModalActive(false)}
                >
                    <ModalCancel
                        active={isModalActive}
                        setActive={setIsModalActive}
                    />
                </ModalMenu>
            )}
        </div>
    );
};

export default Index;
