import React, { HTMLAttributes, memo } from "react";
import style from './style.module.scss';

interface ICol extends HTMLAttributes<HTMLDivElement> {
    xs?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
    sm?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
    md?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
    lg?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
}

export const Col = ({ children, sm, md, lg, xs, className = "", ...props }: ICol) => {
    const styles = [className];
    if (xs) styles.push(style["col-xs-" + xs]);
    if (sm) styles.push(style["col-sm-" + sm]);
    if (md) styles.push(style["col-md-" + md]);
    if (lg) styles.push(style["col-lg-" + lg]);


    return (
        <div {...props} className={styles.join(" ")}>{children}</div>
    );
};