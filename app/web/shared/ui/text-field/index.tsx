import React, { forwardRef, useEffect, useState } from "react";
import style from "./style.module.scss";

type TextFieldProps = {
    label?: string;
    readonly?: boolean;
    isPhoneNumber?: boolean;
    requiredstar?: boolean;
    isOpenOptions?: boolean;
};

export const TextField = forwardRef<
    HTMLInputElement,
    TextFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(
    (
        {
            readOnly = false,
            label,
            isPhoneNumber = false,
            isOpenOptions = false,
            ...props
        },
        ref
    ) => {
        return (
            <div className={style.textfield}>
                {label && (
                    <label
                        className={`${style.textfield__label} ${props.requiredstar
                            ? style.textfield__label__required
                            : ""
                            }`}
                    >
                        {label}
                    </label>
                )}
                <input
                    style={{
                        borderRadius: isOpenOptions ? "8px 8px 0px 0px" : "8px",
                    }}
                    readOnly={readOnly}
                    className={style.textfield__input}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
