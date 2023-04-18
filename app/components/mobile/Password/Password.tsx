import React, { useState } from "react";
import styles from "./Password.module.scss";
import Input from "app/mobile/shared/ui/input";
import Button from "app/mobile/shared/ui/button";
import Header from "app/components/mobile/widgets/Header/Header";
import { usersApi } from "app/store/services/users";
import { useRouter } from "next/router";
import { cookie } from "app/utils/helpers/cookies.helpers";

const Password = ({}) => {
    const router = useRouter();
    // Неверный пароль
    const [isWrongPass, isSetWrongPass] = useState<boolean>(false);
    // Текущий пароль
    const [currentPassword, setCurrentPassword] = useState<string>("");
    // Новый пароль
    const [newPassword, setNewPassword] = useState<string>("");
    // Повторить новый пароль
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
    // Если пароли НОВЫЕ не совпадают
    const [isErrorPass, setIsErrorPass] = useState<boolean>(false);
    // Проверка пароля от 0 до 6 символов
    const [message, setMessage] = useState<boolean>(false);

    const checkPassHandler = () => {
        if (newPassword.length > 0 && repeatNewPassword.length < 6) {
            setMessage(true);
            return;
        } else {
            setMessage(false);
        }
    };

    const checkPassRepeatHandler = () => {
        if (repeatNewPassword != newPassword) {
            setIsErrorPass(true);
        } else {
            setIsErrorPass(false);
        }
    };

    const [changePass] = usersApi.useChangePasswordMutation();

    const changePassword = async () => {
        checkPassHandler();
        checkPassRepeatHandler();
        try {
            let payload = {
                userId: cookie.get("t"),
                currentPassword,
                newPassword,
            };
            const res: any = await changePass(payload);
            if (res.data.state === "0000") {
                router.push("/m/profile");
            }
            if (res.data.state === "1020") {
                isSetWrongPass(true);
            }
            console.log(res.data, "Change pass");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <Header title="Смена пароля" />
            <div className={styles.content}>
                <div className={styles.content__flex}>
                    <div className={styles.currentPass}>
                        <Input
                            label="Текущий пароль"
                            type="password"
                            placeholder="Введите текущий пароль"
                            value={currentPassword}
                            onChange={(e: any) =>
                                setCurrentPassword(e.target.value)
                            }
                            eyeShow
                            style={{
                                border: isWrongPass
                                    ? "1px solid #FD5839"
                                    : "1px solid #c9c9c9",
                            }}
                        />
                        {isWrongPass && <span>Неверный пароль</span>}
                    </div>
                    <div className={styles.repeatPass}>
                        <Input
                            label="Новый пароль"
                            type="password"
                            placeholder="Введите новый пароль"
                            value={newPassword}
                            onChange={(e: any) =>
                                setNewPassword(e.target.value)
                            }
                            eyeShow
                            style={{
                                border: message
                                    ? "1px solid #FD5839"
                                    : "1px solid #c9c9c9",
                            }}
                        />
                        {message && (
                            <span>
                                Пароль должен содержать не меньше 6 символов
                            </span>
                        )}
                    </div>
                    <div className={styles.repeatPass}>
                        <Input
                            label="Повторите новый пароль"
                            type="password"
                            placeholder="Повторите новый пароль"
                            value={repeatNewPassword}
                            onChange={(e: any) =>
                                setRepeatNewPassword(e.target.value)
                            }
                            eyeShow
                            style={{
                                border: isErrorPass
                                    ? "1px solid #FD5839"
                                    : "1px solid #c9c9c9",
                            }}
                        />
                        {isErrorPass && <span>Пароли не совпадают</span>}
                    </div>
                </div>
                <div className={styles.content__btn}>
                    <Button
                        text="Сохранить"
                        type="submit"
                        onClick={changePassword}
                    />
                    <Button
                        text="Отмена"
                        colorText="#C9C9C9"
                        background="white"
                        border="1px solid #C9C9C9"
                        type="reset"
                        onClick={() => {
                            setCurrentPassword("");
                            setNewPassword("");
                            setRepeatNewPassword("");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Password;
