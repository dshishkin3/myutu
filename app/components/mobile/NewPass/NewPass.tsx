import React, { useState, useEffect } from "react";
import styles from "./NewPass.module.scss";
import arrow from "app/assets/images/arrow.svg";
import hideIcon from "app/assets/images/hideIcon.svg";
import showIcon from "app/assets/images/showIcon.svg";
import checkSuccess from "app/assets/images/check_success.svg";
import checkError from "app/assets/images/check_error.svg";
import {
    setType,
    setPhone,
    onLogin,
} from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { api } from "app/store/services/passwordRestoreAPI";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const NewPass = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => state.authentication.phone);
    const newPasswordType = useSelector(
        (state: RootState) => state.authentication.newPasswordType
    );
    // Пароли не совпали
    const [isWrongPass, setIsWrongPass] = useState<boolean>(false);
    // type: 'pass' / 'text'
    const [isShown, setIsShown] = useState<{ old: boolean; new: boolean }>({
        old: false,
        new: false,
    });
    const [checkPass, setCheckPass] = useState<{
        eightCharaters: boolean;
        oneNumber: boolean;
        oneLetter: boolean;
    }>({
        eightCharaters: false,
        oneNumber: false,
        oneLetter: false,
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        getValues,
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            newPassword: "",
            repeatNewPassword: "",
        },
    });

    console.log(getValues(), "getValues");

    // функция, для проверки - регистрация или восстановление пароля
    const checkPasswordType = () => {
        if (newPasswordType === "regPass") {
            regPass();
        } else {
            restorePass();
        }
    };

    console.log(newPasswordType, "asdasdasdasdaasdasd");

    const [fastRegistration] = api.useRegistrationMutation();

    const regPass = async () => {
        try {
            let payload = {
                phoneNumber: phone,
                password: "newPassword",
            };
            console.log(payload);
            const res: any = await fastRegistration(payload);
            if (res.data.state === "0000") {
                dispatch(setType("authorization"));
                cookie.set("t", res.data.value);
                dispatch(onLogin(res.data.value));
                router.push("/profile");
            }
            if (res.data.state === "1007") {
                restorePass();
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    const [restoreAccepted] = api.useResetPasswordMutation();

    const restorePass = async () => {
        try {
            let payload = {
                userData: phone,
                newPassword: getValues("newPassword"),
                repeatNewPassword: getValues("repeatNewPassword"),
            };
            console.log(payload, "PAYLOAAAAAAAAAAAAD");
            const res: any = await restoreAccepted(payload);
            if (res.data.state === "0000") {
                dispatch(setType("authorization"));
            }
            if (res.data.state === "1002") {
                setIsWrongPass(true);
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsWrongPass(false);
    }, [getValues("newPassword"), getValues("repeatNewPassword")]);

    // Валидация
    const watchNewPassword = watch("newPassword");

    useEffect(() => {
        setCheckPass((prev) => ({
            ...prev,
            eightCharaters: getValues("newPassword").length > 8,
        }));
        setCheckPass((prev) => ({
            ...prev,
            oneNumber: /[0-9]/.test(getValues("newPassword")),
        }));
        setCheckPass((prev) => ({
            ...prev,
            oneLetter: /[a-z]/.test(getValues("newPassword")),
        }));
    }, [watchNewPassword]);

    return (
        <div className={styles.window}>
            <form
                className={styles.loginForm}
                onSubmit={handleSubmit(checkPasswordType)}
            >
                <img
                    src={arrow.src}
                    alt="arrow"
                    onClick={() => dispatch(setType("authorization"))}
                />
                <label>
                    Новый пароль
                    <input
                        {...register("newPassword", {
                            required: "Заполните поле",
                        })}
                        placeholder="Введите пароль"
                        type={isShown.old ? "text" : "password"}
                        style={{
                            border: isWrongPass
                                ? "1px solid #FD5839"
                                : "1px solid #c9c9c9",
                        }}
                    />
                    <img
                        className={styles.eye}
                        src={isShown.old ? hideIcon.src : showIcon.src}
                        onClick={() =>
                            setIsShown((prev) => ({
                                ...prev,
                                old: !prev.old,
                            }))
                        }
                    />
                    {errors.newPassword && (
                        <span>{errors.newPassword.message}</span>
                    )}
                </label>
                <label>
                    Повторите новый пароль
                    <input
                        {...register("repeatNewPassword", {
                            required: "Заполните поле",
                        })}
                        placeholder="Введите пароль"
                        type={isShown.new ? "text" : "password"}
                        style={{
                            border: isWrongPass
                                ? "1px solid #FD5839"
                                : "1px solid #c9c9c9",
                        }}
                    />
                    <img
                        className={styles.eye}
                        src={isShown.new ? hideIcon.src : showIcon.src}
                        onClick={() =>
                            setIsShown((prev) => ({
                                ...prev,
                                new: !prev.new,
                            }))
                        }
                    />
                    {errors.repeatNewPassword && (
                        <span>{errors.repeatNewPassword.message}</span>
                    )}
                    {isWrongPass && <span>Пароли не совпали</span>}
                </label>
                <div className={styles.passCheck}>
                    <div className={styles.passCheck__content}>
                        <img
                            src={
                                checkPass.eightCharaters
                                    ? checkSuccess.src
                                    : checkError.src
                            }
                        />
                        <span
                            style={{
                                color: checkPass.eightCharaters
                                    ? "#24DD7D"
                                    : "#FD5839",
                            }}
                        >
                            не менее 8 символов
                        </span>
                    </div>
                    <div className={styles.passCheck__content}>
                        <img
                            src={
                                checkPass.oneNumber
                                    ? checkSuccess.src
                                    : checkError.src
                            }
                            alt="check"
                        />
                        <span
                            style={{
                                color: checkPass.oneNumber
                                    ? "#24DD7D"
                                    : "#FD5839",
                            }}
                        >
                            <span
                                style={{
                                    color: checkPass.oneNumber
                                        ? "#24DD7D"
                                        : "#FD5839",
                                }}
                            >
                                как минимум 1 цифра
                            </span>
                        </span>
                    </div>
                    <div className={styles.passCheck__content}>
                        <img
                            src={
                                checkPass.oneLetter
                                    ? checkSuccess.src
                                    : checkError.src
                            }
                            alt="check"
                        />
                        <span>
                            <span
                                style={{
                                    color: checkPass.oneLetter
                                        ? "#24DD7D"
                                        : "#FD5839",
                                }}
                            >
                                как минимум 1 строчная буква
                            </span>
                        </span>
                    </div>
                </div>
                <button
                    className={styles.save}
                    onClick={checkPasswordType}
                    type="submit"
                >
                    Сохранить пароль
                </button>
            </form>
        </div>
    );
};

export default NewPass;
