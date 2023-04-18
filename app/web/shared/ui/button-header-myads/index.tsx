import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
import { ImgMyAds } from "../../config/images";
import style from './style.module.scss';

export const ButtonHeaderMyads: FC<HTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
    return (
        <button className={style.button_header_myads} {...props}>
            <Image src={ImgMyAds} />
            <span>Мои объявления</span>
        </button>
    );
};