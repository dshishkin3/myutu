import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
import { ImgLocationBlack } from "../../config/images";
import style from './style.module.scss';

export const ButtonHeaderLocation: FC<HTMLAttributes<HTMLButtonElement> & { text: string; }> = ({ text, ...props }) => {
    return (
        <button className={style.button_header_location} {...props}>
            <Image src={ImgLocationBlack} />
            <span>{text}</span>
        </button>
    );
};