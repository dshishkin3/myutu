import React, { FC, HTMLAttributes } from 'react';
import style from './style.module.scss';

export const Button: FC<HTMLAttributes<HTMLButtonElement> & { variant: string; }> = ({ variant = "primary", className, children, ...props }) => {
    return (
        <button className={`${className} ${style.button} ${style["button__" + variant]}`} {...props}>{children}</button>
    );
};