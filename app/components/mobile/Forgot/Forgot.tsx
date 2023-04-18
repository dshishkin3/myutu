import styles from "./Forgot.module.scss";
import React, { useEffect, useState } from "react";
import arrow from "../../../../app/assets/images/arrow.svg";
import {
    setType,
    setPhone,
    setNewPasswordType,
} from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { api } from "app/store/services/passwordRestoreAPI";
import PhoneInput from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";

const Forgot = () => {
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => state.authentication);
    const [phoneNumber, setPhoneNumber] = useState<string>("+7");

    const [isPhoneDirty, setIsPhoneDirty] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<string>("Заполните поле");
    const [noUser, setNoUser] = useState<boolean>(false);

    const authSetType = () => {
        dispatch(setType("authorization"));
        dispatch(setNewPasswordType("resPass")); // функция для указания проверки типа - регистрация или восстановление пароля
    };

    const phoneHandler = (e: any) => {
        setPhone(e.target.value);
        const re = /^(\+91-|\+91|0)?\d{11}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhoneError("Неккоректный номер");
        } else {
            setPhoneError("");
        }
    };

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case "phone":
                setIsPhoneDirty(true);
                break;
        }
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
    };

    const [restoreCall] = api.useRestoreCallMutation();

    const regForgot = async () => {
        try {
            const res = await restoreCall(phoneNumber);
            if ("data" in res && res.data.state === "0000") {
                dispatch(setPhone(phoneNumber));
                dispatch(setType("code"));
            }
            if ("data" in res && res.data.state === "1017") {
                setNoUser(true);
            }
            // console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.window}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <img
                    className={styles.arrow}
                    src={arrow.src}
                    alt="arrow"
                    onClick={authSetType}
                />
                <label>
                    Телефон
                    <PhoneInput
                        onChange={(e: any) => setPhoneNumber(e)}
                        onBlur={(e: any) => blurHandler(e)}
                        name="phone"
                        value={phoneNumber}
                        placeholder="Введите телефон"
                        required
                        labels={ru}
                        autoComplete={"off"}
                    />
                    {/* {isPhoneDirty && phoneError && (
                        <div style={{ color: "#FD5839" }}>{phoneError}</div>
                    )} */}
                </label>
                <button
                    className={styles.forgotPass}
                    type="submit"
                    onClick={regForgot}
                >
                    Восстановить пароль
                </button>
                {noUser && <span>Пользователь не найден</span>}
            </form>
        </div>
    );
};
export default Forgot;
