import React, { useState } from "react";
import styles from "./style.module.scss";
import importSvg from "app/assets/images/import.svg";

type IButton = {
    // importShow?: boolean;
    style?: any;
    text: string;
    fontWeight?: string;
    background?: string;
    colorText?: string;
    border?: string;
    onClick?: (e: any) => void;
    type: any;
};

const Button = ({
    // importShow = false,
    style,
    text,
    fontWeight,
    background,
    colorText,
    border,
    onClick,
    type,
}: IButton) => {
    return (
        <div className={styles.btn}>
            <button
                onClick={onClick}
                type={type}
                style={{
                    fontWeight: fontWeight,
                    background: background,
                    color: colorText,
                    border: border,
                }}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
