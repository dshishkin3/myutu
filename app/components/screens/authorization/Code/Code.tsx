import styles from "./Code.module.scss";
import React, { useEffect, useState, FC } from "react";
import arrow from "app/assets/images/arrow.svg";
import { setType, setPhone } from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { api } from "app/store/services/passwordRestoreAPI";
import { RootState } from "app/store/store";
import { cookie } from "app/utils/helpers/cookies.helpers";

const Code: FC = () => {
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => state.authentication);
    const newPasswordType = useSelector(
        (state: RootState) => state.authentication
    );

    const getPadTime = (time: any) => time.toString().padStart(2, "0");

    const [timeLeft, setTimeLeft] = useState<number>(1 * 60);
    const [isCounting, setIsCounting] = useState<boolean>(true);
    const [code, setCode] = useState({ 1: "", 2: "", 3: "", 4: "" });

    const minutes = getPadTime(Math.floor(timeLeft / 60));
    const seconds = getPadTime(timeLeft - minutes * 60);

    let textInput1 = React.createRef<any>();
    let textInput2 = React.createRef<any>();
    let textInput3 = React.createRef<any>();
    let textInput4 = React.createRef<any>();

    const handleLogin = (e: any) => {
        e.preventDefault();
    };

    const handleChage = (text: string, index: number) => {
        console.log(text, index);
        if (index === 1) {
            text ? textInput2.current.focus() : null;
        }
        if (index === 2) {
            text ? textInput3.current.focus() : textInput1.current.focus();
        }

        if (index === 3) {
            text ? textInput4.current.focus() : textInput2.current.focus();
        }

        if (index === 4) {
            text ? null : textInput3.current.focus();
        }
        setCode({ ...code, [index]: text });
    };

    useEffect(() => {
        setInterval(() => {
            isCounting && setTimeLeft((prev) => (prev >= 1 ? prev - 0.5 : 0));
        }, 1000);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsCounting(true);
        }
    }, [timeLeft]);

    // проверка, на "регистрацию" или "восстановление" нужен звонок. Иначе, при повторном звонке (при регистрации)
    // вылазит ошибка: "User to restore password undefined!"

    const repeatCall = () => {
        if (newPasswordType.newPasswordType === "regPass") {
            regCall();
        } else {
            recoveryCall();
        }
    };

    // Запрос для проверки кода! //------------------!!!!!!!!!!!!!!
    const [checkCode] = api.useCheckCodeMutation();

    const regCode = async () => {
        try {
            let payload = {
                userData: phone.phone,
                code: code[1] + code[2] + code[3] + code[4],
            };
            const res = await checkCode(payload);
            if ("data" in res && res.data.state === "0000") {
                dispatch(setType("newPass"));
            }
            if ("data" in res && res.data.state === "1005") {
                setIsCounting(true);
            }
            if ("data" in res && res.data.state === "1039") {
                setIsCounting((prev) => !prev);
            }
            // console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    // Запрос для повторного звонка при восстановлении пароля! //------------------!!!!!!!!!!!!!!
    const [restoreCall] = api.useRestoreCallMutation();

    const recoveryCall = async () => {
        try {
            const res: any = await restoreCall(phone.phone);
            if (res.data.state === "0000") {
                dispatch(setType("code"));
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    // Запрос для повторного звонка при регистрации! //------------------!!!!!!!!!!!!!!
    const [registrationCall] = api.useRegistrationCallMutation();

    const regCall = async () => {
        try {
            const res: any = await registrationCall(phone.phone);
            if (res.data.state === "0000") {
                dispatch(setType("code"));
            }
            console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.code}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.top}>
                    <img
                        className={styles.arrow}
                        src={arrow.src}
                        alt="arrow"
                        onClick={() => dispatch(setType("authorization"))}
                    />
                    <p>Введите последние 4 цифры</p>
                    <span>
                        Сейчас на ваш номер телефона поступит звонок. Введите
                        последние 4 цифры в поле ниже
                    </span>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.positionInput}>
                        <input
                            ref={textInput1}
                            type="number"
                            maxLength={1}
                            id="0"
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => handleChage(e.target.value, 1)}
                            className={
                                !isCounting
                                    ? styles.code_error
                                    : styles.code_success
                            }
                        ></input>
                        <input
                            ref={textInput2}
                            type="number"
                            maxLength={1}
                            id="1"
                            onChange={(e) => handleChage(e.target.value, 2)}
                            autoComplete="off"
                            className={
                                !isCounting
                                    ? styles.code_error
                                    : styles.code_success
                            }
                        ></input>
                        <input
                            ref={textInput3}
                            type="number"
                            maxLength={1}
                            onChange={(e) => handleChage(e.target.value, 3)}
                            id="2"
                            autoComplete="off"
                            className={
                                !isCounting
                                    ? styles.code_error
                                    : styles.code_success
                            }
                        ></input>
                        <input
                            ref={textInput4}
                            type="number"
                            maxLength={1}
                            onChange={(e) => handleChage(e.target.value, 4)}
                            id="3"
                            autoComplete="off"
                            className={
                                !isCounting
                                    ? styles.code_error
                                    : styles.code_success
                            }
                        ></input>
                    </div>
                    {!isCounting && <span>Цифры введены неверно</span>}
                    <button
                        disabled={!isCounting ? true : false}
                        className={styles.send}
                        type="submit"
                        onClick={regCode}
                    >
                        Отправить
                    </button>
                    {timeLeft ? (
                        <div className={styles.timer}>
                            <p>Заказать звонок повторно через</p>
                            <span>{minutes}</span>
                            <span>:</span>
                            <span>{seconds}</span>
                        </div>
                    ) : (
                        <span
                            className={styles.refresh}
                            onClick={() => {
                                setTimeLeft(60);
                                setIsCounting(true);
                                repeatCall();
                            }}
                        >
                            Запросить код снова
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};
export default Code;
