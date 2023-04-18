import React, { useState, FC } from "react";
import styles from "./SignUp.module.scss";
import { setType, setPhone } from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { api } from "app/store/services/passwordRestoreAPI";
import { RootState } from "app/store/store";
import PhoneInput from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";

const SignUp: FC = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState<string>("+7");

    // const [phoneError, setPhoneError] = useState<string>("Заполните поле");
    const [isPhoneDirty, setIsPhoneDirty] = useState<boolean>(false);
    // Если не все данные получены
    const [isEnoughData, setIsEnoughData] = useState<boolean>(false);
    // Если номер занят уже другим пользователем
    const [isBusy, setIsBusy] = useState<boolean>(false);

    // const phoneHandler = (e: any) => {
    //     setPhoneNumber(e.target.value);
    //     const re = /^(\+91-|\+91|0)?\d{11}$/;
    //     if (!re.test(String(e.target.value).toLowerCase())) {
    //         setPhoneError("Неккоректный номер");
    //     } else {
    //         setPhoneError("");
    //     }
    // };

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

    // const [registrationQuery] = api.useRegistrationMutation();

    // const reg = async () => {
    //     try {
    //         const res = await registrationQuery({
    //             phoneNumber: phone,
    //         });
    //         if ("data" in res && res.data.state === "0000") {
    //             dispatch(setType("code"));
    //             console.log(res.data);
    //         }
    //         if ("data" in res && res.data.state === "1001") {
    //             setIsEnoughData(true);
    //         }
    //         if ("data" in res && res.data.state === "1007") {
    //             setIsBusy(true);
    //         }
    //         // console.log(res.data.state, "asdasdas");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const [registrationCall] = api.useRegistrationCallMutation();

    const regCall = async () => {
        try {
            console.log(phoneNumber);
            const res: any = await registrationCall(phoneNumber);
            if (res.data.state === "0000") {
                dispatch(setPhone(phoneNumber));
                dispatch(setType("code"));
            }
            if (res.data.state === "1001") {
                setIsEnoughData(true);
            }
            if (res.data.state === "1007") {
                setIsBusy(true);
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.signUp}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
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
                    className={styles.signUp__btn}
                    type="submit"
                    onClick={regCall}
                >
                    Запросить код
                </button>
                {isEnoughData && <span>Не все данные получены</span>}
                {isBusy && <span>Номер занят</span>}
            </form>
        </div>
    );
};

export default SignUp;
