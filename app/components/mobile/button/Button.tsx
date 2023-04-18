import Image from "next/image";
import React from "react";
import style from "./Button.module.scss";

type ButtonProps = {
    text: string;
    icon?: string;
    className?: string;
    handleClick?: (event: any) => void;
    disabled?: boolean;
};

const Button = ({
    text,
    icon,
    handleClick,
    disabled,
    className = "",
}: ButtonProps & any) => {
    return (
        <button
            className={`${style.btn} ${style[className]}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {icon && <Image src={icon} alt="" />}
            <span>{text}</span>
        </button>
    );
};

export default Button;
