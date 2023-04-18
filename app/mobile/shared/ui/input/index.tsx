import React, { useState } from "react";
import styles from "./style.module.scss";
import hideIcon from "app/assets/images/hideIcon.svg";
import showIcon from "app/assets/images/showIcon.svg";
import calendar from "app/assets/images/calendar.svg";
import clock from "app/assets/images/clock.svg";

type IInput = {
    eyeShow?: boolean;
    calendarShow?: boolean;
    clockShow?: boolean;
    value?: string;
    name?: string;
    label?: string;
    onChange?: (e: any) => void;
    style?: any;
    placeholder: string;
    type: string;
};

const Input = ({
    eyeShow = false,
    calendarShow = false,
    clockShow = false,
    value,
    name,
    label,
    onChange,
    style,
    placeholder,
    type,
}: IInput) => {
    const [isShown, setShown] = useState<boolean>(false);

    return (
        <div className={styles.input}>
            <label>
                {label}
                <input
                    type={isShown ? "password" : "text"}
                    // type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    style={style}
                />
                {eyeShow && (
                    <img
                        className={styles.inputWithLabel}
                        src={isShown ? showIcon.src : hideIcon.src}
                        onClick={() => setShown((prev) => !prev)}
                    />
                )}
                {calendarShow && (
                    <img
                        className={styles.inputWithoutLabel}
                        src={calendar.src}
                        alt="calendar"
                    />
                )}
                {clockShow && (
                    <img
                        className={styles.inputWithoutLabel}
                        src={clock.src}
                        alt="clock"
                    />
                )}
            </label>
        </div>
    );
};

export default Input;
