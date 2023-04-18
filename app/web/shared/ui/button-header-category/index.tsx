import React, { FC, HTMLAttributes } from "react";
import style from './style.module.scss';

export const ButtonHeaderCategory: FC<HTMLAttributes<HTMLButtonElement> & { variant: "active" | "passive" }> = ({ variant = "active", ...props }) => {
    return (
        <button className={`${style.button_header_category} ${style['button_header_category__' + variant]}`} {...props}>
            <div className={style['button_header_category__icon__' + variant]}></div>
            <span>Все категории</span>
        </button>
    );
};