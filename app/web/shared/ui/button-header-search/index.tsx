import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
import { ImgSearchBlue } from "../../config/images";
import style from './style.module.scss';

export const ButtonHeaderSearch: FC<HTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
    return (
        <button className={style.button_header_myads} {...props}>
            <Image src={ImgSearchBlue} />
        </button>
    );
};