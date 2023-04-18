import React, { useState, useEffect, FC } from "react";
import styles from "./SignIn.module.scss";
import hideIcon from "app/assets/images/hideIcon.svg";
import showIcon from "app/assets/images/showIcon.svg";
import {
    setType,
    setPhone,
    onLogin,
    setNewPasswordType,
} from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { usersApi } from "app/store/services/users";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form/dist/controller";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { InputMask } from "primereact/inputmask";
import { RootState } from "app/store/store";

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    // Если пароль неправильный
    const [isWrongPass, setIsWrongPass] = useState<boolean>(false);
    // Если неккоректный формат номера
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    // Если не существует пользователя
    const [isUserUndefined, setIsUserUndefined] = useState<boolean>(false);
    const [isShown, setIsShown] = useState<boolean>(false);

    const [checkPhone, setCheckPhone] = useState<any>("");

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
            login: "",
            password: "",
        },
    });
    const [loginCheck] = usersApi.useLoginMutation();

    const onSubmit = async () => {
        try {
            const res: any = await loginCheck(getValues());
            if (res.data.state === "0000") {
                cookie.set("t", res.data.value);
                dispatch(setPhone(phoneNumber));
                dispatch(setType("authorization"));
                dispatch(onLogin(res.data.value));
                router.push("/m/profile");
            }
            if (res.data.state === "1020") {
                setIsWrongPass(true);
            }
            // if (res.data.state === "1036") {
            //     setIsIncorrect(true);
            // }
            if (res.data.state === "1017") {
                setIsUserUndefined(true);
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsUserUndefined(false);
        setIsWrongPass(false);
    }, [getValues("login"), getValues("password")]);

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );
    console.log(isLoggedIn, "Залогинился / не залогинился (signIn)");

    const forgotPass = () => {
        dispatch(setNewPasswordType("restorePass"));
        dispatch(setType("forgot"));
    };

    return (
        <div className={styles.signIn}>
            <form
                className={styles.loginForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <label>
                    Телефон
                    <input
                        {...register("login", {
                            required: "Заполните поле",
                            pattern: {
                                value: /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/,
                                message: "Неверный формат номера",
                            },
                        })}
                        type="text"
                        placeholder="Введите телефон"
                        maxLength={12}
                        inputMode="numeric"
                        style={{
                            border:
                                isUserUndefined || errors.login
                                    ? "1px solid #FD5839"
                                    : "1px solid #c9c9c9",
                        }}
                    />
                    {errors.login && <span>{errors.login.message}</span>}
                    {isUserUndefined && <span>Пользователя не существует</span>}
                </label>
                <label>
                    Пароль
                    <input
                        {...register("password", {
                            required: "Заполните поле",
                        })}
                        placeholder="Введите пароль"
                        type={isShown ? "text" : "password"}
                        style={{
                            border:
                                isWrongPass || errors.password
                                    ? "1px solid #FD5839"
                                    : "1px solid #c9c9c9",
                        }}
                    />
                    <img
                        className={styles.eye}
                        src={isShown ? hideIcon.src : showIcon.src}
                        onClick={() => setIsShown((prev) => !prev)}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                    {isWrongPass && <span>Неверный пароль</span>}
                </label>
                <div className={styles.forgotPass}>
                    <span onClick={forgotPass}>Забыли пароль?</span>
                </div>
                <button
                    className={styles.signIn__btn}
                    onClick={() => onSubmit()}
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default SignIn;
